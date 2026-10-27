const CLAVE_SESION = 'sesion-levelup'

export function obtenerSesion() {
    try {
        const guardada = localStorage.getItem(CLAVE_SESION)
        return guardada ? JSON.parse(guardada) : null
    } catch {
        return null
    }
}

export function guardarSesion(usuario) {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
}

export function borrarSesion() {
    localStorage.removeItem(CLAVE_SESION)
}