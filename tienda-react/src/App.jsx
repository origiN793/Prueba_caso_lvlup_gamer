import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'


import Layout from './componentes/Layout.jsx'
import AdminLayout from './componentes/admin/AdminLayout.jsx'
import Dashboard from './paginas/admin/Dashboard.jsx'
import Carrito from './componentes/Carrito.jsx'
import Inicio from './paginas/Inicio.jsx'
import Productos from './paginas/Productos.jsx'
import Nosotros from './paginas/Nosotros.jsx'
import Blog from './paginas/Blog.jsx'
import DetalleBlog from './paginas/DetalleBlog.jsx'
import Contacto from './paginas/Contacto.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

const CLAVE_CARRITO = 'carrito-levelup'

// Lee el carrito guardado. Si está corrupto, parte vacío en vez de caerse.
function cargarCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

function App() {
  const [carrito, setCarrito] = useState(cargarCarritoGuardado)
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  useEffect(() => {
    document.title = `(${cantidadTotal}) Level-Up Gamer`
  }, [cantidadTotal])

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
      <Routes>
        {/* Ruta padre: dibuja el marco. Las hijas entran en el <Outlet /> */}
        <Route
          path="/"
          element={
            <Layout cantidad={cantidadTotal} onVerCarrito={() => setMostrarCarrito(true)} />
          }
        >
          <Route index element={<Inicio onAgregar={agregarAlCarrito} />} />
          <Route path="productos" element={<Productos onAgregar={agregarAlCarrito} />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<DetalleBlog />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />}></Route>   
          <Route path="registro" element={<Registro />}></Route>
          {/* Comodín: atrapa cualquier dirección que no coincida con las anteriores */}
          <Route path="*" element={<NoEncontrada />} />
        </Route>
        {/* ---------- Panel de administración: tiene su propio layout ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>

      <Carrito
        mostrar={mostrarCarrito}
        onCerrar={() => setMostrarCarrito(false)}
        items={carrito}
        onQuitar={quitarDelCarrito}
        onVaciar={() => setCarrito([])}
      />
    </>
  )
}

export default App