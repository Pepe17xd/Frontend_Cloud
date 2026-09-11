import { type MouseEvent, type PropsWithChildren, useState } from "react";
import { Link, type LinkProps, useNavigate } from "react-router-dom";

export function BlackHoleLink({ children, to, className, ...props }: PropsWithChildren<LinkProps>) {
  const navigate = useNavigate();
  const [travelling, setTravelling] = useState(false);
  const enter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (travelling) return;
    setTravelling(true);
    window.setTimeout(() => navigate(to), 680);
  };
  return <>{travelling ? <div className="black-hole-transition" aria-label="Viajando hacia comunidades"><i /><p>CAMBIANDO DE ÓRBITA</p></div> : null}<Link to={to} className={className} onClick={enter} {...props}>{children}</Link></>;
}
