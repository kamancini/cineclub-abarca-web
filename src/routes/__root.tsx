import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import '../styles.css'

import { BarraNavegacion } from '@/components/BarraNavegacion'
import { Footer } from '@/components/Footer'

const siteName = 'Cineclub Abarca'

const siteTitle =
  'Cineclub Abarca — Un espacio íntimo de encuentro en torno al cine'

const siteDescription =
  'Espacio íntimo de encuentro en torno al cine en Ñuñoa: ciclos temáticos con funciones guiadas, gratuitas, para compartir opiniones, sensibilidades y vivencias personales.'

const siteUrl = 'https://cineclubabarca.cl'

const socialImage = `${siteUrl}/img/hero-cineclub.jpg`

const socialImageAlt =
  'Encuentro del Cineclub Abarca en torno a una función de cine.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteTitle,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'theme-color',
        content: '#f2e8d8',
      },

      // Open Graph
      {
        property: 'og:site_name',
        content: siteName,
      },
      {
        property: 'og:title',
        content: siteTitle,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'es_CL',
      },
      {
        property: 'og:image',
        content: socialImage,
      },
      {
        property: 'og:image:alt',
        content: socialImageAlt,
      },

      // Twitter / X
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: siteTitle,
      },
      {
        name: 'twitter:description',
        content: siteDescription,
      },
      {
        name: 'twitter:image',
        content: socialImage,
      },
      {
        name: 'twitter:image:alt',
        content: socialImageAlt,
      },
    ],

    links: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/favicon.png',
      },
    ],
  }),

  notFoundComponent: PaginaNoEncontrada,

  shellComponent: RootDocument,
})

function PaginaNoEncontrada() {
  return (
    <>
      <BarraNavegacion />

      <main>
        <section className="mx-auto flex min-h-[65vh] max-w-6xl items-center px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-brick-deep">
              Error 404
            </p>

            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] text-ink">
              Esta página no existe
            </h1>

            <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
              Puede que el enlace haya cambiado o que la página ya no
              esté disponible.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-brick-deep px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-paper transition-transform hover:-translate-y-0.5"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

function RootDocument({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}

        <Footer />

        <div
          className="grain"
          aria-hidden="true"
        />

        <Scripts />
      </body>
    </html>
  )
}