import { formatearPrecio } from './formato.js'

describe('formatearPrecio', () => {
    it('antepone el signo peso', () => {
        expect(formatearPrecio(990)).toBe('$990')
    })

    it('usa el punto como separador de miles', () => {
        expect(formatearPrecio(24990)).toBe('$24.990')
    })

    it('formatea precios grandes', () => {
        expect(formatearPrecio(549990)).toBe('$549.990')
    })

    it('redondea los decimales', () => {
        expect(formatearPrecio(1234.6)).toBe('$1.235')
    })

    it('formatea el cero', () => {
        expect(formatearPrecio(0)).toBe('$0')
    })
})