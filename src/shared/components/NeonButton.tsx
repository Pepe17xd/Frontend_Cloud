import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function NeonButton({ children, className = "", ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <button className={`button neon-button ${className}`} {...props}>{children}</button>;
}
