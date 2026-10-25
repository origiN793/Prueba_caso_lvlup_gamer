import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import articulos from '../data/articulos.js'

function Blog() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Noticias importantes</h1>

      {articulos.map((articulo) => (
        // key va en el elemento más externo que devuelve el map
        <Card key={articulo.id} className="mb-3 shadow-sm">
          <Row className="g-0 align-items-center">
            <Col md={4}>
              <Card.Img
                src={articulo.imagenLista}
                alt={articulo.alt}
                className="imagen-blog"
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{articulo.tituloCorto}</Card.Title>
                <Card.Text>{articulo.resumen}</Card.Text>
                {/* Enlace dinámico: arma la URL con el id del artículo */}
                <Button as={Link} to={`/blog/${articulo.id}`} variant="outline-success">
                  Ver caso
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  )
}

export default Blog