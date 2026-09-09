import { type FormEvent, useState } from "react";

import type { ChatMessage } from "../hooks/useCinemaRoom";

type LiveChatProps = { messages: ChatMessage[]; onSend: (text: string) => void };

export function LiveChat({ messages, onSend }: LiveChatProps) {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); onSend(message); setMessage(""); };
  return <section className="live-chat"><div className="panel-title"><h3>Chat en vivo</h3><span>● LIVE</span></div><div className="chat-messages">{messages.map((item) => <div className="chat-message" key={item.id}><span className={`chat-avatar avatar-${item.author.charCodeAt(0) % 3}`}>{item.author[0]}</span><p><strong>{item.author}</strong>{item.text}</p></div>)}</div><form className="chat-form" onSubmit={submit}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribe un mensaje..." aria-label="Mensaje"/><button aria-label="Enviar mensaje">➤</button></form></section>;
}
