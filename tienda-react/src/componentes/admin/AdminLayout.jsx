import { Outlet, NavLink, Link } from 'react-router'
import { Nav, Button } from 'react-bootstrap'

function AdminLayout({ sesion, onCerrarSesion }) {
    return (
        <div className="d-flex flex-column flex-md-row min-vh-100">
            <aside className="barra-admin bg-dark text-white p-3">
                <div className="fw-bold fs-5">
                    Level-Up <span className="text-success">Gamer</span>
                </div>
                <small className="text-white-50 d-block mb-3">Panel Administrador</small>

                <Nav variant="pills" className="flex-column">
                    <Nav.Link as={NavLink} to="/admin" end>Dashboard</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/productos">Productos</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/usuarios">Usuarios</Nav.Link>
                </Nav>

                <div className="text-white-50 small mt-4">
                    {sesion.nombre} ({sesion.tipo})
                </div>
                <Button variant="outline-light" size="sm" className="mt-2" onClick={onCerrarSesion}>
                    Cerrar sesión
                </Button>

                <Link to="/" className="d-block mt-4 text-white-50">
                    Volver a la tienda
                </Link>
            </aside>

            <main className="flex-grow-1 p-4 bg-body-tertiary">
                <Outlet />
            </main>
        </div>
    )
}
export default AdminLayout