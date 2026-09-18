/**
 * Construye URLs de la Netlify Image CDN para las fotografías del cineclub.
 * Los originales viven en `public/img` y nunca se sirven a tamaño completo.
 */
type Opciones = {
  w: number
  h?: number
  q?: number
  fit?: 'cover' | 'contain'
}

export function img(archivo: string, { w, h, q = 74, fit = 'cover' }: Opciones) {
  const params = new URLSearchParams({
    url: `/img/${archivo}`,
    w: String(w),
    fm: 'webp',
    q: String(q),
  })
  if (h) {
    params.set('h', String(h))
    params.set('fit', fit)
  }
  return `/.netlify/images?${params.toString()}`
}

/** Variantes de ancho para `srcset`, manteniendo la proporción del recorte. */
export function srcSet(
  archivo: string,
  anchos: number[],
  proporcion?: number,
  q?: number,
) {
  return anchos
    .map((w) => {
      const h = proporcion ? Math.round(w * proporcion) : undefined
      return `${img(archivo, { w, h, q })} ${w}w`
    })
    .join(', ')
}
