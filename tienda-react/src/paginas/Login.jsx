import { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { validarCorreo, validarPassword } from '../utils/validaciones.js'

function Login() {
  const [valores, setValores] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)
  // useNavigate permite cambiar de ruta desde el código
  const navegar = useNavigate()

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()

    const nuevosErrores = {
      correo: validarCorreo(valores.correo),
      clave: validarPassword(valores.clave),
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).every((mensaje) => mensaje === '')) {
      setExito(true)
      // Se llama dentro de un evento (nunca durante el renderizado)
      setTimeout(() => navegar('/'), 1000)
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <Card body className="shadow-sm">
        <h1 className="h3 mb-3">Iniciar sesión</h1>

        {exito && (
          <Alert variant="success">Sesión iniciada correctamente (simulación).</Alert>
        )}

        <Form onSubmit={enviar} noValidate>
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

          <Form.Group className="mb-3" controlId="clave">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="clave"
              value={valores.clave}
              onChange={cambiar}
              isInvalid={!!errores.clave}
            />
            <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Iniciar sesión
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </Card>
    </Container>
  )
}

export default Login