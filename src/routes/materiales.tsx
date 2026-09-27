import { createFileRoute } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { Reveal } from '@/components/Reveal'

const DRIVE_MATERIALES = 'https://drive.google.com/drive/folders/1MiknBBE_hYdrKLfV8ydDCtJ0ZLBfsaYU?usp=sharing'

export const Route = createFileRoute('/materiales')({
  head: () => ({
    meta: [
      { title: 'Materiales | Cineclub Abarca' },
      {
        name: 'description',
        content: 'Programas, lecturas y materiales que acompañan los ciclos, funciones y encuentros del Cineclub Abarca.',
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
            <p className="kicker text-brick-light">Materiales</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] leading-[0.95]">
              Para continuar la conversación
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-paper/80">
              Compartimos programas, lecturas y otros materiales que acompañan nuestros ciclos, funciones y encuentros.
            </p>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:py-24">
          <Reveal>
            <img
              src="/img/fanzine-encuentro.jpg"
              alt="Materiales impresos del Cineclub Abarca durante un encuentro"
              loading="lazy"
              className="h-[360px] w-full object-cover md:h-[520px]"
            />
          </Reveal>

          <Reveal delay={120} className="lg:-ml-16">
            <div className="analog-paper-card p-7 sm:p-9 lg:p-10">
              <p className="kicker text-brick">Biblioteca digital</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)]">Todos nuestros materiales en un solo lugar</h2>
              <p className="mt-6 text-ink-soft">
                Puedes acceder a nuestra carpeta de Google Drive para consultar y descargar los materiales disponibles del Cineclub Abarca.
              </p>
              <a
                href={DRIVE_MATERIALES}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex bg-brick px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-opacity hover:opacity-85"
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
