import {
    categorias,
    tiposUsuario,
    obtenerProductos,
    buscarProducto,
    guardarProducto,
    eliminarProducto,
    obtenerUsuarios,
    buscarUsuario,
    guardarUsuario,
    eliminarUsuario,
} from './adminDatos'
import productosBase from './productos.js'

// Cada prueba parte con el almacenamiento vacío
beforeEach(() => {
    localStorage.clear()
})

describe('listas fijas', () => {
    it('categorias incluye las categorías de la tienda', () => {
        expect(categorias).toHaveLength(7)
        expect(categorias).toContain('Consolas')
    })

    it('tiposUsuario tiene los tres tipos esperados', () => {
        expect(tiposUsuario).toEqual(['Administrador', 'Vendedor', 'Cliente'])
    })
})

describe('productos', () => {
    it('sin datos guardados devuelve los productos de la tienda con un id por posición', () => {
        const lista = obtenerProductos()
        expect(lista).toHaveLength(productosBase.length)
        expect(lista[0].id).toBe(1)
        expect(lista[0].nombre).toBe(productosBase[0].nombre)
        expect(lista.at(-1).id).toBe(productosBase.length)
    })

    it('la primera lectura deja los productos guardados en localStorage', () => {
        obtenerProductos()
        const guardado = JSON.parse(localStorage.getItem('admin_productos'))
        expect(guardado).toHaveLength(productosBase.length)
    })

    it('si ya hay datos guardados, los usa en vez de los iniciales', () => {
        localStorage.setItem('admin_productos', JSON.stringify([{ id: 7, nombre: 'Solo uno' }]))
        expect(obtenerProductos()).toEqual([{ id: 7, nombre: 'Solo uno' }])
    })

    it('si lo guardado está corrupto, vuelve a los productos iniciales', () => {
        localStorage.setItem('admin_productos', '{esto esta roto')
        expect(obtenerProductos()).toHaveLength(productosBase.length)
    })

    it('buscarProducto encuentra por id, sea número o texto', () => {
        expect(buscarProducto(1).nombre).toBe(productosBase[0].nombre)
        expect(buscarProducto('2').id).toBe(2)
    })

    it('buscarProducto devuelve null si el id no existe', () => {
        expect(buscarProducto(999)).toBeNull()
    })

    it('guardarProducto sin id agrega uno nuevo con el siguiente id', () => {
        const antes = obtenerProductos().length
        guardarProducto({ nombre: 'Nuevo', precio: 1000 })
        const lista = obtenerProductos()
        expect(lista).toHaveLength(antes + 1)
        expect(lista.at(-1)).toEqual({ nombre: 'Nuevo', precio: 1000, id: antes + 1 })
    })

    it('guardarProducto en una lista vacía asigna el id 1', () => {
        localStorage.setItem('admin_productos', '[]')
        guardarProducto({ nombre: 'Primero' })
        expect(obtenerProductos()).toEqual([{ nombre: 'Primero', id: 1 }])
    })

    it('guardarProducto con id existente edita sin agregar otro', () => {
        const antes = obtenerProductos().length
        const original = buscarProducto(1)
        guardarProducto({ ...original, nombre: 'Editado' })
        expect(obtenerProductos()).toHaveLength(antes)
        expect(buscarProducto(1).nombre).toBe('Editado')
    })

    it('eliminarProducto quita el producto, aunque el id llegue como texto', () => {
        const antes = obtenerProductos().length
        eliminarProducto('1')
        expect(obtenerProductos()).toHaveLength(antes - 1)
        expect(buscarProducto(1)).toBeNull()
    })
})

describe('usuarios', () => {
    it('sin datos guardados devuelve los 3 usuarios iniciales', () => {
        const lista = obtenerUsuarios()
        expect(lista).toHaveLength(3)
        expect(lista.map((u) => u.tipo)).toEqual(['Administrador', 'Vendedor', 'Cliente'])
    })

    it('buscarUsuario encuentra por id, sea número o texto', () => {
        expect(buscarUsuario(2).nombre).toBe('Matías')
        expect(buscarUsuario('3').tipo).toBe('Cliente')
    })

    it('buscarUsuario devuelve null si el id no existe', () => {
        expect(buscarUsuario(99)).toBeNull()
    })

    it('guardarUsuario sin id agrega uno nuevo con id 4', () => {
        guardarUsuario({ nombre: 'Nuevo', correo: 'nuevo@duoc.cl' })
        const lista = obtenerUsuarios()
        expect(lista).toHaveLength(4)
        expect(lista.at(-1).id).toBe(4)
    })

    it('guardarUsuario con id existente lo edita sin agregar otro', () => {
        const original = buscarUsuario(1)
        guardarUsuario({ ...original, nombre: 'Editada' })
        expect(obtenerUsuarios()).toHaveLength(3)
        expect(buscarUsuario(1).nombre).toBe('Editada')
    })

    it('eliminarUsuario quita al usuario indicado', () => {
        eliminarUsuario(2)
        expect(obtenerUsuarios().map((u) => u.id)).toEqual([1, 3])
    })

    it('el id nuevo es el más alto + 1, no la cantidad de usuarios', () => {
        eliminarUsuario(1)
        guardarUsuario({ nombre: 'Otro' })
        // quedaban los ids 2 y 3; el nuevo debe ser 4, no 3
        expect(obtenerUsuarios().map((u) => u.id)).toEqual([2, 3, 4])
    })
})