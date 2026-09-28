import { Link } from '@tanstack/react-router'

import type { Funcion } from '@/content/funciones'
import {
  estadoFuncion,
  etiquetasEstado,
  formatearFechaFuncion,
  puedeInscribirse,
} from '@/lib/funciones'

function claseEstado(
  estado: ReturnType<typeof estadoFuncion>,
) {
  switch (estado) {
    case 'abiertas':
      return 'border-ink/35 bg-paper text-ink'

    case 'ultimos_cupos':
      return 'border-brick-deep/50 bg-brick/10 text-brick-deep'

    case 'agotados':
    case 'cerradas':
      return 'border-ink/25 bg-ink/5 text-ink'

    case 'realizada':
      return 'border-ink/25 bg-sepia/10 text-ink'
  }
}

export function FuncionCard({
  funcion,
  compacta = false,
}: {
  funcion: Funcion
  compacta?: boolean
}) {
  const estado = estadoFuncion(funcion)
  const disponible = puedeInscribirse(funcion)

  const mostrarCupos =
    typeof funcion.cuposDisponibles === 'number' &&
    (estado === 'abiertas' ||
      estado === 'ultimos_cupos')

  const tieneDetalle = Boolean(
    funcion.pelicula ||
      funcion.obra ||
      funcion.imagen ||
      funcion.invitados?.length ||
      funcion.informacionAdicional,
  )

  return (
    <article className="analog-paper-card flex h-full flex-col p-5 sm:p-6">
      {funcion.imagen ? (
        <div className="mb-5 aspect-4/3 overflow-hidden bg-paper-deep">
          <img
            src={funcion.imagen}
            alt={
              funcion.imagenAlt ||
              `Afiche de ${funcion.titulo}`
            }
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1.5 font-sans text-sm font-semibold uppercase tracking-[0.08em] ${claseEstado(
            estado,
          )}`}
        >
          {etiquetasEstado[estado]}
        </span>

        {mostrarCupos ? (
          <span className="text-base text-ink-soft">
            {funcion.cuposDisponibles}{' '}
            {funcion.cuposDisponibles === 1
              ? 'cupo disponible'
              : 'cupos disponibles'}
          </span>
        ) : null}
      </div>

      <h3 className="mt-7 text-[clamp(1.6rem,3vw,2rem)] leading-[1.22]">
        {funcion.titulo}
      </h3>

      {funcion.ciclo ? (
        <p className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-ink-soft">
          {funcion.ciclo}
        </p>
      ) : null}

      <dl className="mt-6 grid gap-3 text-base leading-relaxed text-ink-soft">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-semibold text-ink">
            Fecha:
          </dt>

          <dd>
            {formatearFechaFuncion(funcion.fecha)}
          </dd>
        </div>

        {funcion.hora ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-ink">
              Hora:
            </dt>

            <dd>{funcion.hora}</dd>
          </div>
        ) : null}

        {funcion.lugar ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-ink">
              Lugar:
            </dt>

            <dd>{funcion.lugar}</dd>
          </div>
        ) : null}
      </dl>

      {!compacta ? (
        <p className="mt-6 text-base leading-[1.75] text-ink-soft">
          {funcion.descripcion}
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
        {disponible ? (
          <a
            href={funcion.formularioUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brick-deep px-5 py-3 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Inscribirme
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="rounded-full bg-ink/10 px-5 py-3 font-semibold text-ink"
          >
            {estado === 'agotados'
              ? 'Cupos agotados'
              : estado === 'realizada'
                ? 'Actividad realizada'
                : 'Inscripciones cerradas'}
          </span>
        )}

        {tieneDetalle ? (
          <Link
            to="/funciones/$slug"
            params={{ slug: funcion.slug }}
            className="link font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brick-deep"
          >
            Ver detalle
          </Link>
        ) : null}
      </div>
    </article>
  )
}