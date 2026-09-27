import { createFileRoute, Link } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { FuncionCard } from '@/components/FuncionCard'
import { Reveal } from '@/components/Reveal'
import { getFuncionesPublicadas } from '@/lib/cupos'
import { separarFunciones } from '@/lib/funciones'

export const Route = createFileRoute('/funciones')({
  loader: () => getFuncionesPublicadas(),

  head: () => ({
    meta: [
      {
        title: 'Funciones | Cineclub Abarca',
      },
      {
        name: 'description',
        content:
          'Próximas funciones, ciclos y actividades del Cineclub Abarca, junto con el archivo de encuentros anteriores.',
      },
      {
        property: 'og:title',
        content: 'Funciones | Cineclub Abarca',
      },
      {
        property: 'og:description',
        content:
          'Programación y archivo de funciones del Cineclub Abarca en Ñuñoa.',
      },
    ],
  }),

  component: PaginaFunciones,
})

function PaginaFunciones() {
  const funciones = Route.useLoaderData()
  const { proximas, anteriores } = separarFunciones(funciones)

  return (
    <>
      <BarraNavegacion />

      <main>
        {/* Portada */}
        <header
          className="relative flex h-[220px] items-end overflow-hidden text-paper sm:h-[240px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(23,19,15,0.72) 0%, rgba(23,19,15,0.38) 55%, rgba(23,19,15,0.16) 100%), url('/img/comunidad-interior.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 124%',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-7 sm:px-8 sm:pb-9">
            <h1 className="font-display text-[clamp(2.7rem,5.5vw,4.6rem)] leading-[0.95] text-paper [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
              Funciones y actividades
            </h1>

            <p className="mt-3 max-w-xl text-base leading-[1.6] text-paper/90 sm:text-lg">
              Funciones, ciclos y actividades del Cineclub Abarca.
            </p>
          </div>
        </header>

        {/* Próximas funciones */}
        <section
          aria-labelledby="proximas-funciones"
          className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24"
        >
          <Reveal>
            <p className="kicker text-brick">
              Próximamente
            </p>

            <h2
              id="proximas-funciones"
              className="text-[clamp(2rem,4vw,3rem)]"
            >
              Próximas funciones
            </h2>
          </Reveal>

          {proximas.length ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {proximas.map((funcion, index) => (
                <Reveal
                  key={funcion.slug}
                  delay={index * 80}
                >
                  <FuncionCard funcion={funcion} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={100}>
              <div className="mt-10 border-y border-ink/15 py-8">
                <p className="max-w-2xl text-ink-soft">
                  No hay próximas funciones publicadas por ahora.
                  Cuando anunciemos una nueva actividad, aparecerá aquí.
                </p>
              </div>
            </Reveal>
          )}
        </section>

        {/* Funciones anteriores */}
        <section
          aria-labelledby="archivo-funciones"
          className="bg-paper-deep"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <p className="kicker text-sepia">
                Archivo
              </p>

              <h2
                id="archivo-funciones"
                className="text-[clamp(2rem,4vw,3rem)]"
              >
                Funciones anteriores
              </h2>

              <p className="mt-5 max-w-2xl text-ink-soft">
                Las actividades pasadas se conservan como parte de la
                memoria del cineclub; no desaparecen cuando termina la
                inscripción.
              </p>
            </Reveal>

            {anteriores.length ? (
              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {anteriores.map((funcion, index) => (
                  <Reveal
                    key={funcion.slug}
                    delay={index * 70}
                  >
                    <FuncionCard funcion={funcion} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mt-10 text-ink-soft">
                Aún no hay actividades archivadas.
              </p>
            )}

            <Link
              to="/"
              className="link kicker mt-12 inline-block text-brick"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}