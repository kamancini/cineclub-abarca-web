import { createFileRoute, Link } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { PublicacionCard } from '@/components/PublicacionCard'
import { Reveal } from '@/components/Reveal'
import {
  getPublicacionesSubstack,
  SUBSTACK_URL,
} from '@/lib/substack'

export const Route = createFileRoute('/ensayos')({
  loader: () => getPublicacionesSubstack(),

  head: () => ({
    meta: [
      {
        title: 'Ensayos | Cineclub Abarca',
      },
      {
        name: 'description',
        content:
          'Textos y reflexiones del Cineclub Abarca sobre cine, memoria, imágenes y comunidad.',
      },
      {
        property: 'og:title',
        content: 'Ensayos | Cineclub Abarca',
      },
      {
        property: 'og:description',
        content:
          'Textos y reflexiones sobre cine, memoria y comunidad del Cineclub Abarca.',
      },
      {
        property: 'og:url',
        content: 'https://cineclubabarca.cl/ensayos',
      },
    ],

    links: [
      {
        rel: 'canonical',
        href: 'https://cineclubabarca.cl/ensayos',
      },
    ],
  }),

  component: PaginaEnsayos,
})

function PaginaEnsayos() {
  const { publicaciones, fuente } =
    Route.useLoaderData()

  return (
    <>
      <BarraNavegacion />

      <main>
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-paper">
              Textos y reflexiones
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.95]">
              Ensayos
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-paper">
              Un espacio para compartir textos, miradas y
              reflexiones en torno al cine, las imágenes y las
              conversaciones que nacen de nuestros encuentros.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-brick-deep">
                  Ensayos
                </p>

                <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)]">
                  Más recientes
                </h2>
              </div>

              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir el Substack del Cineclub Abarca, se abre en una pestaña nueva"
                className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
              >
                Abrir Substack
              </a>
            </div>
          </Reveal>

          {fuente === 'fallback' ? (
            <p
              className="mt-7 max-w-3xl border-l-2 border-brick-deep pl-5 text-base leading-[1.75] text-ink-soft"
              role="status"
            >
              Substack no respondió en esta carga. Mostramos la
              última copia disponible y volveremos a consultar el
              RSS en la próxima visita.
            </p>
          ) : null}

          {publicaciones.length ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {publicaciones.map(
                (publicacion, index) => (
                  <Reveal
                    key={publicacion.url}
                    delay={index * 70}
                  >
                    <PublicacionCard
                      publicacion={publicacion}
                    />
                  </Reveal>
                ),
              )}
            </div>
          ) : (
            <p className="mt-10 max-w-2xl text-lg leading-[1.75] text-ink-soft">
              No hay ensayos disponibles por ahora.
            </p>
          )}

          <Link
            to="/"
            className="link mt-12 inline-block font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
          >
            Volver al inicio
          </Link>
        </section>
      </main>
    </>
  )
}