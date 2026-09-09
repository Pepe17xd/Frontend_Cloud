import axios from "axios";

/** Normaliza errores HTTP para que los módulos no dependan del formato de cada servicio. */
export function toApiError(error: unknown, serviceName: string): Error {
  if (!axios.isAxiosError(error)) return error instanceof Error ? error : new Error(`No se pudo completar la solicitud a ${serviceName}.`);

  const status = error.response?.status;
  if (status === 401) return new Error("Tu sesión no es válida o ha expirado. Inicia sesión nuevamente.");
  if (status === 403) return new Error("No tienes permisos para realizar esta acción.");
  if (!error.response) return new Error(`${serviceName} no está disponible en este momento.`);

  const data = error.response.data as { message?: unknown; error?: unknown; detail?: unknown } | undefined;
  const message = data?.message ?? data?.detail ?? data?.error;
  return new Error(typeof message === "string" && message.trim() ? message : `La solicitud a ${serviceName} no pudo completarse.`);
}
