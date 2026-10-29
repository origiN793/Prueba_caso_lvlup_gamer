import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router'
import RutaProtegida from './RutaProtegida'

// Página falsa de login que muestra de dónde venía el usuario
function LoginFalso() {
    const ubicacion = useLocation()
    return <p>Login (desde: {ubicacion.state?.desde ?? 'ninguna'})</p>
}

function mostrar(sesion, propiedades = {}) {
    render(
    <MemoryRouter initialEntries={['/admin']}>
        <Routes>
        <Route element={<RutaProtegida sesion={sesion} {...propiedades} />}>
            <Route path="/admin" element={<p>Panel privado</p>} />
        </Route>
        <Route path="/login" element={<LoginFalso />} />
        <Route path="/" element={<p>Pantalla de inicio</p>} />
        </Routes>
    </MemoryRouter>
    )
}

describe('RutaProtegida', () => {
    it('sin sesión redirige al login', () => {
    mostrar(null)
    expect(screen.getByText(/^Login/)).toBeInTheDocument()
    expect(screen.queryByText('Panel privado')).not.toBeInTheDocument()
    })

    it('sin sesión recuerda la página a la que se quería entrar', () => {
    mostrar(null)
    expect(screen.getByText('Login (desde: /admin)')).toBeInTheDocument()
    })

    it('con sesión de cliente deja pasar si la ruta no es solo para admin', () => {
    mostrar({ tipo: 'Cliente' })
    expect(screen.getByText('Panel privado')).toBeInTheDocument()
    })

    it('con sesión de cliente en ruta solo admin redirige al inicio', () => {
    mostrar({ tipo: 'Cliente' }, { soloAdmin: true })
    expect(screen.getByText('Pantalla de inicio')).toBeInTheDocument()
    expect(screen.queryByText('Panel privado')).not.toBeInTheDocument()
    })

    it('con sesión de administrador en ruta solo admin deja pasar', () => {
    mostrar({ tipo: 'Administrador' }, { soloAdmin: true })
    expect(screen.getByText('Panel privado')).toBeInTheDocument()
    })
})