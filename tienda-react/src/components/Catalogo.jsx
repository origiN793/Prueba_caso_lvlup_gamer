import { Row, Col, Alert } from 'react-bootstrap'
import TarjetaProducto from './TarjetaProducto.jsx'

// Recibe la lista de productos y dibuja una tarjeta por cada uno con .map().
function Catalogo({ productos }) {
  if (productos.length === 0) {
    return <Alert variant="warning">No hay productos para mostrar.</Alert>
  }

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {productos.map((producto) => (
        // key: identificador único y estable, para que React sepa qué tarjeta es cuál
        <Col key={producto.codigo}>
          <TarjetaProducto producto={producto} />
        </Col>
      ))}
    </Row>
  )
}

export default Catalogo