
const reactions = ["🔥", "👏", "❤️", "😮"];

export default function Reactions({ onReaction }: { onReaction?: (emoji: string) => void }) {
  return <div className="reactions" aria-label="Reacciones">{reactions.map((reaction) => <button key={reaction} aria-label={`Reaccionar ${reaction}`} onClick={() => onReaction?.(reaction)}>{reaction}</button>)}</div>;
}
