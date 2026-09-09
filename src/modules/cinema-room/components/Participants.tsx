import type { Participant } from "../../community/types/WatchRoom";

type ParticipantsProps = { participants?: Participant[] };

export default function Participants({ participants = [] }: ParticipantsProps) {
  return <section className="participants"><div className="panel-title"><h3>Tripulación</h3><span>{participants.length}</span></div><div className="participant-list">{participants.map((participant, index) => <div key={participant.userId}><span className={`chat-avatar avatar-${index % 3}`}>{participant.nickname.charAt(0).toUpperCase()}</span><p><strong>{participant.nickname}</strong><small>{participant.role === "HOST" ? "Comandante" : "En órbita"}</small></p><i /></div>)}</div></section>;
}
