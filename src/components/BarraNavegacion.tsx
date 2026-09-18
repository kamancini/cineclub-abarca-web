import { navegacion, sitio } from '@/content/micrositio'

export function BarraNavegacion() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/12 bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3 sm:px-8">
        <a
          href="#portada"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${sitio.nombre}, ir al inicio`}
        >
          <img
            src="/.netlify/images?url=/img/logo-cineclub.png&w=200&fm=webp"
            alt=""
            width={100}
            height={40}
            className="h-7 w-auto"
          />
          <span className="sr-only">{sitio.nombre}</span>
        </a>

        <nav aria-label="Secciones del sitio" className="hidden flex-1 lg:block">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {navegacion.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="kicker text-ink-soft transition-colors hover:text-brick"
                >
                  {item.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#inscripcion"
          className="ml-auto shrink-0 rounded-full bg-brick px-4 py-2 text-[0.8rem] font-bold tracking-wide text-paper transition-colors hover:bg-brick-deep sm:px-5"
        >
          Inscribirme
        </a>
      </div>

      {/* En pantallas angostas las secciones viajan en una tira desplazable */}
      <nav
        aria-label="Secciones del sitio"
        className="overflow-x-auto border-t border-ink/10 lg:hidden"
      >
        <ul className="flex w-max items-center gap-5 px-5 py-2 sm:px-8">
          {navegacion.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="kicker whitespace-nowrap text-ink-soft">
                {item.etiqueta}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
