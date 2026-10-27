import { describe } from 'vitest'
import {
    validarCorreo,
    validarComentario,
    validarTexto,
    validarPassword,
    validarConfirmacion,
    validarRUN,
    validarSeleccion,
    validarNumeroMinimo,
} from './validaciones.js'

// si la funcion devuelve '' significa que el dato es valido


describe('validarCorreo', () => {
    it('exige un correo', () => {
        expect(validarCorreo('')).toBe('El correo es obligatorio.')
    })

    it('rechaza un correo sin formato valido', () => {
        expect(validarCorreo('hola')).toBe('Ingresa un correo con formato válido.')
    })

    it('rechaza un dominio no permitido', () => {
        expect(validarCorreo('ana@hotmail.com')).toContain('Solo se aceptan')
    })

    it('acepta los tres dominios permitidos', () => {
        for (const correo of ['ana@duoc.cl', 'ana@profesor.duoc.cl', 'ana@gmail.com']) {
            expect(validarCorreo(correo)).toBe('')
        }
    })

    it('no distingue mayusculas del dominio', () => {
        expect(validarCorreo('ANA@DUOC.CL')).toBe('')
    })

    it('rechaza mas de 100 caracteres', () => {
        const largo = 'a'.repeat(95) + '@duoc.cl' // total de 103 caracteres
        expect(validarCorreo(largo)).toBe('El correo no puede tener más de 100 caracteres.')
    })

})

describe('validarRUN', () => {
    it('acepta un RUN válido', () => {
        expect(validarRUN('19011022K')).toBe('')
    })

    it('acepta la K en minúscula', () => {
        expect(validarRUN('19011022k')).toBe('')
    })

    it('exige un RUN', () => {
        expect(validarRUN('')).toBe('El RUN es obligatorio.')
    })

    it('rechaza un RUN demasiado corto', () => {
        expect(validarRUN('123456')).toBe('El RUN debe tener entre 7 y 9 caracteres.')
    })

    it('rechaza un RUN con puntos', () => {
        expect(validarRUN('1234.5678')).toContain('sin puntos ni guion')
    })
})

describe('validarPassword', ()=> {
    it('exige una contraseña', () => {
        expect(validarPassword('')).toBe('La contraseña es obligatoria.')
    })

    it('rechaza menos de 4 caracteres', () => {
        expect(validarPassword('123')).toBe('La contraseña debe tener entre 4 y 10 caracteres.')
    })

    it('rechaza mas de 10 caracteres', () => {
        expect(validarPassword('12345678901')).toBe('La contraseña debe tener entre 4 y 10 caracteres.')
    })

    it('acepta los extremos válidos (4 y 10)', () => {
        expect(validarPassword('1234')).toBe('')
        expect(validarPassword('1234567890')).toBe('')
    })
})

describe('validarConfirmacion', () => {
    it('exige confirmar', () => {
        expect(validarConfirmacion('1234', '')).toBe('Debes confirmar la contraseña.')
    })

    it('rechaza contraseñas distintas', () => {
        expect(validarConfirmacion('1234', '12345')).toBe('Las contraseñas no coinciden.')
    })

    it('acepta contraseñas iguales', () => {
        expect(validarConfirmacion('1234', '1234')).toBe('')
    })
})

describe('validarTexto', () => {
    it('rechaza un texto vacío', () => {
        expect(validarTexto('', 'El nombre', 50)).toBe('El nombre es obligatorio.')
    })

    it('trata los espacios como vacío', () => {
        expect(validarTexto('   ', 'El nombre', 50)).toBe('El nombre es obligatorio.')
    })

    it('usa el género indicado en el mensaje', () => {
        expect(validarTexto('', 'La dirección', 300, 'obligatoria')).toBe('La dirección es obligatoria.')
    })

    it('rechaza un texto más largo que el máximo', () => {
        expect(validarTexto('x'.repeat(51), 'El nombre', 50)).toBe(
        'El nombre no puede tener más de 50 caracteres.',
        )
    })

    it('acepta un texto justo en el máximo', () => {
        expect(validarTexto('x'.repeat(50), 'El nombre', 50)).toBe('')
    })
})

describe('validarComentario', () => {
    it('rechaza más de 500 caracteres', () => {
        expect(validarComentario('x'.repeat(501))).toBe(
        'El comentario no puede tener más de 500 caracteres.',
        )
    })

    it('acepta exactamente 500 caracteres', () => {
        expect(validarComentario('x'.repeat(500))).toBe('')
    })
})

describe('validarNumeroMinimo', () => {
    it('exige un valor', () => {
        expect(validarNumeroMinimo('', 'El precio', 0)).toBe('El precio es obligatorio.')
    })

    it('rechaza un número menor al mínimo', () => {
        expect(validarNumeroMinimo('-5', 'El precio', 0)).toBe('El precio no puede ser menor a 0.')
    })

    it('acepta el mínimo exacto', () => {
        expect(validarNumeroMinimo('0', 'El precio', 0)).toBe('')
    })
})

describe('validarSeleccion', () => {
    it('pide seleccionar cuando no hay valor', () => {
        expect(validarSeleccion('', 'una región')).toBe('Debes seleccionar una región.')
    })

    it('acepta cuando hay una opción elegida', () => {
        expect(validarSeleccion('Región del Maule', 'una región')).toBe('')
    })
})