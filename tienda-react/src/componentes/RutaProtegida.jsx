import { Navigate, Outlet, useLocation } from 'react-router'

function RutaProtegida({ sesion, soloAdmin = false}) {
    const ubicacion = useLocation()

    if ( !sesion ) {
        return <Navigate to="/login" replace state={{ desde: ubicacion.pathname}} />
    }

    if (soloAdmin && sesion.tipo !== 'Administrador') {
        return <Navigate to="/" replace />
    }

    return <Outlet />

}

export default RutaProtegida