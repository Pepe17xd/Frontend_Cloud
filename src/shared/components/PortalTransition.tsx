export function PortalTransition({ active }: { active: boolean }) {
  return active ? <div className="portal-transition" aria-label="Entrando al universo ASTRA"><div className="portal-core" /><p>ENTRANDO AL UNIVERSO ASTRA</p></div> : null;
}
