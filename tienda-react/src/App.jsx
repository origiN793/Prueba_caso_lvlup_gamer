import { useState } from 'react'
import { Container } from 'react-bootstrap'

import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Catalogo from './components/Catalogo.jsx'
import Carrito from './components/Carrito.jsx'
import PiePagina from './components/PiePagina.jsx'
import productos from './data/productos.js'

function App() {
  // ---------- ESTADO ----------
  // El carrito vive en App porque lo necesitan DOS hijos:
  // Encabezado (muestra la cantidad) y Catalogo (agrega productos).
  // A esto se le llama "levantar el estado" al ancestro común.
  const [carrito, setCarrito] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  // ---------- DATO DERIVADO (se calcula, no se guarda) ----------
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  // ---------- FUNCIONES QUE CAMBIAN EL ESTADO ----------
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.codigo === producto.codigo)
      if (existe) {
        // Nunca modificamos el arreglo original: creamos uno nuevo con map
        return carritoActual.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }
      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  function quitarDelCarrito(codigo) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.codigo !== codigo),
    )
  }

  return (
    <>
      {/* Los datos bajan por props; los eventos suben mediante funciones */}
      <Encabezado cantidad={cantidadTotal} onVerCarrito={() => setMostrarCarrito(true)} />
      <Portada />

      <Container as="main" id="catalogo">
        <h2 className="mb-3">Productos</h2>
        <Catalogo productos={productos} onAgregar={agregarAlCarrito} />
      </Container>

      <Carrito
        mostrar={mostrarCarrito}
        onCerrar={() => setMostrarCarrito(false)}
        items={carrito}
        onQuitar={quitarDelCarrito}
        onVaciar={() => setCarrito([])}
      />

      <PiePagina />
    </>
  )
}

export default App