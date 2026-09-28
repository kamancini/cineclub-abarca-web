import type { Publicacion } from '@/lib/substack'

function formatearFecha(fecha: string) {
  const parsed = new Date(fecha)

  if (Number.isNaN(parsed.getTime())) {
    return fecha
  }

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
  /*
    La tarjeta siempre utiliza papel claro y tinta oscura.
    Esto mantiene un contraste consistente incluso cuando
    aparece dentro de una sección con fondo oscuro.
  */
  void tono

  return (
    <article className="analog-paper-card flex h-full flex-col border border-ink/25 p-5 sm:p-6">
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

      <p className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft">
        {formatearFecha(publicacion.fecha)}
      </p>

      <h3 className="mt-4 text-[clamp(1.5rem,2.8vw,1.9rem)] leading-[1.22]">
        <a
          href={publicacion.url}
          target="_blank"
          rel="noreferrer"
          className="link text-ink"
        >
          {publicacion.titulo}
        </a>
      </h3>

      {publicacion.autor ? (
        <p className="mt-3 text-base font-medium text-ink-soft">
          Por {publicacion.autor}
        </p>
      ) : null}

      {publicacion.extracto ? (
        <p className="mt-5 text-base leading-[1.75] text-ink-soft">
          {publicacion.extracto}
        </p>
      ) : null}

      <a
        href={publicacion.url}
        target="_blank"
        rel="noreferrer"
        className="link mt-auto pt-6 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
      >
        Leer en Substack
      </a>
    </article>
  )
}