# AGENTS.md

Guía de arquitectura del micrositio de **Cineclub Abarca** para quienes
(personas o agentes) trabajen después en este repositorio.

## Qué es este proyecto

Micrositio de una sola página, en español, construido con TanStack Start y
desplegado en Netlify. Publica los contenidos del "Documento base del
micrositio" del Cineclub Abarca organizados en diez módulos, con una acción
principal: inscribirse a una función mediante Netlify Forms.

## Regla editorial (importante)

Los textos se derivan del documento base del proyecto. **No inventar datos**:
programación, precios, horarios, cupos o material descargable no existen en la
fuente. Si hace falta un dato nuevo, hay que pedirlo al equipo del cineclub, no
redactarlo. Los pendientes conocidos están al final del `README.md`.

## Estructura

```
├── public
│   ├── __forms.html          # Esqueleto estático para que Netlify detecte el formulario
│   ├── favicon.png
│   └── img/                  # Fotografías originales + logotipo + textura de papel
├── src
│   ├── components
│   │   ├── BarraNavegacion.tsx        # Cabecera fija con anclas internas y CTA
│   │   ├── FormularioInscripcion.tsx  # Formulario de inscripción (Netlify Forms vía fetch)
│   │   └── Reveal.tsx                 # Revelado al hacer scroll (IntersectionObserver)
│   ├── content
│   │   └── micrositio.ts     # TODO el texto visible, módulo por módulo
│   ├── lib
│   │   └── img.ts            # Constructor de URLs de la Netlify Image CDN (+ srcset)
│   ├── routes
│   │   ├── __root.tsx        # Documento HTML, metadatos, tipografías, textura
│   │   └── index.tsx         # Los diez módulos del micrositio
│   ├── router.tsx
│   └── styles.css            # Tokens de color/tipografía y utilidades propias
├── netlify.toml
└── README.md
```

## Decisiones no obvias

- **El contenido está separado del diseño.** `src/content/micrositio.ts` es la
  única fuente de texto: fue pensado para que el equipo del cineclub ajuste
  frases sin tocar JSX. No duplicar copias dentro de los componentes.
- **Las imágenes nunca se sirven en su tamaño original.** Los archivos de
  `public/img` pesan varios MB; siempre se piden a través de `img()` /
  `srcSet()` de `src/lib/img.ts`, que apunta a `/.netlify/images`. La textura de
  papel (`.grain` en `styles.css`) también pasa por ahí.
- **Netlify Forms necesita `public/__forms.html`.** Ese archivo oculto existe
  solo para que Netlify registre el formulario `inscripcion` durante el build; el
  formulario real es React y envía por `fetch` a `/__forms.html`, nunca a `/`
  (la raíz la intercepta la función de SSR). Si se agrega un campo al formulario
  React, hay que agregarlo también en ese HTML. La función ya está activada en el
  proyecto de Netlify.
- **Acento rojo en dos tonos.** `--color-brick` se usa sobre papel y
  `--color-brick-light` sobre los fondos de tinta, por contraste de lectura.
- **Anclas y `scroll-padding-top`.** La navegación es por anclas (`#portada`,
  `#que-hacemos`, …); el `scroll-padding-top` de `styles.css` compensa la
  cabecera fija. Si cambia la altura de la cabecera, hay que ajustarlo.

## Convenciones

- Componentes en PascalCase con nombres en español; utilidades en camelCase.
- Alias `@/` para `src/`.
- Tailwind con tokens definidos en `@theme` (`bg-paper`, `text-ink-soft`,
  `text-brick`, `font-display`); evitar colores sueltos fuera del sistema.
- Las animaciones respetan `prefers-reduced-motion` desde `styles.css`.
- Textos de interfaz, `alt` y mensajes de error, en español.

## Comandos

```bash
pnpm dev     # desarrollo
pnpm build   # build de producción
```
