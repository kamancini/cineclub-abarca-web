import {
  createFileRoute,
  Link,
  notFound,
} from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { getFuncionesPublicadas } from '@/lib/cupos'
import {
  estadoFuncion,
  etiquetasEstado,
  formatearFechaFuncion,
  puedeInscribirse,
} from '@/lib/funciones'

const SITE_URL = 'https://cineclubabarca.cl'

function urlAbsoluta(url?: string) {
  if (!url) return undefined

  if (
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url
  }

  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

function altImagenFuncion(
  texto?: string,
) {
  const alt = texto?.trim()

  if (alt && alt.length <= 100) {
    return alt
  }

  return 'Afiche de una función del Cineclub Abarca.'
}

export const Route = createFileRoute('/funciones_/$slug')({
  loader: async ({ params }) => {
    const funciones = await getFuncionesPublicadas()

    const funcion = funciones.find(
      (item) => item.slug === params.slug,
    )

    if (!funcion) {
      throw notFound()
    }

    return funcion
  },

  head: ({ loaderData }) => {
    const titulo = `${
      loaderData?.titulo ?? 'Función'
    } | Cineclub Abarca`

    const descripcion =
      loaderData?.descripcion ??
      'Detalle de una función del Cineclub Abarca.'

    const canonical = loaderData?.slug
      ? `${SITE_URL}/funciones/${loaderData.slug}`
      : `${SITE_URL}/funciones`

    const socialImage = urlAbsoluta(
      loaderData?.imagen,
    )

    return {
      meta: [
        {
          title: titulo,
        },
        {
          name: 'description',
          content: descripcion,
        },
        {
          property: 'og:title',
          content: titulo,
        },
        {
          property: 'og:description',
          content: descripcion,
        },
        {
          property: 'og:url',
          content: canonical,
        },

        ...(socialImage
          ? [
              {
                property: 'og:image',
                content: socialImage,
              },
              {
                name: 'twitter:image',
                content: socialImage,
              },
            ]
          : []),
      ],

      links: [
        {
          rel: 'canonical',
          href: canonical,
        },
      ],
    }
  },

  component: DetalleFuncion,
})

function DetalleFuncion() {
  const funcion = Route.useLoaderData()

  const estado = estadoFuncion(funcion)
  const disponible = puedeInscribirse(funcion)

  return (
    <>
      <BarraNavegacion />

      <main>
        <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Link
            to="/funciones"
            className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
          >
            ← Todas las funciones
          </Link>

          <div className="mt-9 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="inline-block rounded-full border border-ink/25 bg-sepia/10 px-3 py-1.5 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                {etiquetasEstado[estado]}
              </span>

              <h1 className="mt-7 font-display text-[clamp(2.7rem,6vw,4.8rem)] leading-[0.98]">
                {funcion.titulo}
              </h1>

              {funcion.ciclo ? (
                <p className="mt-5 font-display text-xl italic leading-[1.5] text-ink-soft">
                  {funcion.ciclo}
                </p>
              ) : null}

              <dl className="mt-8 grid gap-4 border-y border-ink/25 py-7 text-base leading-[1.7] text-ink-soft">
                <div>
                  <dt className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                    Fecha
                  </dt>

                  <dd className="mt-1">
                    {formatearFechaFuncion(
                      funcion.fecha,
                    )}
                  </dd>
                </div>

                {funcion.hora ? (
                  <div>
                    <dt className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                      Hora
                    </dt>

                    <dd className="mt-1">
                      {funcion.hora}
                    </dd>
                  </div>
                ) : null}

                {funcion.lugar ? (
                  <div>
                    <dt className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                      Lugar
                    </dt>

                    <dd className="mt-1">
                      {funcion.lugar}
                    </dd>
                  </div>
                ) : null}

                {funcion.pelicula ? (
                  <div>
                    <dt className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                      Película
                    </dt>

                    <dd className="mt-1">
                      {funcion.pelicula}
                    </dd>
                  </div>
                ) : null}

                {funcion.obra ? (
                  <div>
                    <dt className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                      Obra asociada
                    </dt>

                    <dd className="mt-1">
                      {funcion.obra}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-8 text-lg leading-[1.75] text-ink-soft">
                {funcion.descripcion}
              </p>

              {funcion.invitados?.length ? (
                <section
                  className="mt-9"
                  aria-labelledby="invitados"
                >
                  <h2
                    id="invitados"
                    className="text-2xl"
                  >
                    Invitados
                  </h2>

                  <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-[1.75] text-ink-soft">
                    {funcion.invitados.map(
                      (invitado) => (
                        <li key={invitado}>
                          {invitado}
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              ) : null}

              {funcion.informacionAdicional ? (
                <p className="mt-8 border-l-2 border-brick-deep pl-5 text-base leading-[1.75] text-ink-soft">
                  {funcion.informacionAdicional}
                </p>
              ) : null}

              <div className="mt-10">
                {disponible ? (
                  <a
                    href={funcion.formularioUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Inscribirme a esta función, se abre en una pestaña nueva"
                    className="inline-block rounded-full bg-brick-deep px-7 py-3.5 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
                  >
                    Inscribirme
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-block rounded-full bg-ink/10 px-7 py-3.5 font-semibold text-ink"
                  >
                    {estado === 'agotados'
                      ? 'Cupos agotados'
                      : estado === 'realizada'
                        ? 'Actividad realizada'
                        : 'Inscripciones cerradas'}
                  </span>
                )}
              </div>
            </div>

            {funcion.imagen ? (
              <figure className="lg:pt-4">
                <img
                  src={funcion.imagen}
                  alt={altImagenFuncion(
                    funcion.imagenAlt,
                  )}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </figure>
            ) : (
              <aside className="self-start border border-ink/25 bg-paper-deep p-8">
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                  Inscripción
                </p>

                <p className="mt-5 text-base leading-[1.75] text-ink-soft">
                  {estado === 'realizada'
                    ? 'Esta actividad ya se realizó y permanece publicada como parte del archivo del cineclub.'
                    : disponible
                      ? 'La inscripción se realiza en el formulario de Google asociado específicamente a esta actividad.'
                      : 'La inscripción no está disponible en este momento.'}
                </p>

                {typeof funcion.cuposMaximos ===
                'number' ? (
                  <p className="mt-5 text-base font-medium text-ink-soft">
                    Capacidad máxima:{' '}
                    {funcion.cuposMaximos} personas.
                  </p>
                ) : null}
              </aside>
            )}
          </div>
        </article>
      </main>
    </>
  )
}