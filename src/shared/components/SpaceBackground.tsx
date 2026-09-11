import { GalaxyAnimation } from "./GalaxyAnimation";
import { StarField } from "./StarField";

type SpaceBackgroundProps = { className?: string };

export function SpaceBackground({ className = "" }: SpaceBackgroundProps) {
  return <div className={`space-background ${className}`} aria-hidden="true"><GalaxyAnimation /><StarField /><StarField far /></div>;
}
