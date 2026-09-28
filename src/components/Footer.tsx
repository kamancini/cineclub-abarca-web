import { Link } from '@tanstack/react-router'

import { contacto } from '@/content/micrositio'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-paper/30 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
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

            <p className="mt-5 max-w-md text-lg leading-[1.75] text-paper">
              Un espacio íntimo de encuentro en torno al cine,
              diseñado para compartir opiniones, sensibilidades y
              vivencias personales.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <p className="text-base font-semibold uppercase tracking-[0.1em] text-paper">
              Explorar
            </p>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/proyecto"
                  className="link text-base text-paper"
                >
                  El proyecto
                </Link>
              </li>

              <li>
                <Link
                  to="/funciones"
                  className="link text-base text-paper"
                >
                  Funciones
                </Link>
              </li>

              <li>
                <Link
                  to="/ensayos"
                  className="link text-base text-paper"
                >
                  Ensayos
                </Link>
              </li>

              <li>
                <Link
                  to="/materiales"
                  className="link text-base text-paper"
                >
                  Materiales
                </Link>
              </li>

              <li>
                <Link
                  to="/contacto"
                  className="link text-base text-paper"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.1em] text-paper">
              Contacto
            </p>

            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${contacto.correo}`}
                className="link block break-all text-base text-paper"
              >
                {contacto.correo}
              </a>

              <a
                href={contacto.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${contacto.instagram.usuario} en Instagram, se abre en una pestaña nueva`}
                className="link block text-base text-paper"
              >
                {contacto.instagram.usuario}
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="flex flex-col gap-3 pt-6 text-base text-paper sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Cineclub Abarca
          </p>

          <p>Ñuñoa · Santiago de Chile</p>
        </div>
      </div>
    </footer>
  )
}