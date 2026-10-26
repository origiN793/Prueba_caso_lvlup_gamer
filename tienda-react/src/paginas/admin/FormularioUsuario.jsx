import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import {
  tiposUsuario,
  buscarUsuario,
  obtenerUsuarios,
  guardarUsuario,
} from '../../data/adminDatos.js'
import regiones from '../../data/regiones.js'
import {
  validarTexto,
  validarRUN,
  validarCorreo,
  validarSeleccion,
} from '../../utils/validaciones.js'

const VALORES_VACIOS = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  tipo: '',
  region: '',
  comuna: '',
  direccion: '',
}

function FormularioUsuario() {
  const { id } = useParams() // viene solo en /admin/usuarios/editar/:id
  const esEdicion = id !== undefined
  const navegar = useNavigate()

  const existente = esEdicion ? buscarUsuario(id) : null

  const [valores, setValores] = useState(() =>
    existente
      ? {
          run: existente.run,
          nombre: existente.nombre,
          apellidos: existente.apellidos,
          correo: existente.correo,
          tipo: existente.tipo,
          region: existente.region,
          comuna: existente.comuna,
          direccion: existente.direccion,
        }
      : VALORES_VACIOS,
  )
  const [errores, setErrores] = useState({})

  // Dato derivado: las comunas de la región elegida
  const comunas = regiones.find((r) => r.nombre === valores.region)?.comunas ?? []

  if (esEdicion && !existente) {
    return (
      <>
        <Alert variant="danger">No existe el usuario {id}.</Alert>
        <Button as={Link} to="/admin/usuarios" variant="outline-secondary">
          Volver al listado
        </Button>
      </>
    )
  }

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  // Al cambiar de región se borra la comuna anterior
  function cambiarRegion(evento) {
    setValores((actuales) => ({ ...actuales, region: evento.target.value, comuna: '' }))
  }

  function enviar(evento) {
    evento.preventDefault()

    // El RUN no puede repetirse al crear un usuario nuevo
    const runRepetido =
      !esEdicion &&
      obtenerUsuarios().some((u) => u.run === valores.run.trim().toUpperCase())

    const nuevosErrores = {
      run: runRepetido ? 'Ya existe un usuario con ese RUN.' : validarRUN(valores.run),
      nombre: validarTexto(valores.nombre, 'El nombre', 50),
      apellidos: validarTexto(valores.apellidos, 'El apellido', 100),
      correo: validarCorreo(valores.correo),
      tipo: validarSeleccion(valores.tipo, 'un tipo de usuario'),
      region: validarSeleccion(valores.region, 'una región'),
      comuna: validarSeleccion(valores.comuna, 'una comuna'),
      direccion: validarTexto(valores.direccion, 'La dirección', 300, 'obligatoria'),
    }
    setErrores(nuevosErrores)

    if (!Object.values(nuevosErrores).every((mensaje) => mensaje === '')) return

    guardarUsuario({
      id: esEdicion ? Number(id) : null, // sin id = usuario nuevo
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim(),
      tipo: valores.tipo,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    })
    navegar('/admin/usuarios')
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1>
        <Button as={Link} to="/admin/usuarios" variant="outline-secondary" size="sm">
          Volver al listado
        </Button>
      </div>

      <Card body className="shadow-sm" style={{ maxWidth: 720 }}>
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
                  readOnly={esEdicion} /* el RUN no se cambia al editar */
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
              <Form.Group className="mb-3" controlId="tipo">
                <Form.Label>Tipo de usuario</Form.Label>
                <Form.Select
                  name="tipo"
                  value={valores.tipo}
                  onChange={cambiar}
                  isInvalid={!!errores.tipo}
                >
                  <option value="">-- Seleccione --</option>
                  {tiposUsuario.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errores.tipo}</Form.Control.Feedback>
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

          <Row>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button type="submit" variant="success">
              Guardar usuario
            </Button>
            <Button as={Link} to="/admin/usuarios" variant="outline-secondary">
              Cancelar
            </Button>
          </div>
        </Form>
      </Card>
    </>
  )
}

export default FormularioUsuario