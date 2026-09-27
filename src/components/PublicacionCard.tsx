import type { Publicacion } from '@/lib/substack'

function formatearFecha(fecha: string) {
  const parsed = new Date(fecha)
  if (Number.isNaN(parsed.getTime())) return fecha

  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

export function PublicacionCard({
  publicacion,
  tono = 'ink',
}: {
  publicacion: Publicacion
  tono?: 'ink' | 'paper'
}) {
  // La tarjeta tiene su propia hoja de papel clara, incluso dentro de secciones oscuras.
  // Mantener siempre tinta oscura preserva el contraste y la legibilidad.
  void tono
  const borde = 'border-ink/20'
  const secundario = 'text-ink-soft'
  const detalle = 'text-sepia'
  const enlace = 'text-brick'

  return (
    <article className={`analog-paper-card flex h-full flex-col p-5 sm:p-6 ${borde}`}>
      {publicacion.imagen ? (
        <a
          href={publicacion.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Leer ${publicacion.titulo} en Substack`}
          className="mb-5 block aspect-3/2 overflow-hidden bg-paper-deep"
        >
          <img
            src={publicacion.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </a>
      ) : null}

      <p className={`kicker ${detalle}`}>{formatearFecha(publicacion.fecha)}</p>
      <h3 className="mt-3 text-[clamp(1.4rem,2.8vw,1.9rem)]">
        <a href={publicacion.url} target="_blank" rel="noreferrer" className="link">
          {publicacion.titulo}
        </a>
      </h3>
      {publicacion.autor ? <p className={`mt-2 text-sm ${detalle}`}>Por {publicacion.autor}</p> : null}
      {publicacion.extracto ? <p className={`mt-4 text-sm ${secundario}`}>{publicacion.extracto}</p> : null}

      <a
        href={publicacion.url}
        target="_blank"
        rel="noreferrer"
        className={`link kicker mt-auto pt-5 ${enlace}`}
      >
        Leer en Substack
      </a>
    </article>
  )
}
