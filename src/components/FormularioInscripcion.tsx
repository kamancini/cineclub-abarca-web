import { useState } from 'react'
import { contacto, inscripcion } from '@/content/micrositio'

type Estado = 'inicio' | 'enviando' | 'listo' | 'error'

const FORM_NAME = 'inscripcion'

function codificar(datos: Record<string, string>) {
  return Object.entries(datos)
    .map(([clave, valor]) => `${encodeURIComponent(clave)}=${encodeURIComponent(valor)}`)
    .join('&')
}

export function FormularioInscripcion() {
  const [campos, setCampos] = useState({ nombre: '', correo: '', mensaje: '' })
  const [estado, setEstado] = useState<Estado>('inicio')

  const actualizar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setCampos({ ...campos, [e.target.name]: e.target.value })

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const respuesta = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: codificar({ 'form-name': FORM_NAME, ...campos }),
      })
      setEstado(respuesta.ok ? 'listo' : 'error')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'listo') {
    return (
      <div className="border border-paper/25 bg-paper/5 p-8">
        <h3 className="font-display text-3xl text-paper">{inscripcion.exito.titulo}</h3>
        <p className="mt-3 max-w-md text-paper/75">{inscripcion.exito.texto}</p>
        <a
          href={contacto.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="link kicker mt-6 inline-block text-paper/70"
        >
          Seguir en Instagram
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="grid gap-6">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          No completar este campo
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <label className="grid gap-1">
        <span className="kicker text-paper/55">{inscripcion.campos.nombre}</span>
        <input
          className="field"
          type="text"
          name="nombre"
          value={campos.nombre}
          onChange={actualizar}
          autoComplete="name"
          required
        />
      </label>

      <label className="grid gap-1">
        <span className="kicker text-paper/55">{inscripcion.campos.correo}</span>
        <input
          className="field"
          type="email"
          name="correo"
          value={campos.correo}
          onChange={actualizar}
          autoComplete="email"
          required
        />
      </label>

      <label className="grid gap-1">
        <span className="kicker text-paper/55">{inscripcion.campos.mensaje}</span>
        <textarea
          className="field resize-y"
          name="mensaje"
          rows={3}
          value={campos.mensaje}
          onChange={actualizar}
        />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="rounded-full bg-paper px-7 py-3 font-bold tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {estado === 'enviando' ? inscripcion.enviando : inscripcion.boton}
        </button>
        <a
          href={contacto.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="link kicker text-paper/70"
        >
          {contacto.instagram.usuario}
        </a>
      </div>

      {estado === 'error' && (
        <p role="alert" className="text-sm text-[#efb0a8]">
          {inscripcion.error}
        </p>
      )}
    </form>
  )
}
