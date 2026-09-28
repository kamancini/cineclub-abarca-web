import { createFileRoute, Link } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { FuncionCard } from '@/components/FuncionCard'
import { Reveal } from '@/components/Reveal'
import {
  contacto,
  queHacemos,
  sitio,
  visitar,
} from '@/content/micrositio'
import { getFuncionesPublicadas } from '@/lib/cupos'

export const Route = createFileRoute('/')({
  loader: async () => {
    const funciones = await getFuncionesPublicadas()

    return { funciones }
  },

  head: () => ({
    meta: [
      {
        title:
          'Cineclub Abarca | Cine, conversación y comunidad',
      },
      {
        name: 'description',
        content:
          'Cineclub Abarca es un espacio íntimo y gratuito de mediación cinematográfica, conversación y comunidad en Ñuñoa.',
      },
      {
        property: 'og:title',
        content:
          'Cineclub Abarca | Cine, conversación y comunidad',
      },
      {
        property: 'og:description',
        content:
          'Funciones guiadas, ensayos y encuentros en torno al cine en Ñuñoa.',
      },
      {
        property: 'og:url',
        content: 'https://cineclubabarca.cl/',
      },
    ],

    links: [
      {
        rel: 'canonical',
        href: 'https://cineclubabarca.cl/',
      },
    ],
  }),

  component: Micrositio,
})

function Micrositio() {
  const { funciones } = Route.useLoaderData()

  const funcionesRecientes = [...funciones]
    .sort(
      (a, b) =>
        new Date(b.fecha).getTime() -
        new Date(a.fecha).getTime(),
    )
    .slice(0, 2)

  return (
    <>
      <BarraNavegacion />

      <main>
        {/* Portada */}
        <section
          id="portada"
          className="relative min-h-[90vh] bg-ink bg-cover bg-center bg-no-repeat text-paper"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(23,19,15,0.90) 0%, rgba(23,19,15,0.72) 42%, rgba(23,19,15,0.28) 100%), url('/img/hero-cineclub.jpg')",
          }}
        >
          <div className="mx-auto flex min-h-[90vh] max-w-6xl items-end px-5 py-16 sm:px-8 sm:py-20 lg:items-center lg:py-24">
            <div className="max-w-3xl">
              <Reveal>
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-paper">
                  Cineclub en Ñuñoa · Funciones gratuitas
                </p>

                <h1 className="mt-5">
                  <span className="block font-display text-[clamp(3.2rem,8vw,5.9rem)] leading-[0.92] text-paper [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
                    Cineclub Abarca
                  </span>

                  <span className="mt-6 block max-w-2xl font-display text-[clamp(1.55rem,3vw,2.5rem)] italic leading-[1.3] text-paper [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
                    {sitio.titulo}
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-paper [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Nos reunimos en la Casa/Taller Patrimonial de
                  Agustín Abarca y en el Reino de Rosa Abarca.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Link
                    to="/funciones"
                    className="rounded-full bg-brick-deep px-7 py-3.5 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                  >
                    Ver funciones
                  </Link>

                  <a
                    href={contacto.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-paper"
                  >
                    {sitio.accionSecundaria} en{' '}
                    {contacto.instagram.usuario}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Qué hacemos */}
        <section
          id="que-hacemos"
          aria-labelledby="que-hacemos-titulo"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <div className="relative">
            <div className="grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Fotografía */}
              <Reveal>
                <div className="relative z-10">
                  <img
                    src="/img/funcion-cine.jpg"
                    alt="Asistentes viendo una película en una función del cineclub."
                    loading="lazy"
                    decoding="async"
                    className="h-[340px] w-full object-cover sm:h-[470px] lg:h-[650px]"
                  />
                </div>
              </Reveal>

              {/* Papel superpuesto */}
              <Reveal
                delay={120}
                className="relative z-20 -mt-10 lg:-ml-20 lg:mt-0"
              >
                <div className="analog-paper-card px-7 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-12">
                  <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-brick-deep">
                    Cine, conversación y comunidad
                  </p>

                  <h2
                    id="que-hacemos-titulo"
                    className="mt-4 text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.05] text-ink"
                  >
                    Qué hacemos
                  </h2>

                  <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-ink-soft">
                    {queHacemos.bajada}
                  </p>

                  <div className="mt-8 border-t border-ink/20">
                    {queHacemos.bloques.map((bloque) => (
                      <div
                        key={bloque.titulo}
                        className="border-b border-ink/20 py-6 last:border-b-0"
                      >
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-ink">
                          {bloque.titulo}
                        </h3>

                        <p className="mt-3 text-base leading-[1.75] text-ink-soft">
                          {bloque.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Programación */}
        <section
          id="funciones"
          className="bg-paper-deep"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <h2 className="text-[clamp(2.2rem,4.5vw,3.2rem)]">
                  Programación
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-[1.75] text-ink-soft">
                  Conoce nuestras funciones y actividades más
                  recientes.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <Link
                  to="/funciones"
                  className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
                >
                  Ver todas las funciones
                </Link>
              </Reveal>
            </div>

            {funcionesRecientes.length ? (
              <div className="mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
                {funcionesRecientes.map(
                  (funcion, index) => (
                    <Reveal
                      key={funcion.slug}
                      delay={index * 80}
                    >
                      <FuncionCard funcion={funcion} />
                    </Reveal>
                  ),
                )}
              </div>
            ) : (
              <Reveal delay={120}>
                <div className="mt-10 border-y border-ink/20 py-8">
                  <p className="max-w-2xl text-lg leading-[1.75] text-ink-soft">
                    No hay funciones publicadas todavía.
                  </p>

                  <Link
                    to="/funciones"
                    className="link mt-5 inline-block font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
                  >
                    Ver funciones
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Dónde nos encontramos */}
        <section
          id="visitar"
          className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">
                  {visitar.titulo}
                </h2>

                <p className="mt-5 text-lg leading-[1.75] text-ink-soft">
                  {visitar.bajada}
                </p>
              </div>
            </Reveal>

            <ul className="grid gap-6">
              {visitar.direcciones.map(
                (direccion, i) => (
                  <Reveal
                    as="li"
                    key={direccion.calle}
                    delay={i * 100}
                  >
                    <div className="max-w-xl border border-ink/25 p-7">
                      <p className="font-display text-3xl">
                        {direccion.calle}
                      </p>

                      <p className="mt-3 font-sans text-base font-semibold text-ink-soft">
                        {direccion.comuna}
                      </p>

                      <a
                        href={direccion.mapa}
                        target="_blank"
                        rel="noreferrer"
                        className="link mt-5 inline-block font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
                      >
                        Ver en el mapa
                      </a>
                    </div>
                  </Reveal>
                ),
              )}
            </ul>
          </div>
        </section>

        {/* Contacto */}
        <section
          id="contacto"
          className="bg-paper-deep"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)]">
                {contacto.titulo}
              </h2>

              <p className="mt-5 max-w-lg text-lg leading-[1.75] text-ink-soft">
                {contacto.bajada}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 grid gap-8 border-t border-ink/25 pt-8 sm:grid-cols-2">
                <div>
                  <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft">
                    Correo electrónico
                  </p>

                  <a
                    href={`mailto:${contacto.correo}`}
                    className="link mt-3 inline-block break-all font-display text-[clamp(1.4rem,3vw,2rem)]"
                  >
                    {contacto.correo}
                  </a>
                </div>

                <div>
                  <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft">
                    Instagram
                  </p>

                  <a
                    href={contacto.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link mt-3 inline-block font-display text-[clamp(1.4rem,3vw,2rem)]"
                  >
                    {contacto.instagram.usuario}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}