import { useState } from "react";

import { useClubs, useCreateClub, useJoinClub } from "../hooks/useClubs";

export function ClubsPage() {
  const { data: clubs = [], isLoading, isError } = useClubs();
  const createClub = useCreateClub();
  const joinClub = useJoinClub();
  const [error, setError] = useState<string | null>(null);

  const handleCreateClub = async () => {
    const name = window.prompt("Nombre del club");
    if (!name?.trim()) return;
    const description = window.prompt("Descripción del club") ?? "";
    setError(null);
    try {
      await createClub.mutateAsync({ name: name.trim(), description: description.trim(), visibility: "PUBLIC" });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo crear el club.");
    }
  };

  const handleJoinClub = async (clubId: number) => {
    setError(null);
    try {
      await joinClub.mutateAsync(clubId);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo unir al club.");
    }
  };

  return <main className="page-shell"><p className="page-eyebrow">COMUNIDAD</p><h1>Clubes de cine</h1><p className="page-lead">Conecta con comunidades que comparten tus historias favoritas.</p><button className="button button-secondary" onClick={handleCreateClub} disabled={createClub.isPending}>✦ {createClub.isPending ? "Creando club…" : "Crear club"}</button>{error ? <p className="orbit-action-error" role="alert">{error}</p> : null}{isLoading ? <p className="page-lead">Cargando clubes…</p> : null}{isError ? <p className="orbit-action-error" role="alert">No se pudieron cargar los clubes.</p> : null}<div className="simple-grid">{clubs.map((club) => <article className="simple-card" key={club.id}><span>{String(club.id).padStart(2, "0")}</span><h2>{club.name}</h2><p>{club.description || "Sin descripción"}</p><button className="button button-secondary" onClick={() => handleJoinClub(club.id)} disabled={joinClub.isPending}>Unirse al club</button></article>)}</div></main>;
}
