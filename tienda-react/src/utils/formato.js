// Convierte 29990 en "$29.990" usando el formato chileno.
export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
}