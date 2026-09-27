import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { getFuncionesPublicadas } from '@/lib/cupos'
import {
  estadoFuncion,
  etiquetasEstado,
  formatearFechaFuncion,
  puedeInscribirse,
} from '@/lib/funciones'

export const Route = createFileRoute('/funciones_/$slug')({
  loader: async ({ params }) => {
    const funciones = await getFuncionesPublicadas()
    const funcion = funciones.find((item) => item.slug === params.slug)
    if (!funcion) throw notFound()
    return funcion
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.titulo ?? 'Función'} | Cineclub Abarca` },
      {
        name: 'description',
        content: loaderData?.descripcion ?? 'Detalle de una función del Cineclub Abarca.',
      },
      { property: 'og:title', content: `${loaderData?.titulo ?? 'Función'} | Cineclub Abarca` },
      {
        property: 'og:description',
        content: loaderData?.descripcion ?? 'Detalle de una función del Cineclub Abarca.',
      },
      ...(loaderData?.imagen ? [{ property: 'og:image', content: loaderData.imagen }] : []),
    ],
  }),
  component: DetalleFuncion,
})

function DetalleFuncion() {
  const funcion = Route.useLoaderData()
  const estado = estadoFuncion(funcion)
  const disponible = puedeInscribirse(funcion)

  return (
    <>
      <BarraNavegacion />
      <main>
        <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Link to="/funciones" className="link kicker text-brick">
            ← Todas las funciones
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="kicker text-sepia">{etiquetasEstado[estado]}</span>
              <h1 className="mt-4 font-display text-[clamp(2.7rem,6vw,4.8rem)] leading-[0.98]">
                {funcion.titulo}
              </h1>
              {funcion.ciclo ? <p className="mt-4 font-display text-xl italic text-sepia">{funcion.ciclo}</p> : null}

              <dl className="mt-8 grid gap-3 border-y border-ink/15 py-6 text-ink-soft">
                <div>
                  <dt className="kicker text-sepia">Fecha</dt>
                  <dd className="mt-1">{formatearFechaFuncion(funcion.fecha)}</dd>
                </div>
                {funcion.hora ? (
                  <div>
                    <dt className="kicker text-sepia">Hora</dt>
                    <dd className="mt-1">{funcion.hora}</dd>
                  </div>
                ) : null}
                {funcion.lugar ? (
                  <div>
                    <dt className="kicker text-sepia">Lugar</dt>
                    <dd className="mt-1">{funcion.lugar}</dd>
                  </div>
                ) : null}
                {funcion.pelicula ? (
                  <div>
                    <dt className="kicker text-sepia">Película</dt>
                    <dd className="mt-1">{funcion.pelicula}</dd>
                  </div>
                ) : null}
                {funcion.obra ? (
                  <div>
                    <dt className="kicker text-sepia">Obra asociada</dt>
                    <dd className="mt-1">{funcion.obra}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-8 text-lg text-ink-soft">{funcion.descripcion}</p>

              {funcion.invitados?.length ? (
                <section className="mt-8" aria-labelledby="invitados">
                  <h2 id="invitados" className="text-2xl">Invitados</h2>
                  <ul className="mt-3 list-disc pl-5 text-ink-soft">
                    {funcion.invitados.map((invitado) => <li key={invitado}>{invitado}</li>)}
                  </ul>
                </section>
              ) : null}

              {funcion.informacionAdicional ? (
                <p className="mt-7 border-l-2 border-brick pl-5 text-ink-soft">{funcion.informacionAdicional}</p>
              ) : null}

              <div className="mt-9">
                {disponible ? (
                  <a
                    href={funcion.formularioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full bg-brick px-7 py-3.5 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                  >
                    Inscribirme
                  </a>
                ) : (
                  <span aria-disabled="true" className="inline-block cursor-not-allowed rounded-full bg-ink/10 px-7 py-3.5 font-bold tracking-wide text-ink-soft/70">
                    {estado === 'agotados' ? 'Cupos agotados' : estado === 'realizada' ? 'Actividad realizada' : 'Inscripciones cerradas'}
                  </span>
                )}
              </div>
            </div>

            {funcion.imagen ? (
              <figure className="lg:pt-4">
                <img
                  src={funcion.imagen}
                  alt={funcion.imagenAlt || `Afiche de ${funcion.titulo}`}
                  className="h-auto w-full object-cover"
                />
              </figure>
            ) : (
              <aside className="border border-ink/15 bg-paper-deep p-8 self-start">
                <p className="kicker text-sepia">Inscripción</p>
                <p className="mt-4 text-ink-soft">
                  {estado === 'realizada'
                    ? 'Esta actividad ya se realizó y permanece publicada como parte del archivo del cineclub.'
                    : disponible
                      ? 'La inscripción se realiza en el formulario de Google asociado específicamente a esta actividad.'
                      : 'La inscripción no está disponible en este momento.'}
                </p>
                {typeof funcion.cuposMaximos === 'number' ? (
                  <p className="mt-5 text-sm text-sepia">Capacidad máxima: {funcion.cuposMaximos} personas.</p>
                ) : null}
              </aside>
            )}
          </div>
        </article>
      </main>
    </>
  )
}
