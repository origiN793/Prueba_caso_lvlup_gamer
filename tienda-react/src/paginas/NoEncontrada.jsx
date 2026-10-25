import { Container, Button } from "react-bootstrap"
import { Link, useLocation } from 'react-router'

function NoEncontrada() {
    const ubicacion = useLocation()

    return (
        <Container>
            <h2>404 · Página no econtrada</h2>
            <p>
                No encontramos nada en <code>{ubicacion.pathname}</code>
            </p>
            <Button as={Link} to="/" variant="success">
                Volver al inicio
            </Button>
        </Container>
    )
}

export default NoEncontrada