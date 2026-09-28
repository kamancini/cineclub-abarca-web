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
import { img, srcSet } from '@/lib/img'

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

function Foto({
  archivo,
  alt,
  proporcion,
  className = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  ancho = 1400,
}: {
  archivo: string
  alt: string
  proporcion: number
  className?: string
  sizes?: string
  ancho?: number
}) {
  return (
    <img
      src={img(archivo, {
        w: ancho,
        h: Math.round(ancho * proporcion),
      })}
      srcSet={srcSet(
        archivo,
        [600, 900, 1400, 1800],
        proporcion,
      )}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

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
          className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:pb-28 lg:pt-16"
        >
          <div className="relative">
            <Reveal>
              <figure className="overflow-hidden">
                <img
                  src="/img/hero-cineclub.jpg"
                  alt="Encuentro del Cineclub Abarca durante una función."
                  decoding="async"
                  fetchPriority="high"
                  className="h-[430px] w-full object-cover sm:h-[560px] lg:h-[680px]"
                />
              </figure>
            </Reveal>

            <Reveal
              delay={140}
              className="relative z-10 mx-auto -mt-20 w-[92%] sm:-mt-28 sm:w-[88%] lg:absolute lg:bottom-[-4rem] lg:left-10 lg:mt-0 lg:w-[58%]"
            >
              <div className="analog-paper-card p-7 sm:p-9 lg:p-11">
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-brick-deep">
                  Cineclub en Ñuñoa · Funciones gratuitas
                </p>

                <h1 className="mt-5">
                  <span className="block font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.94] text-ink">
                    Cineclub Abarca
                  </span>

                  <span className="mt-6 block max-w-2xl font-display text-[clamp(1.45rem,2.8vw,2.25rem)] italic leading-[1.3] text-ink">
                    {sitio.titulo}
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-ink-soft">
                  Nos reunimos en la Casa/Taller Patrimonial de
                  Agustín Abarca y en el Reino de Rosa Abarca.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-5">
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
                    className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
                  >
                    {sitio.accionSecundaria} en{' '}
                    {contacto.instagram.usuario}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Qué hacemos */}
        <section
          id="que-hacemos"
          className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-[clamp(2rem,4.2vw,3rem)]">
                  Qué hacemos
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  {queHacemos.bajada}
                </p>
              </Reveal>

              <Reveal
                delay={140}
                className="mt-8"
              >
                <figure className="aspect-3/2 overflow-hidden">
                  <Foto
                    archivo="funcion-cine.jpg"
                    proporcion={0.667}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    alt="Personas reunidas durante una función del Cineclub Abarca."
                  />
                </figure>
              </Reveal>
            </div>

            <ul className="grid gap-0 self-start border-t border-ink/20">
              {queHacemos.bloques.map(
                (bloque, i) => (
                  <Reveal
                    as="li"
                    key={bloque.titulo}
                    delay={i * 90}
                  >
                    <div className="border-b border-ink/20 py-7">
                      <h3 className="text-2xl leading-[1.18]">
                        {bloque.titulo}
                      </h3>

                      <p className="mt-3 text-base leading-[1.75] text-ink-soft">
                        {bloque.texto}
                      </p>
                    </div>
                  </Reveal>
                ),
              )}
            </ul>
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

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
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
                  <p className="max-w-2xl text-ink-soft">
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

                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
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

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
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