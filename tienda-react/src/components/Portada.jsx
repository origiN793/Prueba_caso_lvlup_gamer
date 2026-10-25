import { Container, Row, Col, Button } from 'react-bootstrap'

function Portada() {
  return (
    <header id="inicio" className="portada py-5 mb-4">
      <Container>
        <Row className="align-items-center g-4">
          <Col md={7}>
            <h1 className="display-5 fw-bold">
              Todo lo que necesitas para subir de nivel
            </h1>
            <p className="lead">
              Level-Up Gamer es una tienda online dedicada a satisfacer las
              necesidades de los entusiastas de los videojuegos en Chile.
              Ofrecemos consolas, accesorios, computadores y sillas gamer con
              despacho a todo el país.
            </p>
            <Button variant="success" href="#catalogo">
              Ver productos
            </Button>
          </Col>
          <Col md={5}>
            <img
              src="/images/setup.webp"
              alt="Setup gamer destacado"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Portada