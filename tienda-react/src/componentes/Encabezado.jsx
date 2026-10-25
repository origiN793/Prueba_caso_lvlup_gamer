import { useState } from 'react'
import { NavLink } from 'react-router'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'

function Encabezado({ cantidad, onVerCarrito }) {

  const [abierta, setAbierta] = useState(false)
  const cerrar = () => setAbierta(false)

  return (
    <>
      <div className="barra-anuncio text-center py-1">
        Envío gratis a todo Chile en compras sobre $50.000
      </div>

      <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" expanded={abierta} onToggle={setAbierta}>
        <Container>
          <Navbar.Brand as={NavLink} to="/" onClick={cerrar}>
            LEVEL-UP <span className="text-success">GAMER</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end onClick={cerrar} >Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/productos" onClick={cerrar} >Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros" onClick={cerrar} >Nosotros</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/login" onClick={cerrar}>Iniciar sesión</Nav.Link>
              <Nav.Link as={NavLink} to="/registro" onClick={cerrar}>Registrarse</Nav.Link>
            </Nav>
            <Button variant="outline-light" className="ms-lg-2" onClick={() => { cerrar(); onVerCarrito}}>
              🛒 Carrito <Badge bg="success">{cantidad}</Badge>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Encabezado