type CatalogStateProps = {
  status: "loading" | "error" | "empty";
};

const messages = {
  loading: "Cargando galaxia cinematográfica...",
  error: "No pudimos conectar con el catálogo. Inténtalo nuevamente.",
  empty: "No se encontraron películas",
};

export function CatalogState({ status }: CatalogStateProps) {
  return (
    <section className={`catalog-state catalog-state-${status}`} role={status === "error" ? "alert" : "status"}>
      <span>{status === "loading" ? "✦" : status === "error" ? "◌" : "○"}</span>
      <p>{messages[status]}</p>
    </section>
  );
}
