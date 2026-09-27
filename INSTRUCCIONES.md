# Actualización lista para aplicar

Este paquete contiene solo archivos nuevos o reemplazos para el proyecto `Cine-club-Abarca-v2`.

## Aplicar

1. Haz una copia de seguridad o un commit antes de reemplazar archivos.
2. Copia las carpetas `src` y `public` de este paquete dentro de la raíz de tu repositorio.
3. Acepta reemplazar `src/routes/index.tsx`, `src/content/micrositio.ts` y `src/styles.css`.
4. Los demás archivos son nuevos.
5. No edites `src/routeTree.gen.ts`: TanStack Router lo regenerará al ejecutar Vite/build.

Después ejecuta:

```bash
npm run dev
```

Y, cuando el sitio se vea bien:

```bash
npm run build
```

## Publicar una nueva función

Solo necesitas editar `src/content/funciones.ts` y agregar un objeto al arreglo `funciones`:

```ts
{
  slug: 'nombre-corto-2026-10-10',
  titulo: 'Nombre de la función',
  ciclo: 'Nombre del ciclo',
  fecha: '2026-10-10',
  hora: '19:00',
  lugar: 'Hamburgo 36, Ñuñoa',
  descripcion: 'Descripción breve.',
  pelicula: 'Película asociada',
  imagen: '/img/funciones/afiche.jpg',
  imagenAlt: 'Afiche de la función…',
  invitados: ['Nombre invitado'],
  informacionAdicional: 'Información opcional.',
  formularioUrl: 'https://docs.google.com/forms/...',
  cuposMaximos: 25,
  cuposDisponibles: 25,
  estado: 'auto',
}
```

Con `estado: 'auto'` el sitio deriva:
- fecha pasada → Actividad realizada;
- 0 cupos → Cupos agotados;
- sin URL de formulario → Inscripciones cerradas;
- pocos cupos (20% o 3, lo que sea mayor) → Últimos cupos;
- resto → Inscripciones abiertas.

También puedes forzar manualmente `abiertas`, `ultimos_cupos`, `agotados`, `cerradas` o `realizada`.

## Google Forms / cupos automáticos

La URL pública de un Google Form no expone el número de respuestas. Por eso el sitio funciona sin integración externa usando `cuposDisponibles` en el archivo de datos.

Para automatizarlo después, el proyecto ya incluye `src/lib/cupos.ts`. Si defines en Netlify:

- `CUPOS_API_URL` → endpoint que devuelva disponibilidad agregada por `slug`;
- `CUPOS_API_TOKEN` → opcional, solo si tu backend lo necesita;

la lectura ocurre en una Server Function de TanStack Start y el token no se envía al navegador.

En `docs/google-apps-script.example.gs` hay una plantilla opcional que cuenta respuestas con Apps Script y puede cerrar el formulario al agotarse. Esa plantilla devuelve únicamente números agregados, nunca respuestas personales.

## Substack

La fuente configurada es:

`https://cineclubabarca.substack.com/feed`

No requiere credenciales. `src/lib/substack.ts` lee el RSS desde el servidor y mantiene una caché corta. Si Substack falla temporalmente, usa dos publicaciones verificadas que ya estaban sincronizadas en el sitio antiguo.

## Textura

La textura nueva vive en `src/styles.css` y sus controles principales están al inicio de `src/styles.css`:

```css
--background-color: var(--color-paper);
--background-texture-size: 260px;
--background-opacity: 0.12;
--background-opacity-dark: 0.07;
```

La antigua capa `.grain` queda desactivada para evitar que el grano cubra fotografías y afiches.
