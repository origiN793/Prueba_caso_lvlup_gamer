import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'

function Encabezado({ cantidad, onVerCarrito, sesion, onCerrarSesion }) {
  // Controla si el menú hamburguesa está abierto
  const [abierta, setAbierta] = useState(false)
  const cerrar = () => setAbierta(false)
  const navegar = useNavigate()

  function salir() {
    cerrar()
    onCerrarSesion()
    navegar('/')
  }

  return (
    <>
      <div className="barra-anuncio text-center py-1">
        Envío gratis a todo Chile en compras sobre $50.000
      </div>

      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        sticky="top"
        expanded={abierta}
        onToggle={setAbierta}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" onClick={cerrar}>
            LEVEL-UP <span className="text-success">GAMER</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end onClick={cerrar}>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/productos" onClick={cerrar}>Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros" onClick={cerrar}>Nosotros</Nav.Link>
              <Nav.Link as={NavLink} to="/blog" onClick={cerrar}>Blog</Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" onClick={cerrar}>Contacto</Nav.Link>
            </Nav>

            <Nav>
              {sesion ? (
                <>
                  <Navbar.Text className="me-lg-2">Hola, {sesion.nombre}</Navbar.Text>
                  {sesion.tipo === 'Administrador' && (
                    <Nav.Link as={NavLink} to="/admin" onClick={cerrar}>Panel admin</Nav.Link>
                  )}
                  <Nav.Link onClick={salir}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" onClick={cerrar}>Iniciar sesión</Nav.Link>
                  <Nav.Link as={NavLink} to="/registro" onClick={cerrar}>Registrarse</Nav.Link>
                </>
              )}
            </Nav>

            <Button
              variant="outline-light"
              className="ms-lg-2"
              onClick={() => { cerrar(); onVerCarrito() }}
            >
              🛒 Carrito <Badge bg="success">{cantidad}</Badge>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Encabezado