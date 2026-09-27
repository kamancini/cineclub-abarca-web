import { createFileRoute, Link } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { PublicacionCard } from '@/components/PublicacionCard'
import { Reveal } from '@/components/Reveal'
import { getPublicacionesSubstack, SUBSTACK_URL } from '@/lib/substack'

export const Route = createFileRoute('/ensayos')({
  loader: () => getPublicacionesSubstack(),
  head: () => ({
    meta: [
      { title: 'Ensayos | Cineclub Abarca' },
      {
        name: 'description',
        content: 'Textos y reflexiones del Cineclub Abarca, sincronizados desde Substack.',
      },
      { property: 'og:title', content: 'Ensayos | Cineclub Abarca' },
      {
        property: 'og:description',
        content: 'Textos y reflexiones sobre cine, memoria y comunidad del Cineclub Abarca.',
      },
    ],
  }),
  component: PaginaEnsayos,
})

function PaginaEnsayos() {
  const { publicaciones, fuente } = Route.useLoaderData()

  return (
    <>
      <BarraNavegacion />
      <main>
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="kicker text-brick-light">Textos y reflexiones</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.95]">Ensayos</h1>
            <p className="mt-6 max-w-2xl text-lg text-paper/80">
              Un espacio para compartir textos, miradas y reflexiones en torno al cine, las imágenes y las conversaciones que nacen de nuestros encuentros.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="kicker text-brick">Ensayos</p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)]">Más recientes</h2>
              </div>
              <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="link kicker text-brick">
                Abrir Substack
              </a>
            </div>
          </Reveal>

          {fuente === 'fallback' ? (
            <p className="mt-6 border-l-2 border-sepia pl-4 text-sm text-sepia" role="status">
              Substack no respondió en esta carga. Mostramos la última copia disponible y volveremos a consultar el RSS en la próxima visita.
            </p>
          ) : null}

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {publicaciones.map((publicacion, index) => (
              <Reveal key={publicacion.url} delay={index * 70}>
                <PublicacionCard publicacion={publicacion} />
              </Reveal>
            ))}
          </div>

          <Link to="/" className="link kicker mt-12 inline-block text-brick">
            Volver al inicio
          </Link>
        </section>
      </main>
    </>
  )
}
