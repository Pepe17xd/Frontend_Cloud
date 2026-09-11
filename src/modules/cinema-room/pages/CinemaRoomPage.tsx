import { Link, useParams } from "react-router-dom";

import { CosmicBackground } from "../../../shared/components/CosmicBackground";
import { CatalogState } from "../../catalog/components/CatalogState";
import { useMovie, useMovieSession } from "../../catalog/hooks/useMovies";
import { CinemaControls } from "../components/CinemaControls";
import { LiveChat } from "../components/LiveChat";
import Participants from "../components/Participants";
import { VideoPlayer } from "../components/VideoPlayer";
import { useCinemaRoom } from "../hooks/useCinemaRoom";

export function CinemaRoomPage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovie(id);
  const { data: session, isLoading: isSessionLoading, isError: isSessionError } = useMovieSession(id);
  const room = useCinemaRoom();
  if (isLoading) return <main className="loading-page"><CatalogState status="loading" /></main>;
  if (isError) return <main className="loading-page"><CatalogState status="error" /></main>;
  if (!movie) return <main className="loading-page"><CatalogState status="empty" /></main>;
  return <main className="cinema-page"><CosmicBackground className="cinema-cosmos" /><div className="cinema-topbar"><Link to={`/movie/${movie.id}`}>← Volver</Link><p><i /> Órbita sincronizada</p><button>Invitar tripulación</button></div><div className="cinema-layout"><div className="cinema-stage"><VideoPlayer movie={movie} streamUrl={session?.stream?.url} streamType={session?.stream?.type} isPlaying={room.isPlaying} onPlayingChange={room.setIsPlaying} sessionLoading={isSessionLoading} sessionError={isSessionError}/><CinemaControls isPlaying={room.isPlaying} onTogglePlayback={room.togglePlayback}/></div><aside className="social-panel"><Participants /><LiveChat messages={room.messages} onSend={room.sendMessage}/></aside></div></main>;
}
