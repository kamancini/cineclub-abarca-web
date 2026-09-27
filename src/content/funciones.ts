import funcionesData from './funciones.json'

export type EstadoFuncionManual =
  | 'auto'
  | 'abiertas'
  | 'ultimos_cupos'
  | 'agotados'
  | 'cerradas'
  | 'realizada'

export type Funcion = {
  slug: string
  titulo: string
  ciclo?: string
  fecha: string
  hora?: string
  lugar?: string
  descripcion: string
  pelicula?: string
  obra?: string
  imagen?: string
  imagenAlt?: string
  invitados?: string[]
  informacionAdicional?: string
  formularioUrl?: string
  cuposMaximos?: number
  cuposDisponibles?: number
  estado?: EstadoFuncionManual
}

/**
 * Las funciones se administran desde src/content/funciones.json.
 *
 * Pages CMS edita ese archivo y el sitio utiliza estos datos
 * para construir automáticamente próximas funciones,
 * funciones anteriores y estados de inscripción.
 */
export const funciones = funcionesData as Funcion[]

/**
 * Datos del sitio antiguo que todavía requieren
 * información completa antes de publicarse.
 */
export const pendientesDeMigracion = [
  'Orlando',
  'Cine Club de Lectura — septiembre',
] as const