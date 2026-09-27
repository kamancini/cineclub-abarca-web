/**
 * Contenidos editados del micrositio de Cineclub Abarca.
 *
 * Los textos institucionales se mantienen centralizados aquí. Las funciones y
 * publicaciones tienen sus propias fuentes de datos porque cambian con mayor frecuencia.
 */

export const sitio = {
  nombre: 'Cineclub Abarca',
  sigla: 'cca',

  /** Módulo 1 — Portada */
  titulo:
    'Un espacio íntimo de encuentro en torno al cine, diseñado para compartir opiniones, sensibilidades y vivencias personales.',
  frase: '',
  entrada: '',
  accionPrincipal: 'Inscribirme a una función',
  accionSecundaria: 'Seguir el proyecto',
} as const

/** Navegación principal */
export const navegacion = [
  { href: '/proyecto', etiqueta: 'El proyecto' },
  { href: '/funciones', etiqueta: 'Funciones' },
  { href: '/ensayos', etiqueta: 'Ensayos' },
  { href: '/materiales', etiqueta: 'Materiales' },
  { href: '/contacto', etiqueta: 'Contacto' },
] as const

/** Módulo 2 — Qué hacemos */
export const queHacemos = {
  numero: '02',
  titulo: 'Qué hacemos',
  bajada:
    'Desarrollamos mediación cinematográfica a través de ciclos temáticos con funciones guiadas.',
  bloques: [
    {
      titulo: 'Ciclos temáticos con funciones guiadas',
      texto:
        'Cada ciclo reúne películas en torno a un tema y cada función se ve acompañada.',
    },
    {
      titulo: 'Películas sugeridas por la comunidad',
      texto:
        'Nuestra programación incluye películas sugeridas por miembros de nuestra comunidad.',
    },
    {
      titulo: 'Adaptaciones de obras literarias',
      texto:
        'Proyectamos adaptaciones de obras literarias que leemos y comentamos colectivamente.',
    },
    {
      titulo: 'Diálogo en un entorno seguro',
      texto:
        'Un entorno cercano y seguro para el diálogo y el intercambio de puntos de vista.',
    },
  ],
} as const

/** Módulo 3 — Por qué existe */
export const proposito = {
  numero: '03',
  titulo: 'Por qué existe',
  parrafos: [
    'El propósito de nuestro proyecto es fortalecer el tejido comunitario en un espacio seguro, acogedor y gratuito.',
    'Buscamos reivindicar los encuentros presenciales en torno a intereses compartidos, destacando el valor de la conversación reflexiva y el cine como punto de partida para conectar con otros.',
  ],
  destacado: 'El cine como punto de partida para conectar con otros.',
} as const

/** Módulo 4 — Casa Taller de Agustín Abarca */
export const origen = {
  numero: '04',
  titulo: 'La Casa Taller de Agustín Abarca',
  parrafos: [
    'El Cineclub Abarca nace como un homenaje al legado de la Casa Taller del pintor Agustín Abarca. Este espacio, que durante décadas fue un epicentro de tertulias sobre arte, literatura y música, se abre hoy como un refugio donde la tradición del encuentro doméstico se reencuentra con el cine.',
    'Nuestra trayectoria es una continuidad de esa historia familiar y comunitaria. Tras años de cineclubes informales y experiencias compartidas, formalizamos esta iniciativa en 2025 para rescatar el espíritu hospitalario de antaño.',
    'Nos motiva la convicción de que el cine es una herramienta potente para la memoria territorial y el diálogo, transformando cada función en un espacio seguro para reflexionar sobre nuestras vidas, identidades y conexiones.',
  ],
  hitos: [
    {
      dato: '2025',
      glosa: 'Año en que formalizamos la iniciativa',
    },
    {
      dato: '1 año',
      glosa: 'De trabajo colaborativo del equipo',
    },
  ],
} as const

/** Módulo 5 — Quiénes somos */
export const equipo = {
  numero: '05',
  titulo: 'Quiénes somos',
  bajada: 'El equipo del Cineclub Abarca está integrado por:',
  personas: [
    {
      nombre: 'Rosa María Droguett Abarca',
      cargo: 'cofundadora',
    },
    {
      nombre: 'Cristóbal Ocampo',
      cargo: 'cofundador',
    },
    {
      nombre: 'Karla Mancini',
      cargo: 'community manager',
    },
    {
      nombre: 'Vicente Rodríguez',
      cargo: 'mediador Cineclub de Lectura',
    },
    {
      nombre: 'Macarena Farías',
      cargo: 'diseñadora',
    },
  ],
  parrafos: [
    'En el Cineclub Abarca, más que espectadores, buscamos construir una comunidad; un lugar donde las películas actúan como un hilo conductor para conocernos, conversar y habitar juntos, con calma y sentido, un espacio de «sentipensamientos».',
  ],
} as const

