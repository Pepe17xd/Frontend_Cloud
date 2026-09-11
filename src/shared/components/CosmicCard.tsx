import type { HTMLAttributes, PropsWithChildren } from "react";

export function CosmicCard({ children, className = "", ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <article className={`simple-card cosmic-card ${className}`} {...props}>{children}</article>;
}
