import { Container, Row, Col, Card } from 'react-bootstrap'

function Nosotros() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">Quiénes somos</h1>
      <p>
        Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los
        entusiastas de los videojuegos en Chile. Lanzada hace dos años como respuesta a la
        creciente demanda durante la pandemia, Level-Up Gamer ofrece una amplia gama de
        productos para gamers, desde consolas y accesorios hasta computadores y sillas
        especializadas. Aunque no cuenta con una ubicación física, realiza despachos a
        todo el país.
      </p>

      <Card body className="shadow-sm mb-3">
        <h2 className="h4">Nuestra misión</h2>
        <p className="mb-0">
          Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una
          experiencia de compra única y personalizada, con un enfoque en la satisfacción del
          cliente y el crecimiento de la comunidad gamer.
        </p>
      </Card>

      <Card body className="shadow-sm mb-4">
        <h2 className="h4">Nuestra visión</h2>
        <p className="mb-0">
          Ser la tienda online líder en productos para gamers en Chile, reconocida por su
          innovación, servicio al cliente excepcional, y un programa de fidelización basado
          en gamificación que recompense a nuestros clientes más fieles.
        </p>
      </Card>

      <h2 className="mb-3">El equipo</h2>
      <Row xs={1} md={3} className="g-3">
        <Col>
          <Card body className="h-100 shadow-sm">
            <h3 className="h5">Desarrollo</h3>
            <p className="mb-0">Construye la experiencia web de la tienda.</p>
          </Card>
        </Col>
        <Col>
          <Card body className="h-100 shadow-sm">
            <h3 className="h5">Operaciones</h3>
            <p className="mb-0">Coordina el despacho a todas las regiones del país.</p>
          </Card>
        </Col>
        <Col>
          <Card body className="h-100 shadow-sm">
            <h3 className="h5">Comunidad</h3>
            <p className="mb-0">Gestiona el programa de fidelización y el blog.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Nosotros