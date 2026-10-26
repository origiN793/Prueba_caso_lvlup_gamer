import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Container, Row, Col, Badge, Button, Alert, InputGroup, Form } from 'react-bootstrap'
import Catalogo from '../componentes/Catalogo.jsx'
import { obtenerProductos } from '../data/adminDatos.js'
import { formatearPrecio } from '../utils/formato.js'

// Dibuja un producto. Se separa para poder reiniciar su estado con "key".
function Ficha({ producto, relacionados, onAgregar }) {
  const navegar = useNavigate()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  const agotado = producto.stock <= 0
  const stockBajo = !agotado && producto.stock <= producto.stockCritico

  // La cantidad siempre queda entre 1 y el stock disponible
  function cambiarCantidad(valor) {
    const numero = Number(valor)
    if (isNaN(numero)) return
    setCantidad(Math.min(Math.max(numero, 1), producto.stock))
  }

  function agregar() {
    // onAgregar devuelve true si se pudo agregar
    setAgregado(onAgregar(producto, cantidad))
  }

  return (
    <Container className="py-4">
      {/* navegar(-1) equivale al botón "atrás" del navegador */}
      <Button variant="outline-secondary" size="sm" className="mb-3" onClick={() => navegar(-1)}>
        ← Volver
      </Button>

      <Row className="g-4">
        <Col md={5}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="imagen-detalle rounded border"
          />
        </Col>

        <Col md={7}>
          <Badge bg="secondary" className="mb-2">
            {producto.categoria}
          </Badge>
          <h1 className="h2">{producto.nombre}</h1>
          <p className="fs-2 fw-bold text-success">{formatearPrecio(producto.precio)}</p>
          <p>{producto.descripcion}</p>

          <p className={agotado ? 'text-danger' : stockBajo ? 'text-warning' : 'text-success'}>
            {agotado
              ? 'Sin stock disponible'
              : stockBajo
                ? `Quedan solo ${producto.stock} unidades`
                : 'Stock disponible'}
          </p>

          {!agotado && (
            <InputGroup className="mb-3 selector-cantidad">
              <Button variant="outline-secondary" onClick={() => setCantidad((c) => Math.max(c - 1, 1))}>
                −
              </Button>
              <Form.Control
                type="number"
                min={1}
                max={producto.stock}
                value={cantidad}
                onChange={(evento) => cambiarCantidad(evento.target.value)}
                className="text-center"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setCantidad((c) => Math.min(c + 1, producto.stock))}
              >
                +
              </Button>
            </InputGroup>
          )}

          <Button variant="success" disabled={agotado} onClick={agregar}>
            {agotado ? 'Agotado' : 'Añadir al carrito'}
          </Button>

          {agregado && (
            <Alert variant="success" className="mt-3 py-2">
              Producto agregado al carrito.
            </Alert>
          )}
        </Col>
      </Row>

      {relacionados.length > 0 && (
        <section className="mt-5">
          <h2 className="h4 mb-3">Productos relacionados</h2>
          <Catalogo productos={relacionados} onAgregar={onAgregar} />
        </section>
      )}
    </Container>
  )
}

function DetalleProducto({ onAgregar }) {
  // El código viene de la URL: /producto/CO001 → "CO001" (ya es texto, no hace falta Number)
  const { codigo } = useParams()
  const [productos] = useState(obtenerProductos)
  const producto = productos.find((p) => p.codigo === codigo)

  // Al cambiar de producto (por ejemplo, desde un relacionado) volvemos arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [codigo])

  // Un código inventado (/producto/XYZ) muestra un mensaje claro
  if (!producto) {
    return (
      <Container className="py-4">
        <Alert variant="danger">No existe el producto {codigo}.</Alert>
        <Button as={Link} to="/productos" variant="outline-secondary">
          Ver todos los productos
        </Button>
      </Container>
    )
  }

  // Relacionados: misma categoría, distinto código
  const relacionados = productos.filter(
    (p) => p.categoria === producto.categoria && p.codigo !== producto.codigo,
  )

  return <Ficha key={producto.codigo} producto={producto} relacionados={relacionados} onAgregar={onAgregar} />
}

export default DetalleProducto