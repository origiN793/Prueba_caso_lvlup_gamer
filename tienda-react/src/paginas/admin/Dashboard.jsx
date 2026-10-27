import { Link } from 'react-router'
import { Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { obtenerProductos, obtenerUsuarios } from '../../data/adminDatos.js'

function Dashboard() {
  const productos = obtenerProductos()
  const usuarios = obtenerUsuarios()

  // Dato derivado: un producto está en nivel crítico si su stock es menor o igual al umbral
  const criticos = productos.filter((p) => p.stock <= p.stockCritico)

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Hola, Administrador</h1>
        <Button as={Link} to="/" variant="outline-secondary" size="sm">
          Ver tienda
        </Button>
      </div>

      {/* ---------- Alerta de stock crítico ---------- */}
      {criticos.length > 0 && (
        <Alert variant="warning">
          <Alert.Heading className="h6">
            ⚠️ {criticos.length} {criticos.length === 1 ? 'producto' : 'productos'} con stock crítico
          </Alert.Heading>
          <ul className="mb-0">
            {criticos.map((p) => (
              <li key={p.id}>
                <Link to={`/admin/productos/editar/${p.id}`}>{p.nombre}</Link>
                {' · '}
                {p.stock === 0 ? 'sin stock' : `quedan ${p.stock}`} (crítico: {p.stockCritico})
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {/* ---------- Estadísticas ---------- */}
      <Row xs={1} md={3} className="g-3 mb-4">
        <Col>
          <Card body className="shadow-sm">
            <div className="text-muted small">Productos activos</div>
            <div className="fs-2 fw-bold">{productos.length}</div>
          </Card>
        </Col>
        <Col>
          <Card body className="shadow-sm">
            <div className="text-muted small">Stock crítico</div>
            <div className={`fs-2 fw-bold ${criticos.length > 0 ? 'text-danger' : ''}`}>
              {criticos.length}
            </div>
          </Card>
        </Col>
        <Col>
          <Card body className="shadow-sm">
            <div className="text-muted small">Usuarios registrados</div>
            <div className="fs-2 fw-bold">{usuarios.length}</div>
          </Card>
        </Col>
      </Row>

      <Card body className="shadow-sm">
        <h2 className="h5">Bienvenida</h2>
        <p>
          Desde aquí puedes gestionar el catálogo de productos y las cuentas de usuario.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Button as={Link} to="/admin/productos/nuevo" variant="success">
            + Nuevo producto
          </Button>
          <Button as={Link} to="/admin/usuarios/nuevo" variant="outline-success">
            + Nuevo usuario
          </Button>
        </div>
      </Card>
    </>
  )
}

export default Dashboard