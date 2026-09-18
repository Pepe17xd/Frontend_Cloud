import { useState, useEffect, useRef } from "react";
import { getAccessToken } from "../../auth/services/authApi";

export type ChatMessage = { id: number; author: string; text: string };

const WS_BASE_URL = import.meta.env.VITE_CINEMA_API_URL 
  ? import.meta.env.VITE_CINEMA_API_URL.replace("http", "ws") 
  : "ws://localhost:8001";

export function useCinemaRoom(sessionId?: string, movieId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!sessionId || !movieId) return;
    
    // HTTP FALLBACK: Demostrar consumo de microservicios incluso si WS falla
    const HTTP_URL = import.meta.env.VITE_CINEMA_API_URL || "http://localhost:8001";
    fetch(`${HTTP_URL}/api/v1/sessions/${sessionId}/stats?movie_id=${movieId}`)
      .then(res => res.json())
      .then(data => {
        if (data.likes !== undefined) {
          const avg = data.average_score || "N/A";
          setMessages(current => [
            ...current,
            { id: Date.now() + Math.random(), author: "🤖 Bot", text: `📊 (HTTP) Datos de la comunidad: Esta película tiene ${data.likes} likes y un rating de ${avg}/5.` }
          ]);
        }
      })
      .catch(console.error);
      
    const token = getAccessToken();
    if (!token) return;

    // Conectar WebSocket
    const wsUrl = `${WS_BASE_URL}/api/v1/sessions/${sessionId}/ws?token=${token}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "CHAT_MESSAGE") {
          setMessages((current) => [
            ...current,
            { 
              id: Date.now() + Math.random(), 
              author: data.user_id ? (String(data.user_id).includes("Bot") ? data.user_id : `Usuario ${data.user_id}`) : "Sistema", 
              text: data.message 
            }
          ]);
        } else if (data.type === "PLAYBACK_UPDATE") {
          setIsPlaying(data.is_playing);
        } else if (data.type === "MEMBER_JOINED") {
          setMessages((current) => [
            ...current,
            { id: Date.now() + Math.random(), author: "Sistema", text: `Un usuario se unió a la órbita` }
          ]);
        } else if (data.type === "MEMBER_LEFT") {
          setMessages((current) => [
            ...current,
            { id: Date.now() + Math.random(), author: "Sistema", text: `Un usuario salió de la órbita` }
          ]);
        }
      } catch (err) {
        console.error("Error al procesar mensaje WS", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [sessionId, movieId]);

  const sendMessage = (text: string) => {
    const cleanText = text.trim();
    if (cleanText && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Agregar localmente para que se vea rápido
      setMessages((current) => [...current, { id: Date.now(), author: "Tú", text: cleanText }]);
      // Enviar al servidor
      wsRef.current.send(JSON.stringify({ type: "CHAT_MESSAGE", message: cleanText }));
    } else if (cleanText) {
      // Fallback si no hay conexión WS (para pruebas UI)
      setMessages((current) => [...current, { id: Date.now(), author: "Tú (Offline)", text: cleanText }]);
    }
  };

  const togglePlayback = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "PLAYBACK_UPDATE", is_playing: nextState, position_seconds: 0 }));
    }
  };

  const handleSetIsPlaying = (value: boolean | ((val: boolean) => boolean)) => {
    const nextState = typeof value === "function" ? value(isPlaying) : value;
    setIsPlaying(nextState);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "PLAYBACK_UPDATE", is_playing: nextState, position_seconds: 0 }));
    }
  };

  return { 
    messages, 
    sendMessage, 
    isPlaying, 
    setIsPlaying: handleSetIsPlaying, 
    togglePlayback 
  };
}
