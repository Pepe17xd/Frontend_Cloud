export function StarField({ far = false }: { far?: boolean }) {
  return <i className={`star-field${far ? " star-field-far" : ""}`} />;
}
