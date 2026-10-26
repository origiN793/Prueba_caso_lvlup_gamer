// Datos del panel de administración, guardados en localStorage.

import productosBase from './productos.js'

export const categorias = [
  'Juegos de Mesa',
  'Accesorios',
  'Consolas',
  'Computadores',
  'Sillas Gamers',
  'Monitores',
  'Poleras Personalizadas',
]

export const tiposUsuario = ['Administrador', 'Vendedor', 'Cliente']

const CLAVE_PRODUCTOS = 'admin_productos'
const CLAVE_USUARIOS = 'admin_usuarios'

const usuariosIniciales = [
  { id: 1, run: '191102226', nombre: 'Javiera', apellidos: 'Muñoz Rojas', correo: 'javiera.munoz@duoc.cl', tipo: 'Administrador', region: 'Región Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Av. Siempre Viva 123' },
  { id: 2, run: '128574936', nombre: 'Matías', apellidos: 'Contreras Silva', correo: 'matias.contreras@gmail.com', tipo: 'Vendedor', region: 'Región del Biobío', comuna: 'Concepción', direccion: 'Calle Los Aromos 456' },
  { id: 3, run: '205931189', nombre: 'Fernanda', apellidos: 'López Díaz', correo: 'fernanda.lopez@gmail.com', tipo: 'Cliente', region: 'Región de Valparaíso', comuna: 'Viña del Mar', direccion: 'Pasaje Las Rosas 789' },
]

// ---------- Funciones auxiliares (no se exportan) ----------

// Lee una lista guardada. Si no existe (o está corrupta), guarda y devuelve los valores iniciales.
function leer(clave, valoresIniciales) {
  try {
    const guardado = localStorage.getItem(clave)
    if (guardado) return JSON.parse(guardado)
  } catch {
    // si está corrupto, partimos de cero
  }
  localStorage.setItem(clave, JSON.stringify(valoresIniciales))
  return valoresIniciales
}

function guardar(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista))
}

// El id nuevo es el más alto + 1
function siguienteId(lista) {
  return lista.reduce((mayor, item) => Math.max(mayor, item.id), 0) + 1
}

// ---------- Productos ----------

export function obtenerProductos() {
  // Los productos de la tienda no traen id: se lo agregamos según su posición
  const iniciales = productosBase.map((producto, indice) => ({ ...producto, id: indice + 1 }))
  return leer(CLAVE_PRODUCTOS, iniciales)
}

export function buscarProducto(id) {
  return obtenerProductos().find((p) => p.id === Number(id)) ?? null
}


export function guardarProducto(producto) {
  const lista = obtenerProductos()
  if (producto.id) {
    guardar(CLAVE_PRODUCTOS, lista.map((p) => (p.id === producto.id ? producto : p)))
  } else {
    guardar(CLAVE_PRODUCTOS, [...lista, { ...producto, id: siguienteId(lista) }])
  }
}

export function eliminarProducto(id) {
  guardar(CLAVE_PRODUCTOS, obtenerProductos().filter((p) => p.id !== Number(id)))
}

// ---------- Usuarios ----------

export function obtenerUsuarios() {
  return leer(CLAVE_USUARIOS, usuariosIniciales)
}

export function buscarUsuario(id) {
  return obtenerUsuarios().find((u) => u.id === Number(id)) ?? null
}

export function guardarUsuario(usuario) {
  const lista = obtenerUsuarios()
  if (usuario.id) {
    guardar(CLAVE_USUARIOS, lista.map((u) => (u.id === usuario.id ? usuario : u)))
  } else {
    guardar(CLAVE_USUARIOS, [...lista, { ...usuario, id: siguienteId(lista) }])
  }
}

export function eliminarUsuario(id) {
  guardar(CLAVE_USUARIOS, obtenerUsuarios().filter((u) => u.id !== Number(id)))
}