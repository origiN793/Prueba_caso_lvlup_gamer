import { Card, Button, Badge } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato.js'

// Componente "tonto" (de presentación): solo muestra lo que recibe por props.
// Cuando se presiona el botón, avisa al padre con la función onAgregar.
function TarjetaProducto({ producto, onAgregar }) {
  const { nombre, descripcion, categoria, precio, stock, stockCritico, imagen } = producto
  const agotado = stock === 0
  const stockBajo = stock > 0 && stock <= stockCritico

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} alt={nombre} className="imagen-producto" />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {categoria}
        </Badge>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="text-muted small">{descripcion}</Card.Text>
        <Card.Text className="fs-5 fw-semibold">{formatearPrecio(precio)}</Card.Text>

        <Card.Text className={agotado ? 'text-danger' : stockBajo ? 'text-warning' : 'text-success'}>
          {agotado
            ? 'Sin stock'
            : stockBajo
              ? `¡Últimas ${stock} unidades!`
              : `Quedan ${stock} unidades`}
        </Card.Text>

        <Button
          className="mt-auto"
          variant="success"
          disabled={agotado}
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  )
}

export default TarjetaProducto