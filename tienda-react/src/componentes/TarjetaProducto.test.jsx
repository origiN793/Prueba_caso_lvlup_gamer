import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import TarjetaProducto from './TarjetaProducto'
import { describe, expect } from 'vitest'

const productoBase = {
    codigo: 'CO001',
    nombre: 'PlayStation 5',
    descripcion: 'Consola de nueva generacion con SSD ultra rapido.',
    categoria: 'Consolas',
    precio: 549990,
    stock: 10,
    stockCritico: 2,
    imagen: 'images/PlayStation_5.jpg',
}

function mostrar(cambios = {}, onAgregar = vi.fn()) {
    const producto = { ...productoBase, ...cambios }
    render(
        <MemoryRouter>
            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
        </MemoryRouter>
    )
    return { producto, onAgregar }
}

describe('TarjetaProducto', () => {
    it('muestra nombre, categoria, descripcion y precio formateado', () => {
        mostrar()
        expect(screen.getByText('PlayStation 5')).toBeInTheDocument()
        expect(screen.getByText('Consolas')).toBeInTheDocument()
        expect(screen.getByText('Consola de nueva generacion con SSD ultra rapido.')).toBeInTheDocument()
        expect(screen.getByText('$549.990')).toBeInTheDocument()
    })

    it('muetra la imagen con su texto alternativo', () => {
        mostrar()
        expect(screen.getByAltText('PlayStation 5')).toHaveAttribute('src', 'images/PlayStation_5.jpg')
    })

    it('enlaza al detalle usando el código del producto', () => {
        mostrar()
        const enlaces = screen.getAllByRole('link')
        expect(enlaces).toHaveLength(2)
        enlaces.forEach((enlace) => {
        expect(enlace).toHaveAttribute('href', '/producto/CO001')
        })
    })

    it('con stock normal muestra cuántas unidades quedan', () => {
        mostrar({ stock: 10 })
        expect(screen.getByText('Quedan 10 unidades')).toBeInTheDocument()
    })

    it('con stock igual o menor al crítico avisa que quedan las últimas', () => {
        mostrar({ stock: 2, stockCritico: 2 })
        expect(screen.getByText('¡Últimas 2 unidades!')).toBeInTheDocument()
    })

    it('sin stock muestra el aviso y deshabilita el botón', () => {
        mostrar({ stock: 0 })
        expect(screen.getByText('Sin stock')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeDisabled()
    })

    it('al pulsar Agregar llama a onAgregar con el producto', () => {
        const { producto, onAgregar } = mostrar()
        fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
        expect(onAgregar).toHaveBeenCalledTimes(1)
        expect(onAgregar).toHaveBeenCalledWith(producto)
    })

    it('si el producto está agotado, pulsar el botón no llama a onAgregar', () => {
        const { onAgregar } = mostrar({ stock: 0 })
        fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
        expect(onAgregar).not.toHaveBeenCalled()
    })

})