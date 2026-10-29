import { expect } from 'vitest'
import { obtenerSesion, guardarSesion, borrarSesion } from './sesion'

const CLAVE = 'sesion-levelup'

describe('sesion', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it('devuelve null si no hay sesion guardada', () => {
        expect(obtenerSesion()).toBeNull()
    })

    it('guarda la sesion y luego la recupera igual', () => {
        const sesion = { correo: 'ana@duoc.cl', nombre: 'Ana', tipo: 'Cliente'}
        guardarSesion(sesion)
        expect(obtenerSesion()).toEqual(sesion)
    })

    it('guarda la sesion en localStorage bajo la clave sesion-levelup', () => {
        guardarSesion({ correo: 'ana@duoc.cl' })
        expect(localStorage.getItem(CLAVE)).toBe(JSON.stringify({ correo: 'ana@duoc.cl' }))
    })

    it('borra la sesion guardada', () => {
        guardarSesion({ correo: 'ana@duoc.cl' })
        borrarSesion()
        expect(obtenerSesion()).toBeNull()
        expect(localStorage.getItem(CLAVE)).toBeNull()
    })

    it('devuelve null si lo guaradado no es JSNO valido', () => {
        localStorage.setItem(CLAVE, '{esto no es json}')
        expect(obtenerSesion()).toBeNull()
    })
})