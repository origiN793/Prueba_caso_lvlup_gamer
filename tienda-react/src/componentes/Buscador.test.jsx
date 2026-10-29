import { render, screen, fireEvent } from '@testing-library/react'
import Buscador from './Buscador'

const categorias = ['Consolas', 'Accesorios']

function mostrar(propiedades = {}) {
    const funciones = {
    onCambiarTexto: vi.fn(),
    onCambiarCategoria: vi.fn(),
    }
    const resultado = render(
    <Buscador
        texto=""
        categoria="Todas"
        categorias={categorias}
        {...funciones}
        {...propiedades}
    />
    )
    return { ...funciones, ...resultado }
}

describe('Buscador', () => {
    it('muestra el texto y la categoría que recibe del estado', () => {
    mostrar({ texto: 'mouse', categoria: 'Consolas' })
    expect(screen.getByRole('searchbox')).toHaveValue('mouse')
    expect(screen.getByRole('combobox')).toHaveValue('Consolas')
    })

    it('ofrece "Todas las categorías" más cada categoría recibida', () => {
    mostrar()
    expect(screen.getByRole('option', { name: 'Todas las categorías' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Consolas' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Accesorios' })).toBeInTheDocument()
    })

    it('al escribir llama a onCambiarTexto con el nuevo valor', () => {
    const { onCambiarTexto } = mostrar()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'catan' } })
    expect(onCambiarTexto).toHaveBeenCalledWith('catan')
    })

    it('al elegir una categoría llama a onCambiarCategoria con su valor', () => {
    const { onCambiarCategoria } = mostrar()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Accesorios' } })
    expect(onCambiarCategoria).toHaveBeenCalledWith('Accesorios')
    })

    it('enviar el formulario no recarga la página (se cancela el submit)', () => {
    const { container } = mostrar()
    // fireEvent devuelve false cuando el evento fue cancelado con preventDefault
    expect(fireEvent.submit(container.querySelector('form'))).toBe(false)
    })
})