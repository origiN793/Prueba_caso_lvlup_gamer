import { useState } from 'react'
import { Container, Row, Col, Card, } from 'react-bootstrap'
import Portada from '../componentes/Portada.jsx'
import Catalogo from '../componentes/Catalogo.jsx'
import { obtenerProductos } from '../data/adminDatos.js'

// Recibe onAgregar desde App para que las tarjetas puedan agregar al carrito.
function Inicio({ onAgregar }) {
  // Lee los datos guardados por el admin
  const [productos] = useState(obtenerProductos)
  // Los destacados son los primeros 6 productos del arreglo
  const destacados = productos.slice(0, 6)

  return (
    <>
      <Portada />

      <Container>
        {/* ---------- Productos destacados ---------- */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Productos destacados</h2>
          </div>
          <Catalogo productos={destacados} onAgregar={onAgregar} />
        </section>

        {/* ---------- Por qué elegirnos ---------- */}
        <section className="mb-5">
          <h2 className="mb-3">Por qué elegirnos</h2>
          <Row xs={1} md={3} className="g-3">
            <Col>
              <Card body className="h-100 shadow-sm">
                <h3 className="h5">Despacho a todo Chile</h3>
                <p className="mb-0">No tenemos tienda física, pero llegamos a cualquier región del país.</p>
              </Card>
            </Col>
            <Col>
              <Card body className="h-100 shadow-sm">
                <h3 className="h5">Comunidad gamer</h3>
                <p className="mb-0">Programa de fidelización para nuestros clientes más fieles.</p>
              </Card>
            </Col>
            <Col>
              <Card body className="h-100 shadow-sm">
                <h3 className="h5">Soporte real</h3>
                <p className="mb-0">Equipo que responde tus dudas antes y después de la compra.</p>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Inicio