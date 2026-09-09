import Reactions from "./Reactions";

type CinemaControlsProps = { isPlaying: boolean; onTogglePlayback: () => void };

export function CinemaControls({ isPlaying, onTogglePlayback }: CinemaControlsProps) {
  return <div className="cinema-controls"><button className="control-button" onClick={onTogglePlayback}>{isPlaying ? "Ⅱ Pausar" : "▶ Reproducir"}</button><button className="control-button">🔊 Volumen</button><Reactions /><button className="control-button leave-button">Salir de la órbita</button></div>;
}
