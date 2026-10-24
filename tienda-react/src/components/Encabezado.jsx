import { Navbar, Nav, Container, Button } from 'react-bootstrap'

// Barra de navegación con componentes de React Bootstrap.
// Cada <Navbar.Brand>, <Nav.Link>, etc. genera el HTML y las clases de Bootstrap.
function Encabezado() {
  return (
    <>
      <div className="barra-anuncio text-center py-1">
        Envío gratis a todo Chile en compras sobre $50.000
      </div>

      <Navbar bg="dark" data-bs-theme="dark" expand="md" sticky="top">
        <Container>
          <Navbar.Brand href="#inicio">
            LEVEL-UP <span className="text-success">GAMER</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            {/* En Bootstrap 5 es "me-auto", ya no "mr-auto" */}
            <Nav className="me-auto">
              <Nav.Link href="#inicio">Inicio</Nav.Link>
              <Nav.Link href="#catalogo">Productos</Nav.Link>
              <Nav.Link href="#nosotros">Nosotros</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#login">Iniciar sesión</Nav.Link>
              <Nav.Link href="#registro">Registrarse</Nav.Link>
            </Nav>
            <Button variant="outline-light" className="ms-md-2">
              🛒 Carrito
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Encabezado