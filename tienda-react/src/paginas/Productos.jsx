import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { Container } from 'react-bootstrap'
import Buscador from '../componentes/Buscador.jsx'
import Catalogo from '../componentes/Catalogo.jsx'
import { obtenerProductos } from '../data/adminDatos'

function Productos({ onAgregar }) {
    const [productos] = useState(obtenerProductos)

    const [parametros, setParametros] = useSearchParams()
    const texto = parametros.get('buscar') ?? ''
    const categoria = parametros.get('categoria') ?? 'Todas'

    function actualizar(clave, valor, reemplazar = false) {
        const copia = new URLSearchParams(parametros)
        if (valor) copia.set(clave, valor)
        else copia.delete(clave)
        setParametros(copia, { replace : reemplazar })
    }

    const categorias = [...new Set(productos.map((p) => p.categoria))]
    const productosFiltrados = productos.filter((p) => {
        const coincideTexto = p.nombre.toLowerCase().includes(texto.toLocaleLowerCase())
        const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
        return coincideTexto && coincideCategoria
    })

    return (
        <Container className="py-4">
            <h2 className="mb-3">Productos</h2>
            <Buscador 
                texto={texto}
                onCambiarTexto={(valor) => actualizar('buscar', valor, true)}
                categoria={categoria}
                onCambiarCategoria={(valor) => actualizar('categoria', valor === 'Todas' ? '' : valor)}
                categorias={categorias}  
            />
            <Catalogo productos={productosFiltrados} onAgregar={onAgregar} />
        </Container>
    )
}

export default Productos