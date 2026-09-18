import { createFileRoute } from '@tanstack/react-router'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { FormularioInscripcion } from '@/components/FormularioInscripcion'
import { Reveal } from '@/components/Reveal'
import { img, srcSet } from '@/lib/img'
import {
  acciones,
  contacto,
  equipo,
  inscripcion,
  origen,
  proposito,
  publico,
  queHacemos,
  sitio,
  visitar,
} from '@/content/micrositio'

export const Route = createFileRoute('/')({
  component: Micrositio,
})

/* ---------- piezas compartidas ---------- */

function Numero({ children, tono = 'ink' }: { children: string; tono?: 'ink' | 'paper' }) {
  return (
    <span
      className={`kicker ${tono === 'ink' ? 'text-brick' : 'text-brick-light'}`}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

function Perforacion() {
  return <div className="perf opacity-60" aria-hidden="true" />
}

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
      src={img(archivo, { w: ancho, h: Math.round(ancho * proporcion) })}
      srcSet={srcSet(archivo, [600, 900, 1400, 1800], proporcion)}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/* ---------- micrositio ---------- */

function Micrositio() {
  return (
    <>
      <BarraNavegacion />
      <main>
        {/* 01 · Portada */}
        <section id="portada" className="relative overflow-hidden bg-ink text-paper">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pt-20 lg:pb-24">
            <div className="lg:pt-6">
              <Reveal>
                <p className="kicker text-brick-light">
                  Cineclub en Ñuñoa · Funciones gratuitas
                </p>
                <h1 className="mt-5 text-balance">
                  <span className="block font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.95]">
                    Cineclub Abarca
                  </span>
                  <span className="mt-3 block font-display text-[clamp(1.35rem,3vw,2.15rem)] font-light italic leading-[1.15] text-paper/80">
                    {sitio.titulo}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-7 max-w-xl font-display text-xl italic text-paper/90">
                  {sitio.frase}
                </p>
                <p className="mt-5 max-w-xl text-lg text-paper/80">{sitio.entrada}</p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#inscripcion"
                    className="rounded-full bg-brick px-7 py-3.5 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                  >
                    {sitio.accionPrincipal}
                  </a>
                  <a
                    href={contacto.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link kicker text-paper/75"
                  >
                    {sitio.accionSecundaria} en {contacto.instagram.usuario}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/15 pt-5">
                  {sitio.personalidad.map((palabra) => (
                    <li key={palabra} className="kicker text-paper/55">
                      {palabra}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={160} className="lg:-mr-16">
              <figure className="relative">
                <div className="aspect-4/5 overflow-hidden sm:aspect-3/2 lg:aspect-4/5">
                  <img
                    src={img('hero-cineclub.jpg', { w: 1200, h: 1500 })}
                    srcSet={srcSet('hero-cineclub.jpg', [700, 1000, 1400, 1800], 1.25)}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    alt="Personas sentadas en círculo en el living de la Casa Taller, conversando y riendo antes de una función del cineclub."
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 max-w-sm text-sm text-paper/55">
                  Una función del Cineclub Abarca en la Casa Taller: conversación
                  antes de que se apague la luz.
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <Perforacion />
        </section>

        {/* 02 · Qué hacemos */}
        <section id="que-hacemos" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <Numero>{`${queHacemos.numero} — Qué hacemos`}</Numero>
                <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)]">{queHacemos.titulo}</h2>
                <p className="mt-6 text-lg text-ink-soft">{queHacemos.bajada}</p>
              </Reveal>
              <Reveal delay={140} className="mt-8">
                <figure className="aspect-3/2 overflow-hidden">
                  <Foto
                    archivo="funcion-cine.jpg"
                    proporcion={0.667}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    alt="Proyección casera: el público mira una película en blanco y negro proyectada sobre un telón en el living."
                  />
                </figure>
              </Reveal>
            </div>

            <ul className="grid gap-0 self-start border-t border-ink/15">
              {queHacemos.bloques.map((bloque, i) => (
                <Reveal as="li" key={bloque.titulo} delay={i * 90}>
                  <div className="group flex gap-5 border-b border-ink/15 py-7">
                    <span className="kicker mt-1.5 shrink-0 text-sepia">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-2xl">{bloque.titulo}</h3>
                      <p className="mt-2 text-ink-soft">{bloque.texto}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 · Por qué existe */}
        <section id="proposito" className="bg-ink text-paper">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <Reveal className="order-2 lg:order-1">
              <figure className="aspect-4/3 overflow-hidden">
                <Foto
                  archivo="conversacion-cineclub.jpg"
                  proporcion={0.75}
                  alt="Grupo de personas conversando sentadas en sillones y sillas después de la función, con un proyector sobre la mesa."
                />
              </figure>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <Numero tono="paper">{`${proposito.numero} — Por qué existe`}</Numero>
                <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)]">{proposito.titulo}</h2>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="mt-8 border-l-2 border-brick pl-6 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight italic">
                  {proposito.destacado}
                </blockquote>
              </Reveal>
              <Reveal delay={180}>
                {proposito.parrafos.map((parrafo) => (
                  <p key={parrafo} className="mt-6 max-w-xl text-paper/80">
                    {parrafo}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* 04 · Origen */}
        <section id="origen" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <Numero>{`${origen.numero} — Origen`}</Numero>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3rem)]">{origen.titulo}</h2>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal delay={90}>
                {origen.parrafos.map((parrafo, i) => (
                  <p
                    key={parrafo}
                    className={
                      i === 0
                        ? 'text-lg text-ink-soft'
                        : 'mt-5 text-ink-soft'
                    }
                  >
                    {parrafo}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={170}>
                <dl className="mt-10 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-2">
                  {origen.hitos.map((hito) => (
                    <div key={hito.dato}>
                      <dt className="font-display text-4xl text-brick">{hito.dato}</dt>
                      <dd className="mt-1 text-sm text-ink-soft">{hito.glosa}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={130}>
              <figure>
                <div className="aspect-4/5 overflow-hidden">
                  <Foto
                    archivo="comunidad-patio.jpg"
                    proporcion={1.25}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    alt="Personas reunidas en el patio de la casa alrededor de una mesa con comida compartida, bajo los árboles."
                  />
                </div>
                <figcaption className="mt-3 text-sm text-sepia">
                  La tradición del encuentro doméstico: el patio antes de entrar a
                  la función.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* 05 · Quiénes somos */}
        <section id="equipo" className="bg-paper-deep">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <Reveal>
                  <Numero>{`${equipo.numero} — Quiénes somos`}</Numero>
                  <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)]">{equipo.titulo}</h2>
                  <p className="mt-6 text-lg text-ink-soft">{equipo.bajada}</p>
                </Reveal>

                <ul className="mt-8">
                  {equipo.personas.map((persona, i) => (
                    <Reveal as="li" key={persona.nombre} delay={i * 100}>
                      <div className="border-t border-ink/20 py-5">
                        <h3 className="text-2xl">{persona.nombre}</h3>
                        <p className="kicker mt-2 text-sepia">{persona.rol}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={200}>
                  {equipo.parrafos.map((parrafo) => (
                    <p key={parrafo} className="mt-5 text-ink-soft">
                      {parrafo}
                    </p>
                  ))}
                </Reveal>
              </div>

              <Reveal delay={120} className="lg:pt-16">
                <figure>
                  <div className="aspect-4/3 overflow-hidden">
                    <Foto
                      archivo="proyecto-casa.jpg"
                      proporcion={0.75}
                      alt="Tres personas conversando de pie junto a la entrada de la casa; una lleva una bolsa de tela con el logotipo cca, cine club abarca."
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-sepia">
                    Más que espectadores: una comunidad que se queda conversando.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 06 · Para quién es */}
        <section id="publico" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <figure className="aspect-3/2 overflow-hidden lg:aspect-4/5">
                <Foto
                  archivo="comunidad-interior.jpg"
                  proporcion={1.25}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  alt="Un grupo numeroso de personas jóvenes y adultas sonríe a la cámara en el living de la casa, con un perro echado en primer plano."
                />
              </figure>
            </Reveal>

            <div className="lg:pt-8">
              <Reveal delay={80}>
                <Numero>{`${publico.numero} — Público`}</Numero>
                <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)]">{publico.titulo}</h2>
                <p className="mt-6 text-lg text-ink-soft">{publico.bajada}</p>
              </Reveal>
              <ul className="mt-8 grid gap-4">
                {publico.puntos.map((punto, i) => (
                  <Reveal as="li" key={punto} delay={100 + i * 80}>
                    <div className="flex gap-4 border-t border-ink/15 pt-4">
                      <span
                        className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brick"
                        aria-hidden="true"
                      />
                      <span className="text-ink-soft">{punto}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 07 · Qué puedes hacer en este sitio */}
        <section id="sitio" className="bg-paper-deep">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <Reveal>
                  <Numero>{`${acciones.numero} — Este sitio`}</Numero>
                  <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">
                    {acciones.titulo}
                  </h2>
                </Reveal>
                <Reveal delay={120} className="mt-6 hidden lg:block">
                  <figure className="aspect-4/3 overflow-hidden">
                    <Foto
                      archivo="fanzine-encuentro.jpg"
                      proporcion={0.75}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      alt="Mesa con publicaciones impresas del cineclub; varias personas las hojean durante un encuentro."
                    />
                  </figure>
                </Reveal>
              </div>

              <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {acciones.items.map((item, i) => (
                  <Reveal as="li" key={item.titulo} delay={i * 80}>
                    <div className="h-full border-t border-ink/20 pt-4">
                      <h3 className="text-xl">{item.titulo}</h3>
                      <p className="mt-2 text-sm text-ink-soft">{item.texto}</p>
                      {item.enlace ? (
                        <a
                          href={item.enlace.href}
                          className="link kicker mt-3 inline-block text-brick"
                        >
                          {item.enlace.texto}
                        </a>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 08 · Inscripción — acción principal */}
        <section id="inscripcion" className="bg-ink text-paper">
          <Perforacion />
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:py-28">
            <div>
              <Reveal>
                <Numero tono="paper">{`${inscripcion.numero} — Inscripción`}</Numero>
                <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.2rem)]">
                  {inscripcion.titulo}
                </h2>
                <p className="mt-6 max-w-md text-lg text-paper/80">{inscripcion.bajada}</p>
                <p className="mt-4 max-w-md text-sm text-paper/55">{inscripcion.nota}</p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <FormularioInscripcion />
            </Reveal>
          </div>
        </section>

        {/* 09 · Dónde nos encontramos */}
        <section id="visitar" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Numero>{`${visitar.numero} — Dónde estamos`}</Numero>
              <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">{visitar.titulo}</h2>
              <p className="mt-5 text-ink-soft">{visitar.bajada}</p>
            </Reveal>

            <ul className="grid gap-6 sm:grid-cols-2">
              {visitar.direcciones.map((direccion, i) => (
                <Reveal as="li" key={direccion.calle} delay={i * 100}>
                  <div className="h-full border border-ink/20 p-6">
                    <p className="font-display text-3xl">{direccion.calle}</p>
                    <p className="kicker mt-2 text-sepia">{direccion.comuna}</p>
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
              ))}
            </ul>
          </div>
        </section>

        {/* 10 · Contacto */}
        <section id="contacto" className="bg-paper-deep">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <Numero>{`${contacto.numero} — Contacto`}</Numero>
              <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">{contacto.titulo}</h2>
              <p className="mt-5 max-w-lg text-ink-soft">{contacto.bajada}</p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 grid gap-8 border-t border-ink/20 pt-8 sm:grid-cols-2">
                <div>
                  <p className="kicker text-sepia">Correo electrónico</p>
                  <a
                    href={`mailto:${contacto.correo}`}
                    className="link mt-2 inline-block font-display text-[clamp(1.4rem,3vw,2rem)] break-all"
                  >
                    {contacto.correo}
                  </a>
                </div>
                <div>
                  <p className="kicker text-sepia">Instagram</p>
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

            <Reveal delay={160}>
              <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/20 pt-8">
                <div>
                  <img
                    src={img('logo-cineclub.png', { w: 320 })}
                    alt="Logotipo cca, cine club abarca"
                    width={160}
                    height={64}
                    className="h-12 w-auto opacity-80"
                  />
                  <p className="mt-3 max-w-xs text-sm text-sepia">
                    Un espacio de «sentipensamientos» en torno al cine. Ñuñoa,
                    Santiago.
                  </p>
                </div>
                <a
                  href="#inscripcion"
                  className="rounded-full bg-brick px-6 py-3 font-bold tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                >
                  {sitio.accionPrincipal}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
