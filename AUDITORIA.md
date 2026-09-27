# Auditoría e implementación — Cineclub Abarca

Fecha de preparación: 23 de septiembre de 2026.

## Criterio

El micrositio nuevo se conserva como base. No se vuelven a introducir textos institucionales que ya están presentes con el mismo significado. El sitio antiguo se usa principalmente para recuperar funciones, archivo, afiches/materiales y la integración editorial con Substack.

| Elemento | Sitio antiguo | Sitio nuevo antes del cambio | Estado | Acción aplicada |
| --- | --- | --- | --- | --- |
| Portada / presentación | Sí | Sí | Ya existe | Se conserva la del sitio nuevo |
| Qué hacemos / propósito / origen | Sí | Sí, más desarrollado | Ya existe | No se duplica |
| Equipo | Sí | Sí | Ya existe | Se conserva el contenido nuevo |
| Contacto / Instagram / ubicaciones | Sí | Sí | Ya existe | Se conserva |
| Funciones / programación | Sí, administrada como datos | No | Falta | Se crea sistema centralizado |
| Afiches por función | Sí | No como sistema de eventos | Falta | Campo de imagen por función |
| Archivo de actividades | Había historial de funciones | No | Falta | Archivo automático por fecha/estado |
| Inscripción | Existía asociada a programación | Formulario genérico | Parcial | Cada función puede tener su propio Google Form |
| Cupos y estados | No verificable como automatización | No | Falta | Estados y bloqueo de botón implementados |
| Ensayos / Substack | Sí | No | Falta | RSS oficial + página de ensayos + preview en Home |
| Materiales en Drive | Sí en el historial del repo | Placeholder | Requiere actualización | No se inventan URLs; quedan pendientes enlaces vigentes |
| FAQ | No se pudo verificar contenido fiable | No | Requiere actualización | No se inventa |
| Footer | Sí | Sí | Ya existe | Se conserva |
| Textura de papel | Sí | Sí, overlay global | Requiere mejora | SVG liviano detrás del contenido, nunca encima de fotos |
| SEO por rutas | Básico | Parcial | Parcial | Metadata en Home, Funciones, detalle y Ensayos |

## Datos antiguos incorporados de forma verificable

- Se conserva como archivo la “Función #1” del 30/08/2026, fecha documentada en una publicación ya sincronizada por el sitio antiguo.
- Se incorporan como respaldo local las dos publicaciones que estaban en `src/data/ensayos.json` del sitio antiguo. El RSS de Substack es la fuente principal.

## Datos no migrados por falta de información completa

El historial del repositorio antiguo confirma una función “Orlando” y un afiche “Cine Club de Lectura — septiembre”, pero no se publican en el sitio nuevo hasta contar con fecha, hora, lugar y/o inscripción fiables. Sus nombres quedan anotados en `src/content/funciones.ts` como pendientes editoriales y no se renderizan.

Los enlaces concretos de materiales de Google Drive tampoco se inventan: deben verificarse antes de reemplazar el placeholder histórico.
