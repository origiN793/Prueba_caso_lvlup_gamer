import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import {
  categorias,
  buscarProducto,
  obtenerProductos,
  guardarProducto,
} from '../../data/adminDatos.js'
import { validarTexto, validarNumeroMinimo, validarSeleccion } from '../../utils/validaciones.js'

const VALORES_VACIOS = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '0',
  categoria: '',
  imagen: '',
}

function FormularioProducto() {
  const { id } = useParams() // viene solo en /admin/productos/editar/:id
  const esEdicion = id !== undefined
  const navegar = useNavigate()

  // Si es edición, buscamos el producto. useParams entrega texto: buscarProducto usa Number(id).
  const existente = esEdicion ? buscarProducto(id) : null

  const [valores, setValores] = useState(() =>
    existente
      ? {
          codigo: existente.codigo,
          nombre: existente.nombre,
          descripcion: existente.descripcion ?? '',
          precio: String(existente.precio),
          stock: String(existente.stock),
          stockCritico: String(existente.stockCritico),
          categoria: existente.categoria,
          imagen: existente.imagen,
        }
      : VALORES_VACIOS,
  )
  const [errores, setErrores] = useState({})

  // Un id inventado (/admin/productos/editar/999) muestra un mensaje claro
  if (esEdicion && !existente) {
    return (
      <>
        <Alert variant="danger">No existe el producto {id}.</Alert>
        <Button as={Link} to="/admin/productos" variant="outline-secondary">
          Volver al listado
        </Button>
      </>
    )
  }

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()

    // El código no puede repetirse al crear un producto nuevo
    const codigoRepetido =
      !esEdicion &&
      obtenerProductos().some((p) => p.codigo.toLowerCase() === valores.codigo.trim().toLowerCase())

    const nuevosErrores = {
      codigo: codigoRepetido
        ? 'Ya existe un producto con ese código.'
        : validarTexto(valores.codigo, 'El código', 20),
      nombre: validarTexto(valores.nombre, 'El nombre', 100),
      precio: validarNumeroMinimo(valores.precio, 'El precio', 0),
      stock: validarNumeroMinimo(valores.stock, 'El stock', 0),
      categoria: validarSeleccion(valores.categoria, 'una categoría'),
    }
    setErrores(nuevosErrores)

    if (!Object.values(nuevosErrores).every((mensaje) => mensaje === '')) return

    guardarProducto({
      id: esEdicion ? Number(id) : null, // sin id = producto nuevo
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: Number(valores.stockCritico) || 0,
      categoria: valores.categoria,
      imagen: valores.imagen.trim() || '/images/example_image.jpg',
    })
    navegar('/admin/productos')
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>
        <Button as={Link} to="/admin/productos" variant="outline-secondary" size="sm">
          Volver al listado
        </Button>
      </div>

      <Card body className="shadow-sm" style={{ maxWidth: 700 }}>
        <Form onSubmit={enviar} noValidate>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="codigo">
                <Form.Label>Código producto</Form.Label>
                <Form.Control
                  name="codigo"
                  maxLength={20}
                  value={valores.codigo}
                  onChange={cambiar}
                  readOnly={esEdicion} /* el código no se cambia al editar */
                  isInvalid={!!errores.codigo}
                />
                <Form.Control.Feedback type="invalid">{errores.codigo}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  maxLength={100}
                  value={valores.nombre}
                  onChange={cambiar}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción (opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              maxLength={500}
              value={valores.descripcion}
              onChange={cambiar}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min={0}
                  value={valores.precio}
                  onChange={cambiar}
                  isInvalid={!!errores.precio}
                />
                <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  min={0}
                  value={valores.stock}
                  onChange={cambiar}
                  isInvalid={!!errores.stock}
                />
                <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="stockCritico">
                <Form.Label>Stock crítico (opcional)</Form.Label>
                <Form.Control
                  type="number"
                  name="stockCritico"
                  min={0}
                  value={valores.stockCritico}
                  onChange={cambiar}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={valores.categoria}
                  onChange={cambiar}
                  isInvalid={!!errores.categoria}
                >
                  <option value="">-- Seleccione --</option>
                  {categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Imagen (opcional)</Form.Label>
            <Form.Control
              name="imagen"
              placeholder="/images/example_image.jpg"
              value={valores.imagen}
              onChange={cambiar}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="success">
              Guardar producto
            </Button>
            <Button as={Link} to="/admin/productos" variant="outline-secondary">
              Cancelar
            </Button>
          </div>
        </Form>
      </Card>
    </>
  )
}

export default FormularioProducto