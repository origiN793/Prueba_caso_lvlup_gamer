/* =========================================
   admin-datos.js
   Guarda y lee los productos y usuarios del
   panel admin usando el localStorage del
   navegador. La primera vez que se entra,
   se cargan datos de ejemplo.
   ========================================= */

var categorias = [
  "Juegos de Mesa", "Accesorios", "Consolas", "Computadores",
  "Sillas Gamers", "Monitores", "Poleras Personalizadas"
];

var tiposUsuario = ["Administrador", "Vendedor", "Cliente"];

// Se ejecuta apenas carga cualquier pagina del admin
function inicializarDatosAdmin() {
  if (localStorage.getItem("admin_productos") === null) {
    var listaInicial = [];
    for (var i = 0; i < productos.length; i++) {
      var copia = Object.assign({}, productos[i]);
      copia.id = i + 1;
      listaInicial.push(copia);
    }
    localStorage.setItem("admin_productos", JSON.stringify(listaInicial));
  }

  if (localStorage.getItem("admin_usuarios") === null) {
    var usuariosIniciales = [
      { id: 1, run: "191102226", nombre: "Javiera", apellidos: "Munoz Rojas", correo: "javiera.munoz@duoc.cl", tipo: "Administrador", region: "Region Metropolitana de Santiago", comuna: "Santiago", direccion: "Av. Siempre Viva 123" },
      { id: 2, run: "128574936", nombre: "Matias", apellidos: "Contreras Silva", correo: "matias.contreras@gmail.com", tipo: "Vendedor", region: "Region del Biobio", comuna: "Concepcion", direccion: "Calle Los Aromos 456" },
      { id: 3, run: "205931189", nombre: "Fernanda", apellidos: "Lopez Diaz", correo: "fernanda.lopez@gmail.com", tipo: "Cliente", region: "Region de Valparaiso", comuna: "Vina del Mar", direccion: "Pasaje Las Rosas 789" }
    ];
    localStorage.setItem("admin_usuarios", JSON.stringify(usuariosIniciales));
  }
}

/* ---------- Funciones de productos ---------- */

function obtenerProductosAdmin() {
  return JSON.parse(localStorage.getItem("admin_productos"));
}

function guardarListaProductosAdmin(lista) {
  localStorage.setItem("admin_productos", JSON.stringify(lista));
}

function buscarProductoAdminPorId(id) {
  var lista = obtenerProductosAdmin();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === Number(id)) {
      return lista[i];
    }
  }
  return null;
}

function guardarUnProductoAdmin(producto) {
  var lista = obtenerProductosAdmin();

  if (producto.id) {
    // es una edicion: buscamos y reemplazamos
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === producto.id) {
        lista[i] = producto;
      }
    }
  } else {
    // es un producto nuevo: le asignamos un id
    var idMasAlto = 0;
    for (var j = 0; j < lista.length; j++) {
      if (lista[j].id > idMasAlto) {
        idMasAlto = lista[j].id;
      }
    }
    producto.id = idMasAlto + 1;
    lista.push(producto);
  }

  guardarListaProductosAdmin(lista);
}

function eliminarProductoAdmin(id) {
  var lista = obtenerProductosAdmin();
  var nuevaLista = [];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== Number(id)) {
      nuevaLista.push(lista[i]);
    }
  }

  guardarListaProductosAdmin(nuevaLista);
}

/* ---------- Funciones de usuarios ---------- */

function obtenerUsuariosAdmin() {
  return JSON.parse(localStorage.getItem("admin_usuarios"));
}

function guardarListaUsuariosAdmin(lista) {
  localStorage.setItem("admin_usuarios", JSON.stringify(lista));
}

function buscarUsuarioAdminPorId(id) {
  var lista = obtenerUsuariosAdmin();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === Number(id)) {
      return lista[i];
    }
  }
  return null;
}

function guardarUnUsuarioAdmin(usuario) {
  var lista = obtenerUsuariosAdmin();

  if (usuario.id) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === usuario.id) {
        lista[i] = usuario;
      }
    }
  } else {
    var idMasAlto = 0;
    for (var j = 0; j < lista.length; j++) {
      if (lista[j].id > idMasAlto) {
        idMasAlto = lista[j].id;
      }
    }
    usuario.id = idMasAlto + 1;
    lista.push(usuario);
  }

  guardarListaUsuariosAdmin(lista);
}

function eliminarUsuarioAdmin(id) {
  var lista = obtenerUsuariosAdmin();
  var nuevaLista = [];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== Number(id)) {
      nuevaLista.push(lista[i]);
    }
  }

  guardarListaUsuariosAdmin(nuevaLista);
}

document.addEventListener("DOMContentLoaded", function () {
  inicializarDatosAdmin();
});
