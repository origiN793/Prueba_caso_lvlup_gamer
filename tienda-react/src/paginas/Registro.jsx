import { useState } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import regiones from '../data/regiones.js'
import {
  validarTexto,
  validarRUN,
  validarCorreo,
  validarPassword,
  validarConfirmacion,
  validarSeleccion,
} from '../utils/validaciones.js'

const VALORES_VACIOS = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  confirmar: '',
  telefono: '',
  region: '',
  comuna: '',
  direccion: '',
  terminos: false,
}

function Registro() {
  const [valores, setValores] = useState(VALORES_VACIOS)
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)
  const navegar = useNavigate()

  // Dato derivado: las comunas de la región elegida (o ninguna)
  const comunas = regiones.find((r) => r.nombre === valores.region)?.comunas ?? []

  // Sirve para texto, selects y checkbox
  function cambiar(evento) {
    const { name, value, type, checked } = evento.target
    setValores((actuales) => ({
      ...actuales,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Al cambiar de región se borra la comuna anterior
  function cambiarRegion(evento) {
    setValores((actuales) => ({
      ...actuales,
      region: evento.target.value,
      comuna: '',
    }))
  }

  function enviar(evento) {
    evento.preventDefault()

    const nuevosErrores = {
      run: validarRUN(valores.run),
      nombre: validarTexto(valores.nombre, 'El nombre', 50),
      apellidos: validarTexto(valores.apellidos, 'El apellido', 100),
      correo: validarCorreo(valores.correo),
      clave: validarPassword(valores.clave),
      confirmar: validarConfirmacion(valores.clave, valores.confirmar),
      region: validarSeleccion(valores.region, 'una región'),
      comuna: validarSeleccion(valores.comuna, 'una comuna'),
      direccion: validarTexto(valores.direccion, 'La dirección', 300, 'obligatoria'),
      terminos: valores.terminos
        ? ''
        : 'Debes aceptar los términos y condiciones para continuar.',
    }
    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).every((mensaje) => mensaje === '')) {
      setExito(true)
      setTimeout(() => navegar('/login'), 1200)
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: 760 }}>
      <Card body className="shadow-sm">
        <h1 className="h3 mb-3">Registro Level-Up Gamer</h1>

        {exito && (
          <Alert variant="success">Cuenta creada correctamente (simulación).</Alert>
        )}

        <Form onSubmit={enviar} noValidate>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="run">
                <Form.Label>RUN</Form.Label>
                <Form.Control
                  name="run"
                  maxLength={9}
                  placeholder="19011022K"
                  value={valores.run}
                  onChange={cambiar}
                  isInvalid={!!errores.run}
                />
                <Form.Control.Feedback type="invalid">{errores.run}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  maxLength={50}
                  value={valores.nombre}
                  onChange={cambiar}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="apellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  name="apellidos"
                  maxLength={100}
                  value={valores.apellidos}
                  onChange={cambiar}
                  isInvalid={!!errores.apellidos}
                />
                <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="confirmar">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmar"
                  value={valores.confirmar}
                  onChange={cambiar}
                  isInvalid={!!errores.confirmar}
                />
                <Form.Control.Feedback type="invalid">{errores.confirmar}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="telefono">
                <Form.Label>Teléfono (opcional)</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="+56 9 1234 5678"
                  value={valores.telefono}
                  onChange={cambiar}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="region">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  name="region"
                  value={valores.region}
                  onChange={cambiarRegion}
                  isInvalid={!!errores.region}
                >
                  <option value="">-- Seleccione la región --</option>
                  {regiones.map((r) => (
                    <option key={r.nombre} value={r.nombre}>
                      {r.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errores.region}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="comuna">
            <Form.Label>Comuna</Form.Label>
            <Form.Select
              name="comuna"
              value={valores.comuna}
              onChange={cambiar}
              disabled={valores.region === ''}
              isInvalid={!!errores.comuna}
            >
              <option value="">-- Seleccione la comuna --</option>
              {comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.comuna}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              maxLength={300}
              value={valores.direccion}
              onChange={cambiar}
              isInvalid={!!errores.direccion}
            />
            <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="terminos"
            name="terminos"
            label="Estoy de acuerdo con los Términos y condiciones"
            checked={valores.terminos}
            onChange={cambiar}
            isInvalid={!!errores.terminos}
            feedback={errores.terminos}
            feedbackType="invalid"
          />

          <Button type="submit" variant="success" className="w-100">
            Registrar
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </Card>
    </Container>
  )
}

export default Registro