/**
 * EJEMPLO OPCIONAL — disponibilidad de cupos para Cineclub Abarca
 *
 * Este script NO expone respuestas ni datos personales: solo devuelve cupos
 * disponibles y estado. Debe vivir en una cuenta Google que tenga acceso a los
 * formularios. Reemplaza los valores de ejemplo antes de desplegarlo.
 *
 * En Apps Script: Implementar > Nueva implementación > Aplicación web.
 * Ejecutar como: tú. Acceso: quien tenga el enlace, si aceptas que los números
 * agregados de cupos sean públicos. Si prefieres autenticación, usa Google Forms
 * API desde un backend propio en vez de publicar este endpoint.
 */

const ACTIVIDADES = {
  // 'slug-de-la-funcion': { formId: 'ID_DEL_FORMULARIO', max: 25 },
}

function estadoDesdeCupos(disponibles, max) {
  if (disponibles <= 0) return 'agotados'
  const umbral = Math.max(3, Math.ceil(max * 0.2))
  return disponibles <= umbral ? 'ultimos_cupos' : 'abiertas'
}

function disponibilidadDe(slug, config) {
  const form = FormApp.openById(config.formId)
  const inscritos = form.getResponses().length
  const disponibles = Math.max(config.max - inscritos, 0)

  // Cierra también el Google Form cuando se alcanza el máximo.
  if (disponibles === 0 && form.isAcceptingResponses()) {
    form.setAcceptingResponses(false)
    form.setCustomClosedFormMessage('Cupos agotados para esta actividad.')
  }

  return {
    slug,
    cuposDisponibles: disponibles,
    estado: estadoDesdeCupos(disponibles, config.max),
  }
}

function doGet() {
  const funciones = Object.entries(ACTIVIDADES).map(([slug, config]) =>
    disponibilidadDe(slug, config),
  )

  return ContentService.createTextOutput(JSON.stringify({ funciones }))
    .setMimeType(ContentService.MimeType.JSON)
}
