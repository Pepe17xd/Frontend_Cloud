const clubs = ["Ciencia ficción", "Cine de culto", "Estrenos nocturnos"];

export function ClubsPage() {
  return <main className="page-shell"><p className="page-eyebrow">COMUNIDAD</p><h1>Clubes de cine</h1><p className="page-lead">Conecta con comunidades que comparten tus historias favoritas.</p><div className="simple-grid">{clubs.map((club, index) => <article className="simple-card" key={club}><span>0{index + 1}</span><h2>{club}</h2><p>{24 + index * 17} cinéfilos conectados</p><button className="button button-secondary">Ver club</button></article>)}</div></main>;
}
