import { Row, Col, Alert } from 'react-bootstrap'
import TarjetaProducto from './TarjetaProducto.jsx'

function Catalogo({ productos, onAgregar }) {
  if (productos.length === 0) {
    return <Alert variant="warning">No hay productos para mostrar.</Alert>
  }

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {productos.map((producto) => (
        <Col key={producto.codigo}>
          <TarjetaProducto producto={producto} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  )
}

export default Catalogo