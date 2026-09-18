import { useEffect, useRef, useState } from "react";

import type { Movie } from "../../catalog/types/Movie";

type VideoPlayerProps = {
  movie: Movie;
  streamUrl?: string;
  streamType?: string;
  isPlaying: boolean;
  onPlayingChange: (isPlaying: boolean) => void;
  sessionLoading: boolean;
  sessionError: boolean;
};

export function VideoPlayer({ movie, streamUrl, streamType, isPlaying, onPlayingChange, sessionLoading, sessionError }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(Boolean(streamUrl));

  useEffect(() => {
    setVideoError(false);
    setIsBuffering(Boolean(streamUrl));
  }, [streamUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    if (isPlaying) {
      void video.play().catch(() => onPlayingChange(false));
    } else {
      video.pause();
    }
  }, [isPlaying, onPlayingChange, streamUrl]);

  // Truco para la demo: si la URL es de example.com (datos semilla falsos), poner un video real
  const finalStreamUrl = streamUrl?.includes("example.com")
    ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    : streamUrl;

  return (
    <section className="video-player">
      {finalStreamUrl ? (
        <video
          ref={videoRef}
          className="cinema-video"
          autoPlay
          controls
          playsInline
          preload="metadata"
          onPlay={() => onPlayingChange(true)}
          onPause={() => onPlayingChange(false)}
          onWaiting={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          onError={() => { setIsBuffering(false); setVideoError(true); onPlayingChange(false); }}
        >
          <source src={finalStreamUrl} type="video/mp4" />
          Tu navegador no admite reproducción de video HTML5.
        </video>
      ) : null}

      {(sessionLoading || isBuffering) && !videoError ? <div className="video-status" role="status">Cargando video…</div> : null}
      {(sessionError || !finalStreamUrl || videoError) && !sessionLoading ? <div className="video-status video-status-error" role="alert">No pudimos cargar la reproducción. Inténtalo nuevamente.</div> : null}
      <div className="video-title"><span>VIENDO AHORA</span><h2>{movie?.title || "Película"}</h2></div>
    </section>
  );
}
