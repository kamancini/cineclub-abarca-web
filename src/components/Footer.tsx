import { Link } from '@tanstack/react-router'

import { contacto } from '@/content/micrositio'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-paper/20 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Identidad */}
          <div>
            <Link
              to="/"
              aria-label="Cineclub Abarca — Inicio"
              className="inline-block"
            >
              <img
                src="/img/logo-cineclub.png"
                alt=""
                width={190}
                height={76}
                className="h-auto w-[170px] brightness-0 invert sm:w-[190px]"
              />
            </Link>

            <p className="mt-5 max-w-md leading-[1.7] text-paper/80">
              Un espacio íntimo de encuentro en torno al cine, diseñado para
              compartir opiniones, sensibilidades y vivencias personales.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-paper/70">
              Explorar
            </p>

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/proyecto"
                  className="transition-opacity hover:opacity-70"
                >
                  El proyecto
                </Link>
              </li>

              <li>
                <Link
                  to="/funciones"
                  className="transition-opacity hover:opacity-70"
                >
                  Funciones
                </Link>
              </li>

              <li>
                <Link
                  to="/ensayos"
                  className="transition-opacity hover:opacity-70"
                >
                  Ensayos
                </Link>
              </li>

              <li>
                <Link
                  to="/materiales"
                  className="transition-opacity hover:opacity-70"
                >
                  Materiales
                </Link>
              </li>

              <li>
                <Link
                  to="/contacto"
                  className="transition-opacity hover:opacity-70"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-paper/70">
              Contacto
            </p>

            <div className="mt-4 space-y-3">
              <a
                href={`mailto:${contacto.correo}`}
                className="block break-all transition-opacity hover:opacity-70"
              >
                {contacto.correo}
              </a>

              <a
                href={contacto.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="block transition-opacity hover:opacity-70"
              >
                {contacto.instagram.usuario}
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="flex flex-col gap-3 pt-6 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cineclub Abarca</p>

          <p>Ñuñoa · Santiago de Chile</p>
        </div>
      </div>
    </footer>
  )
}