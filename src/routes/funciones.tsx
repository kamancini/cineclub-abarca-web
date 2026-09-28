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
      { title: 'Funciones | Cineclub Abarca' },
      {
        name: 'description',
        content:
          'Próximas funciones, ciclos y actividades del Cineclub Abarca, junto con el archivo de encuentros anteriores.',
      },
      { property: 'og:title', content: 'Funciones | Cineclub Abarca' },
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
        {/* Encabezado editorial con foto + bloque de papel */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
          <div className="relative lg:min-h-[620px]">
            <div className="grid items-center gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              {/* Foto */}
              <Reveal>
                <div className="relative z-10 overflow-hidden bg-paper-deep lg:max-w-[760px]">
                  <img
                    src="/img/comunidad-interior.jpg"
                    alt="Asistentes reunidos durante una función del Cineclub Abarca."
                    loading="eager"
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[650px]"
                  />
                </div>
              </Reveal>

              {/* Bloque de texto tipo papel */}
              <Reveal delay={100}>
                <div className="relative z-20 -mt-8 ml-0 bg-transparent lg:-ml-16 lg:mt-0">
                  <div className="analog-paper-card px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                    <p className="kicker text-brick">
                      Programación
                    </p>

                    <h1 className="mt-4 max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] text-ink">
                      Funciones y actividades
                    </h1>

                    <p className="mt-6 max-w-2xl text-[1.08rem] leading-[1.9] text-ink-soft sm:text-[1.14rem]">
                      Revisa nuestras próximas funciones, ciclos y actividades,
                      e inscríbete cuando haya cupos disponibles. Aquí también
                      encontrarás el archivo de encuentros anteriores.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Próximas funciones */}
        <section
          className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16"
          aria-labelledby="proximas-funciones"
        >
          <Reveal>
            <p className="kicker text-brick">Próximamente</p>
            <h2
              id="proximas-funciones"
              className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.12]"
            >
              Próximas funciones
            </h2>
          </Reveal>

          {proximas.length ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {proximas.map((funcion, index) => (
                <Reveal key={funcion.slug} delay={index * 80}>
                  <FuncionCard funcion={funcion} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={100}>
              <div className="mt-10 border-y border-ink/15 py-8">
                <p className="max-w-2xl text-[1.05rem] leading-[1.85] text-ink-soft">
                  No hay una próxima función publicada todavía. Cuando se agregue
                  una nueva actividad al archivo central de funciones aparecerá
                  aquí automáticamente.
                </p>
              </div>
            </Reveal>
          )}
        </section>

        {/* Archivo */}
        <section className="bg-paper-deep" aria-labelledby="archivo-funciones">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <p className="kicker text-sepia">Archivo</p>
              <h2
                id="archivo-funciones"
                className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.12]"
              >
                Funciones anteriores
              </h2>

              <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.85] text-ink-soft">
                Las actividades pasadas se conservan como parte de la memoria del
                cineclub; no desaparecen cuando termina la inscripción.
              </p>
            </Reveal>

            {anteriores.length ? (
              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {anteriores.map((funcion, index) => (
                  <Reveal key={funcion.slug} delay={index * 70}>
                    <FuncionCard funcion={funcion} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mt-10 text-[1.05rem] leading-[1.85] text-ink-soft">
                Aún no hay actividades archivadas.
              </p>
            )}

            <Link
              to="/"
              className="link mt-12 inline-block font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}