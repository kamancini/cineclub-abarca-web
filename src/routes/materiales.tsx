import { createFileRoute } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { Reveal } from '@/components/Reveal'

const DRIVE_MATERIALES =
  'https://drive.google.com/drive/folders/1MiknBBE_hYdrKLfV8ydDCtJ0ZLBfsaYU?usp=sharing'

export const Route = createFileRoute('/materiales')({
  head: () => ({
    meta: [
      {
        title: 'Materiales | Cineclub Abarca',
      },
      {
        name: 'description',
        content:
          'Programas, lecturas y materiales que acompañan los ciclos, funciones y encuentros del Cineclub Abarca.',
      },
      {
        property: 'og:title',
        content: 'Materiales | Cineclub Abarca',
      },
      {
        property: 'og:description',
        content:
          'Programas, lecturas y materiales para continuar la conversación después de las funciones del Cineclub Abarca.',
      },
      {
        property: 'og:url',
        content: 'https://cineclubabarca.cl/materiales',
      },
    ],

    links: [
      {
        rel: 'canonical',
        href: 'https://cineclubabarca.cl/materiales',
      },
    ],
  }),

  component: PaginaMateriales,
})

function PaginaMateriales() {
  return (
    <>
      <BarraNavegacion />

      <main>
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-paper">
              Materiales
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.95]">
              Para continuar la conversación
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-paper">
              Compartimos programas, lecturas y otros materiales que
              acompañan nuestros ciclos, funciones y encuentros.
            </p>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:py-24">
          <Reveal>
            <img
              src="/img/fanzine-encuentro.jpg"
              alt="Materiales impresos del Cineclub Abarca."
              loading="lazy"
              decoding="async"
              className="h-[360px] w-full object-cover md:h-[520px]"
            />
          </Reveal>

          <Reveal
            delay={120}
            className="lg:-ml-16"
          >
            <div className="analog-paper-card p-7 sm:p-9 lg:p-10">
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-brick-deep">
                Biblioteca digital
              </p>

              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)]">
                Todos nuestros materiales en un solo lugar
              </h2>

              <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
                Puedes acceder a nuestra carpeta de Google Drive para
                consultar y descargar los materiales disponibles del
                Cineclub Abarca.
              </p>

              <a
                href={DRIVE_MATERIALES}
                target="_blank"
                rel="noreferrer"
                aria-label="Explorar materiales en Google Drive, se abre en una pestaña nueva"
                className="mt-8 inline-flex bg-brick-deep px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-paper transition-transform hover:-translate-y-0.5"
              >
                Explorar materiales
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}