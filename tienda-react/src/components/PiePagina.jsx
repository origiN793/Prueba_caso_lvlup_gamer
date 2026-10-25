import { Container } from 'react-bootstrap'

function PiePagina() {
  const anio = 2026

  return (
    <footer id="contacto" className="bg-dark text-white-50 py-4 mt-5">
      <Container className="text-center">
        <p className="mb-1">
          Level-Up Gamer © {anio} · Todos los derechos reservados.
        </p>
        <small>WhatsApp: +56 9 9999 9999 · contacto@levelupgamer.cl</small>
      </Container>
    </footer>
  )
}

export default PiePagina