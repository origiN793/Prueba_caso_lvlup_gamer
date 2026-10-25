// Reglas de validación de formularios.
// Cada función devuelve un mensaje de error, o '' si el dato es válido.

const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']

export function validarNombre(valor) {
  const texto = valor.trim()
  if (texto === '') return 'El nombre es obligatorio.'
  if (texto.length > 100) return 'El nombre no puede tener más de 100 caracteres.'
  return ''
}

export function validarCorreo(valor) {
  const texto = valor.trim()
  if (texto === '') return 'El correo es obligatorio.'
  if (texto.length > 100) return 'El correo no puede tener más de 100 caracteres.'

  // Expresión regular simple para revisar el formato
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
    return 'Ingresa un correo con formato válido.'
  }

  // El dominio es lo que viene después del @
  const dominio = texto.split('@')[1].toLowerCase()
  if (!dominiosPermitidos.includes(dominio)) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }
  return ''
}

export function validarComentario(valor) {
  const texto = valor.trim()
  if (texto === '') return 'El comentario es obligatorio.'
  if (texto.length > 500) return 'El comentario no puede tener más de 500 caracteres.'
  return ''
}