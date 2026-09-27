import type { Funcion, EstadoFuncionManual } from '@/content/funciones'

export type EstadoFuncion = Exclude<EstadoFuncionManual, 'auto'>

export const etiquetasEstado: Record<EstadoFuncion, string> = {
  abiertas: 'Inscripciones abiertas',
  ultimos_cupos: 'Últimos cupos',
  agotados: 'Cupos agotados',
  cerradas: 'Inscripciones cerradas',
  realizada: 'Actividad realizada',
}

function fechaChile(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function estadoFuncion(funcion: Funcion, ahora = new Date()): EstadoFuncion {
  if (funcion.estado && funcion.estado !== 'auto') return funcion.estado

  const hoy = fechaChile(ahora)

  if (funcion.fecha < hoy) return 'realizada'
  if (funcion.cuposDisponibles === 0) return 'agotados'

  if (!funcion.formularioUrl) return 'cerradas'

  if (
    typeof funcion.cuposDisponibles === 'number' &&
    typeof funcion.cuposMaximos === 'number' &&
    funcion.cuposDisponibles > 0
  ) {
    const umbral = Math.max(3, Math.ceil(funcion.cuposMaximos * 0.2))
    if (funcion.cuposDisponibles <= umbral) return 'ultimos_cupos'
  }

  return 'abiertas'
}

export function separarFunciones(lista: Funcion[], ahora = new Date()) {
  const hoy = fechaChile(ahora)

  const proximas = lista
    .filter((funcion) => funcion.fecha >= hoy && estadoFuncion(funcion, ahora) !== 'realizada')
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || (a.hora ?? '').localeCompare(b.hora ?? ''))

  const anteriores = lista
    .filter((funcion) => funcion.fecha < hoy || estadoFuncion(funcion, ahora) === 'realizada')
    .sort((a, b) => b.fecha.localeCompare(a.fecha) || (b.hora ?? '').localeCompare(a.hora ?? ''))

  return { proximas, anteriores }
}

export function puedeInscribirse(funcion: Funcion, ahora = new Date()) {
  const estado = estadoFuncion(funcion, ahora)
  return Boolean(funcion.formularioUrl) && (estado === 'abiertas' || estado === 'ultimos_cupos')
}

export function formatearFechaFuncion(fecha: string) {
  const [year, month, day] = fecha.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day, 12))

  return new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}
