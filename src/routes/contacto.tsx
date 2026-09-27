import { createFileRoute } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { Reveal } from '@/components/Reveal'
import { contacto } from '@/content/micrositio'

export const Route = createFileRoute('/contacto')({
  head: () => ({
    meta: [
      {
        title: 'Contacto | Cineclub Abarca',
      },
      {
        name: 'description',
        content:
          'Contacta al Cineclub Abarca por correo electrónico o Instagram.',
      },
    ],
  }),
  component: PaginaContacto,
})

function PaginaContacto() {
  return (
    <>
      <BarraNavegacion />

      <main>
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]">
              Contacto
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/90">
  ¿Tienes preguntas? Escríbenos y te responderemos a la brevedad.
</p>
          </div>
        </header>

        <section
          aria-label="Datos de contacto"
          className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <Reveal>
            <div className="grid gap-10 border-t border-ink/20 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-sepia">
                  Correo electrónico
                </h2>

                <a
                  href={`mailto:${contacto.correo}`}
                  className="link mt-3 inline-block font-display text-[clamp(1.5rem,3vw,2.2rem)] break-all"
                >
                  {contacto.correo}
                </a>
              </div>

              <div>
                <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-sepia">
                  Instagram
                </h2>

                <a
                  href={contacto.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link mt-3 inline-block font-display text-[clamp(1.5rem,3vw,2.2rem)]"
                >
                  {contacto.instagram.usuario}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}