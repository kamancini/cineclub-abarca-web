import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

const siteName = 'Cineclub Abarca'
const siteTitle = 'Cineclub Abarca — Un espacio íntimo de encuentro en torno al cine'
const siteDescription =
  'Espacio íntimo de encuentro en torno al cine en Ñuñoa: ciclos temáticos con funciones guiadas, gratuitas, para compartir opiniones, sensibilidades y vivencias personales.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteTitle },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#f2e8d8' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: siteTitle },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_CL' },
      {
        property: 'og:image',
        content: '/.netlify/images?url=/img/hero-cineclub.jpg&w=1200&h=630&fit=cover&fm=jpg',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Karla:ital,wght@0,400..700;1,400..500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
        <Scripts />
      </body>
    </html>
  )
}
