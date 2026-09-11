import type { PropsWithChildren } from "react";

export function GlassPanel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`glass-panel ${className}`}>{children}</section>;
}
