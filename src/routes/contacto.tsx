import { createFileRoute } from '@tanstack/react-router'
import { Instagram } from 'lucide-react'

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
      {
        property: 'og:title',
        content: 'Contacto | Cineclub Abarca',
      },
      {
        property: 'og:description',
        content:
          'Escríbenos por correo electrónico o Instagram para contactar al Cineclub Abarca.',
      },
      {
        property: 'og:url',
        content: 'https://cineclubabarca.cl/contacto',
      },
    ],

    links: [
      {
        rel: 'canonical',
        href: 'https://cineclubabarca.cl/contacto',
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

            <p className="mt-7 max-w-2xl text-lg leading-[1.75] text-paper">
              ¿Tienes preguntas? Escríbenos y te responderemos a la
              brevedad.
            </p>
          </div>
        </header>

        <section
          aria-label="Datos de contacto"
          className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <Reveal>
            <div className="grid gap-12 border-t border-ink/25 pt-9 sm:grid-cols-2">
              <div>
                <h2 className="font-sans text-base font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  Correo electrónico
                </h2>

                <a
                  href={`mailto:${contacto.correo}`}
                  className="link mt-4 inline-block break-all font-display text-[clamp(1.5rem,3vw,2.2rem)] text-ink"
                >
                  {contacto.correo}
                </a>
              </div>

              <div>
                <h2 className="font-sans text-base font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  Instagram
                </h2>

                <a
                  href={contacto.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${contacto.instagram.usuario} en Instagram, se abre en una pestaña nueva`}
                  className="link mt-4 inline-flex items-center gap-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] text-ink"
                >
                  <Instagram
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                  />

                  <span>
                    {contacto.instagram.usuario}
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}