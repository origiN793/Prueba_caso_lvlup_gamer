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

export function validarTexto(valor, etiqueta, maximo, sufijo = 'obligatorio') {
  const texto = valor.trim()
  if (texto === '') return `${etiqueta} es ${sufijo}.`
  if (texto.length > maximo) {
    return `${etiqueta} no puede tener más de ${maximo} caracteres.`
  }
  return ''
}

// Contraseña entre 4 y 10 caracteres
export function validarPassword(valor) {
  if (valor === '') return 'La contraseña es obligatoria.'
  if (valor.length < 4 || valor.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.'
  }
  return ''
}

export function validarConfirmacion(clave, confirmacion) {
  if (confirmacion === '') return 'Debes confirmar la contraseña.'
  if (clave !== confirmacion) return 'Las contraseñas no coinciden.'
  return ''
}

// RUN
export function validarRUN(valor) {
  const texto = valor.trim().toUpperCase()
  if (texto === '') return 'El RUN es obligatorio.'
  if (texto.length < 7 || texto.length > 9) {
    return 'El RUN debe tener entre 7 y 9 caracteres.'
  }
  if (!/^[0-9]+[0-9K]$/.test(texto)) {
    return 'El RUN debe ingresarse sin puntos ni guion. Ejemplo: 19011022K'
  }
  return ''
}

// Para los selects de región y comuna
export function validarSeleccion(valor, texto) {
  return valor === '' ? `Debes seleccionar ${texto}.` : ''
}

// Número obligatorio que no puede ser menor a un mínimo
export function validarNumeroMinimo(valor, etiqueta, minimo) {
  if (valor === '') return `${etiqueta} es obligatorio.`
  const numero = Number(valor)
  if (isNaN(numero) || numero < minimo) {
    return `${etiqueta} no puede ser menor a ${minimo}.`
  }
  return ''
}