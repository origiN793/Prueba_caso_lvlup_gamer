import { Container } from 'react-bootstrap'

import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Catalogo from './components/Catalogo.jsx'
import PiePagina from './components/PiePagina.jsx'
import productos from './data/productos.js'

function App() {
  return (
    <>
      <Encabezado />
      <Portada />

      <Container as="main" id="catalogo">
        <h2 className="mb-3">Productos</h2>
        {/* Los datos bajan del padre (App) al hijo (Catalogo) por props */}
        <Catalogo productos={productos} />
      </Container>

      <PiePagina />
    </>
  )
}

export default App