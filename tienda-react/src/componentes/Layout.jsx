import { Outlet } from 'react-router'
import Encabezado from './Encabezado.jsx'
import PiePagina from './PiePagina.jsx'

// Marco del sitio: se escribe UNA vez y se ve en todas las pantallas.
function Layout({ cantidad, onVerCarrito, sesion, onCerrarSesion }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Encabezado cantidad={cantidad} onVerCarrito={onVerCarrito} sesion={sesion} onCerrarSesion={onCerrarSesion} />
      <main className="flex-grow-1">
        <Outlet /> {/* <- aquí entra cada página */}
      </main>
      <PiePagina />
    </div>
  )
}

export default Layout