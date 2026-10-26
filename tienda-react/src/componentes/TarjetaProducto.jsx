import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router'
import { formatearPrecio } from '../utils/formato.js'

function TarjetaProducto({ producto, onAgregar }) {
  const { codigo, nombre, descripcion, categoria, precio, stock, stockCritico, imagen } = producto
  const agotado = stock === 0
  const stockBajo = stock > 0 && stock <= stockCritico

  return (
    <Card className="h-100 shadow-sm">
      {/* Enlace dinámico: arma la URL con el código del producto */}
      <Link to={`/producto/${codigo}`}>
        <Card.Img variant="top" src={imagen} alt={nombre} className="imagen-producto" />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {categoria}
        </Badge>
        <Card.Title>
          <Link to={`/producto/${codigo}`} className="text-decoration-none text-reset">
            {nombre}
          </Link>
        </Card.Title>
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