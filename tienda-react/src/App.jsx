import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Buscador from './components/Buscador.jsx'
import Catalogo from './components/Catalogo.jsx'
import Carrito from './components/Carrito.jsx'
import PiePagina from './components/PiePagina.jsx'
import productos from './data/productos.js'

const CLAVE_CARRITO = 'carrito-levelup'

// Lee el carrito guardado en el navegador (si existe).
function cargarCarritoGuardado() {
  const guardado = localStorage.getItem(CLAVE_CARRITO)
  return guardado ? JSON.parse(guardado) : []
}

function App() {
  // ---------- ESTADO ----------
  // Pasamos una FUNCIÓN a useState: así localStorage se lee solo la primera vez.
  const [carrito, setCarrito] = useState(cargarCarritoGuardado)
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  // ---------- EFECTOS ----------
  // Se ejecuta después de cada render en que "carrito" haya cambiado.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  // ---------- DATOS DERIVADOS (se calculan, no se guardan) ----------
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const categorias = [...new Set(productos.map((p) => p.categoria))]
  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto.toLowerCase())
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
    return coincideTexto && coincideCategoria
  })

  // Actualiza el título de la pestaña del navegador (otro efecto).
  useEffect(() => {
    document.title = `(${cantidadTotal}) Level-Up Gamer`
  }, [cantidadTotal])

  // ---------- FUNCIONES QUE CAMBIAN EL ESTADO ----------
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.codigo === producto.codigo)
      if (existe) {
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
      <Encabezado cantidad={cantidadTotal} onVerCarrito={() => setMostrarCarrito(true)} />
      <Portada />

      <Container as="main" id="catalogo">
        <h2 className="mb-3">Productos</h2>
        <Buscador
          texto={texto}
          onCambiarTexto={setTexto}
          categoria={categoria}
          onCambiarCategoria={setCategoria}
          categorias={categorias}
        />
        <Catalogo productos={productosFiltrados} onAgregar={agregarAlCarrito} />
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