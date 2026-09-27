import { createFileRoute } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { Reveal } from '@/components/Reveal'
import {
  equipo,
  origen,
  proposito,
} from '@/content/micrositio'

export const Route = createFileRoute('/proyecto')({
  head: () => ({
    meta: [
      {
        title: 'El proyecto | Cineclub Abarca',
      },
      {
        name: 'description',
        content:
          'Conoce el origen, propósito, comunidad y equipo del Cineclub Abarca.',
      },
      {
        property: 'og:title',
        content: 'El proyecto | Cineclub Abarca',
      },
      {
        property: 'og:description',
        content:
          'El origen, propósito y equipo del Cineclub Abarca.',
      },
    ],
  }),
  component: PaginaProyecto,
})

function PaginaProyecto() {
  return (
    <>
      <BarraNavegacion />

      <main>
        {/* Portada */}
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]">
              El proyecto
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-paper/90">
              Cineclub Abarca es un espacio de encuentro en torno al cine,
              la conversación y la construcción de comunidad.
            </p>
          </div>
        </header>

        {/* Por qué existe */}
        <section
          aria-labelledby="proposito-titulo"
          className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28"
        >
          <Reveal>
            <div>
              <h2
                id="proposito-titulo"
                className="text-[clamp(2.2rem,4.5vw,3.4rem)]"
              >
                Por qué existe
              </h2>

              <blockquote className="mt-7 border-l-2 border-brick pl-6 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug italic">
                {proposito.destacado}
              </blockquote>

              {proposito.parrafos.map((parrafo) => (
                <p
                  key={parrafo}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
                >
                  {parrafo}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <img
              src="/img/conversacion-cineclub.jpg"
              alt="Personas conversando después de una función del Cineclub Abarca en la Casa Taller."
              loading="lazy"
              decoding="async"
              className="h-[440px] w-full object-cover lg:h-[580px]"
            />
          </Reveal>
        </section>

        {/* Casa Taller */}
        <section
          aria-labelledby="origen-titulo"
          className="bg-paper-deep"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
            <Reveal>
              <div>
                <h2
                  id="origen-titulo"
                  className="text-[clamp(1.8rem,3.4vw,2.5rem)] leading-[1.18]"
                >
                  {origen.titulo}
                </h2>

                {origen.parrafos.map((parrafo) => (
                  <p
                    key={parrafo}
                    className="mt-6 text-lg leading-relaxed text-ink-soft"
                  >
                    {parrafo}
                  </p>
                ))}

                <dl className="mt-10 grid gap-6 border-t border-ink/20 pt-7 sm:grid-cols-2">
                  {origen.hitos.map((hito) => (
                    <div key={`${hito.dato}-${hito.glosa}`}>
                      <dt className="font-display text-4xl text-brick">
                        {hito.dato}
                      </dt>

                      <dd className="mt-2 leading-relaxed text-ink-soft">
                        {hito.glosa}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <img
                src="/img/comunidad-patio.jpg"
                alt="Personas reunidas alrededor de una mesa en el patio de la Casa Taller antes de una función."
                loading="lazy"
                decoding="async"
                className="h-[480px] w-full object-cover lg:h-full lg:min-h-[620px]"
              />
            </Reveal>
          </div>
        </section>

        {/* Público */}
        <section
          aria-labelledby="publico-titulo"
          className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <Reveal>
            <div className="max-w-4xl">
              <h2
                id="publico-titulo"
                className="text-[clamp(2.2rem,4.5vw,3.4rem)]"
              >
                Para quién es
              </h2>

              <p className="mt-7 text-[clamp(1.15rem,2vw,1.35rem)] leading-[1.75] text-ink-soft">
                Nuestro proyecto está dirigido a{' '}
                <strong className="font-semibold text-ink">
                  personas entre 18 y 65 años
                </strong>{' '}
                interesadas en profundizar su{' '}
                <strong className="font-semibold text-ink">
                  experiencia cinematográfica
                </strong>
                , buscando espacios de{' '}
                <strong className="font-semibold text-ink">
                  conversación honesta
                </strong>{' '}
                sobre los temas y emociones que el cine nos invita a explorar.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Equipo */}
        <section
          aria-labelledby="equipo-titulo"
          className="bg-paper-deep"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28">
            <Reveal>
              <img
                src="/img/equipo-cca.jpg"
                alt="Equipo del Cineclub Abarca."
                loading="lazy"
                decoding="async"
                className="h-[440px] w-full object-cover lg:h-[620px]"
              />
            </Reveal>

            <div>
              <Reveal>
                <h2
                  id="equipo-titulo"
                  className="text-[clamp(2.2rem,4.5vw,3.4rem)]"
                >
                  Quiénes somos
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  {equipo.bajada}
                </p>
              </Reveal>

              <ul className="mt-8 border-t border-ink/20">
                {equipo.personas.map((persona, index) => (
                  <Reveal
                    as="li"
                    key={persona.nombre}
                    delay={index * 70}
                  >
                    <div className="border-b border-ink/20 py-5">
                      <h3 className="text-2xl leading-[1.18]">
                        {persona.nombre}
                      </h3>

                      <p className="mt-2 leading-relaxed text-sepia">
                        {persona.cargo}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              {equipo.parrafos.map((parrafo) => (
                <p
                  key={parrafo}
                  className="mt-7 text-lg leading-relaxed text-ink-soft"
                >
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}