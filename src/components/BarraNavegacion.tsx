import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

const enlaces = [
  { etiqueta: 'El proyecto', to: '/proyecto' },
  { etiqueta: 'Funciones', to: '/funciones' },
  { etiqueta: 'Ensayos', to: '/ensayos' },
  { etiqueta: 'Materiales', to: '/materiales' },
  { etiqueta: 'Contacto', to: '/contacto' },
] as const

export function BarraNavegacion() {
  const [abierto, setAbierto] = useState(false)

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          onClick={() => setAbierto(false)}
          className="shrink-0"
          aria-label="Cineclub Abarca — Inicio"
        >
          <img
            src="/img/logo-cineclub.png"
            alt=""
            width={160}
            height={64}
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navegación principal"
        >
          {enlaces.map((enlace) => {
            const activo = pathname === enlace.to

            return (
              <Link
                key={enlace.etiqueta}
                to={enlace.to}
                aria-current={activo ? 'page' : undefined}
                className={`nav-link font-sans text-xs uppercase tracking-[0.14em] text-ink transition-opacity hover:opacity-55 ${
                  activo ? 'font-semibold' : ''
                }`}
              >
                {enlace.etiqueta}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((valor) => !valor)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-brick text-paper md:hidden"
        >
          <span
            aria-hidden="true"
            className="text-xl leading-none"
          >
            {abierto ? '×' : '☰'}
          </span>
        </button>
      </div>

      {abierto ? (
        <nav
          id="menu-movil"
          className="border-t border-ink/10 bg-brick px-5 py-6 md:hidden"
          aria-label="Navegación móvil"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-5">
            {enlaces.map((enlace) => {
              const activo = pathname === enlace.to

              return (
                <Link
                  key={enlace.etiqueta}
                  to={enlace.to}
                  aria-current={activo ? 'page' : undefined}
                  onClick={() => setAbierto(false)}
                  className={`font-sans text-sm uppercase tracking-[0.15em] text-paper ${
                    activo ? 'font-semibold underline underline-offset-4' : ''
                  }`}
                >
                  {enlace.etiqueta}
                </Link>
              )
            })}
          </div>
        </nav>
      ) : null}
    </header>
  )
}