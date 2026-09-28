import { createServerFn } from '@tanstack/react-start'

import {
  funciones,
  type EstadoFuncionManual,
  type Funcion,
} from '@/content/funciones'

type DisponibilidadRemota = {
  slug: string
  cuposDisponibles?: number
  estado?: Exclude<EstadoFuncionManual, 'auto'>
}

type RespuestaCupos = {
  funciones?: DisponibilidadRemota[]
}

/**
 * Devuelve las funciones con su disponibilidad pública.
 *
 * Sin configuración externa, utiliza exclusivamente los valores de
 * src/content/funciones.json.
 *
 * Si más adelante se define CUPOS_API_URL en Cloudflare, consulta ese
 * endpoint desde el servidor y combina la disponibilidad usando el slug
 * de cada función.
 *
 * El endpoint puede ser un Google Apps Script Web App o cualquier backend
 * propio que responda con esta estructura:
 *
 * {
 *   "funciones": [
 *     {
 *       "slug": "nombre-de-la-funcion",
 *       "cuposDisponibles": 4,
 *       "estado": "abiertas"
 *     }
 *   ]
 * }
 *
 * CUPOS_API_TOKEN es opcional y permanece del lado del servidor.
 * Nunca debe exponerse en el navegador.
 */
export const getFuncionesPublicadas = createServerFn({
  method: 'GET',
}).handler(async () => {
  const endpoint = process.env.CUPOS_API_URL
  const token = process.env.CUPOS_API_TOKEN

  if (!endpoint) {
    return funciones
  }

  try {
    const response = await fetch(endpoint, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    })

    if (!response.ok) {
      throw new Error(
        `API de cupos respondió ${response.status}`,
      )
    }

    const data = (await response.json()) as RespuestaCupos

    if (!Array.isArray(data.funciones)) {
      return funciones
    }

    const porSlug = new Map(
      data.funciones.map((item) => [
        item.slug,
        item,
      ]),
    )

    return funciones.map((funcion): Funcion => {
      const remota = porSlug.get(funcion.slug)

      if (!remota) {
        return funcion
      }

      return {
        ...funcion,

        ...(typeof remota.cuposDisponibles === 'number'
          ? {
              cuposDisponibles: Math.max(
                0,
                remota.cuposDisponibles,
              ),
            }
          : {}),

        ...(remota.estado
          ? {
              estado: remota.estado,
            }
          : {}),
      }
    })
  } catch (error) {
    console.error(
      '[cupos] No se pudo sincronizar disponibilidad; se usan los valores locales.',
      error,
    )

    return funciones
  }
})