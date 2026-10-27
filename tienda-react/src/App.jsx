import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { obtenerSesion, guardarSesion, borrarSesion } from './utils/sesion.js'


import Layout from './componentes/Layout.jsx'
import Carrito from './componentes/Carrito.jsx'
import Inicio from './paginas/Inicio.jsx'
import Productos from './paginas/Productos.jsx'
import DetalleProducto from './paginas/DetalleProducto.jsx'
import Nosotros from './paginas/Nosotros.jsx'
import Blog from './paginas/Blog.jsx'
import DetalleBlog from './paginas/DetalleBlog.jsx'
import Contacto from './paginas/Contacto.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'
import RutaProtegida from './componentes/RutaProtegida.jsx'

import AdminLayout from './componentes/admin/AdminLayout.jsx'
import Dashboard from './paginas/admin/Dashboard.jsx'
import ProductosAdmin from './paginas/admin/ProductosAdmin.jsx'
import FormularioProducto from './paginas/admin/FormularioProducto.jsx'
import UsuariosAdmin from './paginas/admin/UsuariosAdmin.jsx'
import FormularioUsuario from './paginas/admin/FormularioUsuario.jsx'

const CLAVE_CARRITO = 'carrito-levelup'

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

  const [sesion, setSesion] = useState(obtenerSesion)

  function iniciarSesion(usuario) {
    guardarSesion(usuario)
    setSesion(usuario)
  }

  function cerrarSesion() {
    borrarSesion()
    setSesion(null)
  }

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  useEffect(() => {
    document.title = `(${cantidadTotal}) Level-Up Gamer`
  }, [cantidadTotal])

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
      return [...carritoActual, { codigo: producto.codigo, cantidad }]
    })
    return true
  }

  function quitarDelCarrito(codigo) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.codigo !== codigo),
    )
  }

  function cambiarCantidad(codigo, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(codigo)
      return
    }
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.codigo === codigo ? { ...item, cantidad: nuevaCantidad } : item,
      ),
    )
  }

  return (
    <>
      <Routes>
        {/* ---------- Tienda ---------- */}
        <Route
          path="/"
          element={<Layout cantidad={cantidadTotal} onVerCarrito={() => setMostrarCarrito(true)} sesion={sesion} onCerrarSesion={cerrarSesion} />}
        >
          <Route index element={<Inicio onAgregar={agregarAlCarrito} />} />
          <Route path="productos" element={<Productos onAgregar={agregarAlCarrito} />} />
          <Route path="producto/:codigo" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<DetalleBlog />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login onIniciarSesion={iniciarSesion} />} />
          <Route path="registro" element={<Registro />} />
          {/* Comodín: atrapa cualquier dirección que no coincida con las anteriores */}
          <Route path="*" element={<NoEncontrada />} />
        </Route>

        {/* ---------- Panel de administración: solo para administradores ---------- */}
        <Route element={<RutaProtegida sesion={sesion} soloAdmin />}>
          <Route path="/admin" element={<AdminLayout sesion={sesion} onCerrarSesion={cerrarSesion} />}>
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<ProductosAdmin />} />
            <Route path="productos/nuevo" element={<FormularioProducto />} />
            <Route path="productos/editar/:id" element={<FormularioProducto />} />
            <Route path="usuarios" element={<UsuariosAdmin />} />
            <Route path="usuarios/nuevo" element={<FormularioUsuario />} />
            <Route path="usuarios/editar/:id" element={<FormularioUsuario />} />
          </Route>
        </Route>
      </Routes>

      <Carrito
        mostrar={mostrarCarrito}
        onCerrar={() => setMostrarCarrito(false)}
        carrito={carrito}
        onCambiarCantidad={cambiarCantidad}
        onQuitar={quitarDelCarrito}
        onVaciar={() => setCarrito([])}
      />
    </>
  )
}

export default App