/** Módulo 6 — Público principal */
export const publico = {
  numero: '06',
  titulo: 'Para quién es',
  bajada:
    'Nuestro proyecto está dirigido a personas entre 18 y 65 años interesadas en profundizar su experiencia cinematográfica, buscando espacios de conversación honesta sobre los temas y emociones que el cine nos invita a explorar.',
  puntos: [
    'Personas entre 18 y 65 años.',
    'Quienes quieren profundizar su experiencia cinematográfica.',
    'Quienes buscan conversación honesta sobre los temas y emociones que el cine nos invita a explorar.',
  ],
} as const

/**
 * Contenido heredado del módulo 7 anterior.
 *
 * Se conserva para compatibilidad y posibles reutilizaciones,
 * aunque el Home ahora usa ese espacio para funciones.
 */
export const acciones = {
  numero: '07',
  titulo: 'Qué puedes hacer en este sitio',
  items: [
    {
      titulo: 'Conocer el proyecto',
      texto: 'Qué hacemos, por qué existe y quiénes lo sostienen.',
      enlace: {
        href: '/proyecto',
        texto: 'Ver el proyecto',
        interno: true,
      },
    },
    {
      titulo: 'Inscribirte en una función',
      texto:
        'Revisa la programación y elige una función con inscripciones abiertas.',
      enlace: {
        href: '/funciones',
        texto: 'Ver funciones',
        interno: true,
      },
    },
    {
      titulo: 'Contactarnos',
      texto: 'Escríbenos por correo o por Instagram.',
      enlace: {
        href: '/contacto',
        texto: 'Ver contacto',
        interno: true,
      },
    },
    {
      titulo: 'Descargar material',
      texto: 'Material del cineclub para descargar.',
      enlace: {
        href: '/materiales',
        texto: 'Ver materiales',
        interno: true,
      },
    },
  ],
} as const

/**
 * Formulario genérico anterior.
 *
 * Se conserva para que el componente existente no pierda compatibilidad;
 * las nuevas inscripciones viven en cada función.
 */
export const inscripcion = {
  numero: '08',
  titulo: 'Inscríbete a una función',
  bajada:
    'Las funciones son gratuitas y ocurren en un espacio íntimo. Revisa la programación para inscribirte en la actividad que te interese.',
  nota:
    'También puedes seguir el proyecto en Instagram para enterarte de cada ciclo.',
  campos: {
    nombre: 'Nombre y apellido',
    correo: 'Correo electrónico',
    mensaje: '¿Algo que quieras contarnos? (opcional)',
  },
  boton: 'Enviar inscripción',
  enviando: 'Enviando…',
  exito: {
    titulo: 'Recibimos tu inscripción',
    texto: 'Gracias por escribirnos. Te contactaremos por correo.',
  },
  error:
    'No pudimos enviar tu inscripción. Inténtalo de nuevo o escríbenos a cineclubabarca@gmail.com.',
} as const

/** Módulo 9 — Dónde nos encontramos */
export const visitar = {
  numero: '09',
  titulo: 'Dónde nos encontramos',
  bajada: 'Nuestros encuentros ocurren en Ñuñoa, en dos direcciones:',
  direcciones: [
    {
      calle: 'Hamburgo 36',
      comuna: 'Ñuñoa',
      mapa:
        'https://www.google.com/maps/search/?api=1&query=Hamburgo+36%2C+%C3%91u%C3%B1oa%2C+Santiago',
    },
    {
      calle: 'Tegualda 1871',
      comuna: 'Ñuñoa',
      mapa:
        'https://www.google.com/maps/search/?api=1&query=Tegualda+1871%2C+%C3%91u%C3%B1oa%2C+Santiago',
    },
  ],
} as const

/** Módulo 10 — Contacto */
export const contacto = {
  numero: '10',
  titulo: 'Contacto',
  bajada:
    '¿Tienes preguntas? Escríbenos y te responderemos a la brevedad.',
  correo: 'cineclubabarca@gmail.com',
  instagram: {
    usuario: '@cineclubabarca',
    url: 'https://instagram.com/cineclubabarca',
  },
} as const