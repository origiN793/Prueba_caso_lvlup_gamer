import { Container, Alert, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router'
import articulos from '../data/articulos.js'

function DetalleBlog() {
  // useParams devuelve SIEMPRE texto: "1", no 1.
  const { id } = useParams()
  // Por eso se convierte con Number() antes de comparar.
  const articulo = articulos.find((a) => a.id === Number(id))

  // Si el id no existe (por ejemplo /blog/99), mostramos un mensaje claro
  if (!articulo) {
    return (
      <Container className="py-4">
        <Alert variant="danger">No existe el artículo {id}.</Alert>
        <Button as={Link} to="/blog" variant="outline-secondary">
          Volver al blog
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-3">{articulo.titulo}</h1>
      <img
        src={articulo.imagen}
        alt={articulo.alt}
        className="img-fluid rounded d-block mx-auto my-3 imagen-articulo"
      />
      {articulo.parrafos.map((texto, indice) => (
        <p key={indice}>{texto}</p>
      ))}
      <Button as={Link} to="/blog" variant="outline-success">
        Volver al blog
      </Button>
    </Container>
  )
}

export default DetalleBlog