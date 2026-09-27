import { createServerFn } from '@tanstack/react-start'

export type Publicacion = {
  titulo: string
  url: string
  fecha: string
  extracto?: string
  autor?: string
  imagen?: string
}

export const SUBSTACK_URL = 'https://cineclubabarca.substack.com'
export const SUBSTACK_FEED_URL = `${SUBSTACK_URL}/feed`

/**
 * Respaldo mínimo tomado de las publicaciones que ya estaban sincronizadas en
 * el sitio anterior. Solo se usa si el RSS no responde, para que la sección no
 * quede vacía por una caída temporal de Substack.
 */
const publicacionesFallback: Publicacion[] = [
  {
    titulo: 'El artevida de Lynch y las razones por las cuales pienso en él',
    url: 'https://cineclubabarca.substack.com/p/el-artevida-de-lynch-y-las-razones',
    fecha: '2026-09-05T02:28:03.858Z',
    extracto: 'Por Cristóbal Ambroggio / Función #1 - 30/08/2026',
    autor: 'Cristóbal Ambroggio',
    imagen:
      'https://substackcdn.com/image/fetch/$s_!GzAJ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8ba2c64-3a6b-4fe2-8c32-022e5701466a_447x447.jpeg',
  },
  {
    titulo: '“Tiene el agrado de invitarlo a su casa”',
    url: 'https://cineclubabarca.substack.com/p/tiene-el-agrado-de-invitarlo-a-su',
    fecha: '2026-09-05T01:15:29.628Z',
    extracto:
      'Rosa María Droguett Abarca, Académica Estética UC / Cristóbal Ambroggio, Productor Audiovisual - Cofundadores del Cineclub Abarca.',
    autor: 'Rosa María Droguett Abarca y Cristóbal Ambroggio',
    imagen:
      'https://substackcdn.com/image/fetch/$s_!AY6p!,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fcineclubabarca.substack.com%2Ftwitter%2Fsubscribe-card.jpg%3Fv%3D-1646014019%26version%3D9',
  },
]

function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim()
}

function textoPlano(value = '') {
  return decodeXml(value)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tag(item: string, nombre: string) {
  const escaped = nombre.replace(':', '\\:')
  const match = item.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function atributo(item: string, tagName: string, atributoNombre: string) {
  const escaped = tagName.replace(':', '\\:')
  const match = item.match(new RegExp(`<${escaped}\\b[^>]*\\b${atributoNombre}=["']([^"']+)["'][^>]*>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function extraerImagen(item: string) {
  const media = atributo(item, 'media:content', 'url')
  if (media) return media

  const enclosure = atributo(item, 'enclosure', 'url')
  if (enclosure && /\.(?:jpe?g|png|webp|gif)(?:\?|$)/i.test(enclosure)) return enclosure

  const contenido = tag(item, 'content:encoded') || tag(item, 'description')
  const image = contenido.match(/<img[^>]+src=["']([^"']+)["']/i)
  return image ? decodeXml(image[1]) : undefined
}

function parsearFeed(xml: string): Publicacion[] {
  const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map((match) => match[1])

  return items
    .map((item) => {
      const titulo = textoPlano(tag(item, 'title'))
      const url = tag(item, 'link')
      const fecha = tag(item, 'pubDate') || tag(item, 'dc:date')
      const autor = textoPlano(tag(item, 'dc:creator') || tag(item, 'author')) || undefined
      const extractoCrudo = tag(item, 'description') || tag(item, 'content:encoded')
      const extractoPlano = textoPlano(extractoCrudo)
      const extracto = extractoPlano.length > 260 ? `${extractoPlano.slice(0, 257).trim()}…` : extractoPlano

      const fechaParsed = fecha ? new Date(fecha) : undefined
      const fechaIso = fechaParsed && !Number.isNaN(fechaParsed.getTime()) ? fechaParsed.toISOString() : ''

      return {
  titulo: decodeHtmlEntities(titulo),
  url,
  fecha: fechaIso,
  extracto: extracto
    ? decodeHtmlEntities(extracto)
    : undefined,
  autor: decodeHtmlEntities(autor),
  imagen: extraerImagen(item),
} satisfies Publicacion
    })
    .filter((item) => item.titulo && item.url && item.fecha)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

let cache: { timestamp: number; publicaciones: Publicacion[] } | undefined
const CACHE_MS = 10 * 60 * 1000
function decodeHtmlEntities(texto: string) {
  return texto
    .replace(/&#(\d+);/g, (_, numero) =>
      String.fromCodePoint(Number(numero)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, numero) =>
      String.fromCodePoint(parseInt(numero, 16)),
    )
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
export const getPublicacionesSubstack = createServerFn({ method: 'GET' }).handler(async () => {
  if (cache && Date.now() - cache.timestamp < CACHE_MS) {
    return { publicaciones: cache.publicaciones, fuente: 'rss' as const }
  }

  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8',
        'User-Agent': 'Cineclub-Abarca/1.0',
      },
    })

    if (!response.ok) throw new Error(`Substack RSS respondió ${response.status}`)

    const publicaciones = parsearFeed(await response.text())
    if (!publicaciones.length) throw new Error('El RSS no contiene publicaciones legibles')

    cache = { timestamp: Date.now(), publicaciones }
    return { publicaciones, fuente: 'rss' as const }
  } catch (error) {
    console.error('[substack] No se pudo leer el RSS; se usa el respaldo local.', error)
    return { publicaciones: publicacionesFallback, fuente: 'fallback' as const }
  }
})
