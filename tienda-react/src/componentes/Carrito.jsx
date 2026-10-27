import { Offcanvas, ListGroup, Button, InputGroup, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router'
import { obtenerProductos } from '../data/adminDatos.js'
import { formatearPrecio } from '../utils/formato.js'

function Carrito({ mostrar, onCerrar, carrito, onCambiarCantidad, onQuitar, onVaciar }) {
  // Sin useState a propósito: este panel siempre está montado, y así
  // siempre ve los precios y el stock más recientes guardados por el admin.
  const productos = obtenerProductos()

  // Dato derivado: une cada línea del carrito con los datos ACTUALES del producto
  const lineas = carrito
    .map((item) => ({
      producto: productos.find((p) => p.codigo === item.codigo),
      cantidad: item.cantidad,
    }))
    .filter((linea) => linea.producto) // si el producto ya no existe, se omite

  const subtotal = lineas.reduce(
    (suma, linea) => suma + linea.producto.precio * linea.cantidad,
    0,
  )
  // Si el admin bajó el stock y ahora hay más unidades en el carrito que disponibles
  const hayProblemas = lineas.some((linea) => linea.cantidad > linea.producto.stock)

  return (
    <Offcanvas show={mostrar} onHide={onCerrar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛒 Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {lineas.length === 0 ? (
          <p className="text-muted">Todavía no agregas productos.</p>
        ) : (
          <>
            <ListGroup className="mb-3">
              {lineas.map(({ producto, cantidad }) => (
                <ListGroup.Item key={producto.codigo}>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <img src={producto.imagen} alt={producto.nombre} className="imagen-carrito" />
                    <div className="flex-grow-1">
                      <Link
                        to={`/producto/${producto.codigo}`}
                        onClick={onCerrar}
                        className="text-decoration-none text-reset fw-semibold"
                      >
                        {producto.nombre}
                      </Link>
                      <div className="text-muted small">{formatearPrecio(producto.precio)} c/u</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onQuitar(producto.codigo)}
                    >
                      Quitar
                    </Button>
                  </div>

                  {cantidad > producto.stock && (
                    <div className="text-danger small mb-2">
                      Solo quedan {producto.stock} unidades disponibles.
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    <InputGroup size="sm" className="selector-cantidad">
                      <Button
                        variant="outline-secondary"
                        onClick={() => onCambiarCantidad(producto.codigo, cantidad - 1)}
                      >
                        −
                      </Button>
                      <Form.Control value={cantidad} readOnly className="text-center" />
                      <Button
                        variant="outline-secondary"
                        disabled={cantidad >= producto.stock}
                        onClick={() => onCambiarCantidad(producto.codigo, cantidad + 1)}
                      >
                        +
                      </Button>
                    </InputGroup>
                    <strong>{formatearPrecio(producto.precio * cantidad)}</strong>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex justify-content-between mb-1">
              <span>Subtotal</span>
              <span>{formatearPrecio(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>Se calcula al pagar</span>
            </div>

            {hayProblemas && (
              <Alert variant="warning" className="py-2 small">
                Ajusta las cantidades que superan el stock para poder pagar.
              </Alert>
            )}

            <div className="d-grid gap-2">
              <Button
                variant="success"
                disabled={hayProblemas}
                onClick={() => alert('Esta función de pago se implementará en la próxima entrega.')}
              >
                Pagar
              </Button>
              <Button variant="outline-secondary" onClick={onVaciar}>
                Vaciar carrito
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Carrito