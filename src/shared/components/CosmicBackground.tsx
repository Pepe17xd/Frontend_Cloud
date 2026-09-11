import { useEffect, useState } from "react";

import { SpaceBackground } from "./SpaceBackground";

/** Shared cinematic universe layer with a restrained mouse-parallax depth effect. */
export function CosmicBackground({ className = "" }: { className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPosition({ x: (event.clientX / window.innerWidth - .5) * 2, y: (event.clientY / window.innerHeight - .5) * 2 });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="cosmic-parallax" style={{ "--mouse-x": position.x, "--mouse-y": position.y } as React.CSSProperties}><SpaceBackground className={`cosmic-background ${className}`} /><i className="near-particles" aria-hidden="true" /></div>;
}
