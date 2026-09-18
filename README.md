# Cineclub Abarca — micrositio

Micrositio de una página para **Cineclub Abarca**, un espacio íntimo de encuentro
en torno al cine en Ñuñoa. Los contenidos provienen del documento base del
proyecto y están organizados en **diez módulos** pensados para lectura rápida en
pantalla, con una acción principal visible: inscribirse a una función.

## Módulos publicados

1. Portada (H1, bajada y acción principal)
2. Qué hacemos
3. Por qué existe
4. La Casa Taller de Agustín Abarca (origen)
5. Quiénes somos
6. Para quién es
7. Qué puedes hacer en este sitio
8. Inscríbete a una función (formulario)
9. Dónde nos encontramos
10. Contacto

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Framework | TanStack Start (React 19, TanStack Router) |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 con tokens propios en `src/styles.css` |
| Tipografías | Fraunces (display) y Karla (texto), vía Google Fonts |
| Imágenes | Netlify Image CDN sobre los originales de `public/img` |
| Formulario | Netlify Forms (formulario `inscripcion`) |
| Despliegue | Netlify |

## Ejecutar en local

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Para ver el sitio con las funciones de Netlify emuladas (Image CDN incluida):

```bash
netlify dev --port 8889
```

Las entregas del formulario **solo funcionan en Netlify**, no en el servidor de
desarrollo: se revisan en la pestaña *Forms* del proyecto, en el formulario
llamado `inscripcion`.

## Editar los textos

Todo el texto visible vive en `src/content/micrositio.ts`, ordenado por módulo.
Cambiar una frase ahí la cambia en el sitio; los componentes no guardan copias.

## Pendientes de contenido

El micrositio está completo y publicado. Quedan datos que el equipo del cineclub
debe aportar para cerrar dos piezas:

- **Programación**: fechas, lugar y títulos de las próximas funciones o del ciclo
  en curso. Hoy el formulario recoge inscripciones sin asociarlas a una función
  concreta.
- **Material descargable**: el módulo 7 anuncia el material como "en preparación"
  hasta que exista el archivo (fanzine, programa o similar) para publicar.
