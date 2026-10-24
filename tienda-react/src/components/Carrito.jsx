import { Offcanvas, ListGroup, Button } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'

function Carrito({ mostrar, onCerrar, items, onQuitar, onVaciar }) {
  // Dato derivado: se calcula en cada render, NO se guarda en el estado.
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  return (
    <Offcanvas show={mostrar} onHide={onCerrar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛒 Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length === 0 ? (
          <p className="text-muted">Todavía no agregas productos.</p>
        ) : (
          <>
            <ListGroup className="mb-3">
              {items.map((item) => (
                <ListGroup.Item
                  key={item.codigo}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.nombre} × {item.cantidad}
                    <br />
                    <small className="text-muted">
                      {formatearPrecio(item.precio * item.cantidad)}
                    </small>
                  </span>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onQuitar(item.codigo)}
                  >
                    Quitar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p className="fs-5">
              Total: <strong>{formatearPrecio(total)}</strong>
            </p>
            <Button variant="outline-secondary" onClick={onVaciar}>
              Vaciar carrito
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Carrito