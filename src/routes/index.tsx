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
        title: 'Cineclub Abarca | Cine, conversación y comunidad',
      },
      {
        name: 'description',
        content:
          'Cineclub Abarca es un espacio íntimo y gratuito de mediación cinematográfica, conversación y comunidad en Ñuñoa.',
      },
      {
        property: 'og:title',
        content: 'Cineclub Abarca | Cine, conversación y comunidad',
      },
      {
        property: 'og:description',
        content:
          'Funciones guiadas, artículos y encuentros en torno al cine en Ñuñoa.',
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
          className="relative min-h-[90vh] bg-ink bg-cover bg-center bg-no-repeat text-paper"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(23,19,15,0.90) 0%, rgba(23,19,15,0.72) 42%, rgba(23,19,15,0.28) 100%), url('/img/hero-cineclub.jpg')",
          }}
        >
          <div className="mx-auto flex min-h-[90vh] max-w-6xl items-end px-5 py-16 sm:px-8 sm:py-20 lg:items-center lg:py-24">
            <div className="max-w-3xl">
              <Reveal>
                <p className="kicker text-brick-light">
                  Cineclub en Ñuñoa · Funciones gratuitas
                </p>

                <h1 className="mt-5">
                  <span className="block font-display text-[clamp(3.2rem,8vw,5.9rem)] leading-[0.92] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
                    Cineclub Abarca
                  </span>

                  <span className="mt-6 block max-w-2xl font-display text-[clamp(1.55rem,3vw,2.5rem)] italic leading-[1.3] text-paper/95 [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
                    {sitio.titulo}
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-[1.7] text-paper/90 sm:text-lg">
                  Nos reunimos en la Casa/Taller Patrimonial de
                  Agustín Abarca y en el Reino de Rosa Abarca.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/funciones"
                    className="rounded-full bg-brick px-7 py-3.5 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                  >
                    Ver funciones
                  </Link>

                  <a
                    href={contacto.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link kicker text-paper/90"
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

              <Reveal delay={140} className="mt-8">
                <figure className="aspect-3/2 overflow-hidden">
                  <Foto
                    archivo="funcion-cine.jpg"
                    proporcion={0.667}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    alt="Personas reunidas durante una función del Cineclub Abarca observando una película proyectada en el living."
                  />
                </figure>
              </Reveal>
            </div>

            <ul className="grid gap-0 self-start border-t border-ink/15">
              {queHacemos.bloques.map((bloque, i) => (
                <Reveal
                  as="li"
                  key={bloque.titulo}
                  delay={i * 90}
                >
                  <div className="border-b border-ink/15 py-7">
                    <h3 className="text-2xl leading-[1.18]">
                      {bloque.titulo}
                    </h3>

                    <p className="mt-3 leading-relaxed text-ink-soft">
                      {bloque.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
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
                  className="link kicker text-brick"
                >
                  Ver todas las funciones
                </Link>
              </Reveal>
            </div>

            {funcionesRecientes.length ? (
              <div className="mt-10 grid max-w-4xl gap-10 md:grid-cols-2">
                {funcionesRecientes.map((funcion, index) => (
                  <Reveal
                    key={funcion.slug}
                    delay={index * 80}
                  >
                    <FuncionCard funcion={funcion} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal delay={120}>
                <div className="mt-10 border-y border-ink/15 py-8">
                  <p className="max-w-2xl text-ink-soft">
                    No hay funciones publicadas todavía.
                  </p>

                  <Link
                    to="/funciones"
                    className="link kicker mt-5 inline-block text-brick"
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

            <ul className="grid gap-6 sm:grid-cols-2">
              {visitar.direcciones.map(
                (direccion, i) => (
                  <Reveal
                    as="li"
                    key={direccion.calle}
                    delay={i * 100}
                  >
                    <div className="h-full border border-ink/20 p-6">
                      <p className="font-display text-3xl">
                        {direccion.calle}
                      </p>

                      <p className="kicker mt-3 text-sepia">
                        {direccion.comuna}
                      </p>

                      <a
                        href={direccion.mapa}
                        target="_blank"
                        rel="noreferrer"
                        className="link kicker mt-5 inline-block text-brick"
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

              <p className="mt-5 max-w-lg text-ink-soft">
                {contacto.bajada}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 grid gap-8 border-t border-ink/20 pt-8 sm:grid-cols-2">
                <div>
                  <p className="kicker text-sepia">
                    Correo electrónico
                  </p>

                  <a
                    href={`mailto:${contacto.correo}`}
                    className="link mt-2 inline-block break-all font-display text-[clamp(1.4rem,3vw,2rem)]"
                  >
                    {contacto.correo}
                  </a>
                </div>

                <div>
                  <p className="kicker text-sepia">
                    Instagram
                  </p>

                  <a
                    href={contacto.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link mt-2 inline-block font-display text-[clamp(1.4rem,3vw,2rem)]"
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