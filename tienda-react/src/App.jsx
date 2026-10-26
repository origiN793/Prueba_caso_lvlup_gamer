import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'


import Layout from './componentes/Layout.jsx'
import AdminLayout from './componentes/admin/AdminLayout.jsx'
import DetalleProducto from './paginas/DetalleProdcuto.jsx'
import Dashboard from './paginas/admin/Dashboard.jsx'
import ProductosAdmin from './paginas/admin/ProductosAdmin.jsx'
import FormularioProducto from './paginas/admin/FormularioProducto.jsx'
import UsuariosAdmin from './paginas/admin/UsuariosAdmin.jsx'
import FormularioUsuario from './paginas/admin/FormularioUsuario.jsx'
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

  // Devuelve true si se agregó, false si no alcanzaba el stock
function agregarAlCarrito(producto, cantidad = 1) {
  const existe = carrito.find((item) => item.codigo === producto.codigo)
  const enCarrito = existe ? existe.cantidad : 0

  if (enCarrito + cantidad > producto.stock) {
    alert(`Solo quedan ${producto.stock} unidades disponibles.`)
    return false
  }

  setCarrito((carritoActual) => {
    if (existe) {
      return carritoActual.map((item) =>
        item.codigo === producto.codigo
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item,
      )
    }
    return [...carritoActual, { ...producto, cantidad }]
  })
  return true
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
          <Route path="producto/:codigo" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
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
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="productos/nuevo" element={<FormularioProducto />} />
          <Route path="productos/editar/:id" element={<FormularioProducto />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="usuarios/nuevo" element={<FormularioUsuario />} />
          <Route path="usuarios/editar/:id" element={<FormularioUsuario />} />
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