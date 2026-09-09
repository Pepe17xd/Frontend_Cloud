const reactions = ["🔥", "👏", "❤️", "😮"];

export default function Reactions() {
  return <div className="reactions" aria-label="Reacciones">{reactions.map((reaction) => <button key={reaction} aria-label={`Reaccionar ${reaction}`}>{reaction}</button>)}</div>;
}
