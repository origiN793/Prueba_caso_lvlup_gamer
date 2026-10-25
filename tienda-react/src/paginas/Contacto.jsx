import { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import {
  validarNombre,
  validarCorreo,
  validarComentario,
} from '../utils/validaciones.js'

const VALORES_VACIOS = { nombre: '', correo: '', comentario: '' }

function Contacto() {
  const [valores, setValores] = useState(VALORES_VACIOS)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  // Una sola función para los tres campos: usa el "name" de cada input
  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setEnviado(false)
  }

  function enviar(evento) {
    evento.preventDefault()

    const nuevosErrores = {
      nombre: validarNombre(valores.nombre),
      correo: validarCorreo(valores.correo),
      comentario: validarComentario(valores.comentario),
    }
    setErrores(nuevosErrores)

    const todoCorrecto = Object.values(nuevosErrores).every((mensaje) => mensaje === '')
    if (todoCorrecto) {
      setEnviado(true)
      setValores(VALORES_VACIOS)
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: 640 }}>
      <h1 className="mb-4">Contáctanos</h1>

      <Card body className="shadow-sm">
        {enviado && (
          <Alert variant="success">Tu mensaje fue enviado correctamente.</Alert>
        )}

        {/* noValidate: la validación la hacemos nosotros, no el navegador */}
        <Form onSubmit={enviar} noValidate>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              maxLength={100}
              value={valores.nombre}
              onChange={cambiar}
              isInvalid={!!errores.nombre}
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="correo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              maxLength={100}
              value={valores.correo}
              onChange={cambiar}
              isInvalid={!!errores.correo}
            />
            <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="comentario">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="comentario"
              maxLength={500}
              value={valores.comentario}
              onChange={cambiar}
              isInvalid={!!errores.comentario}
            />
            <Form.Control.Feedback type="invalid">{errores.comentario}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Enviar mensaje
          </Button>
        </Form>
      </Card>
    </Container>
  )
}

export default Contacto