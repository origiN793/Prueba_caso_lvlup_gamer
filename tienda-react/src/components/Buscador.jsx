import { Form, Row, Col } from 'react-bootstrap'

// Formulario CONTROLADO: el valor de cada campo vive en el estado de App.
// El input muestra lo que dice el estado (value) y avisa cada cambio (onChange).
function Buscador({ texto, onCambiarTexto, categoria, onCambiarCategoria, categorias }) {
  return (
    <Form className="mb-4" onSubmit={(evento) => evento.preventDefault()}>
      <Row className="g-2">
        <Col md={8}>
          <Form.Control
            type="search"
            placeholder="Buscar producto por nombre…"
            value={texto}
            onChange={(evento) => onCambiarTexto(evento.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={categoria}
            onChange={(evento) => onCambiarCategoria(evento.target.value)}
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}

export default Buscador