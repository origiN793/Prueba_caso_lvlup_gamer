import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Buscador from '../componentes/Buscador.jsx'
import Catalogo from '../componentes/Catalogo.jsx'
import productos from '../data/productos.js'

function Productos({onAgregar}) {
    const [texto, setTexto] = useState('')
    const [categoria, setCategoria] = useState('Todas')

    const categorias = [...new Set(productos.map((p) => p.categoria))]
    const productosFiltrados = productos.filter((p) => {
        const coincideTexto = p.nombre.toLowerCase().includes(texto.toLowerCase())
        const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
        return coincideTexto && coincideCategoria
    })

    return (
        <Container className="py-4">
            <h2 className="mb-3">Productos</h2>
            <Buscador 
                texto={texto}
                onCambiarTexto={setTexto}
                categoria={categoria}
                onCambiarCategoria={setCategoria}
                categorias={categorias}
            />
            <Catalogo productos={productosFiltrados} onAgregar={onAgregar} />
        </Container>
    )

}

export default Productos