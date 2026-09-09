import { useState } from "react";

export type ChatMessage = { id: number; author: string; text: string };

const initialMessages: ChatMessage[] = [
  { id: 1, author: "Ana", text: "tremenda escena 🔥" },
  { id: 2, author: "Carlos", text: "La música es increíble" },
];

export function useCinemaRoom() {
  const [messages, setMessages] = useState(initialMessages);
  const [isPlaying, setIsPlaying] = useState(true);
  const sendMessage = (text: string) => {
    const cleanText = text.trim();
    if (cleanText) setMessages((current) => [...current, { id: Date.now(), author: "Tú", text: cleanText }]);
  };
  return { messages, sendMessage, isPlaying, setIsPlaying, togglePlayback: () => setIsPlaying((value) => !value) };
}
