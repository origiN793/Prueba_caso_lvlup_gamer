/* =========================================
   admin-usuarios.js
   Dibuja la tabla de usuarios y maneja el
   formulario de crear/editar usuario.
   ========================================= */

function dibujarTablaUsuarios() {
  var cuerpoTabla = document.getElementById("cuerpo-tabla-usuarios");
  if (cuerpoTabla === null) {
    return;
  }

  var textoBusqueda = document.getElementById("buscador-usuarios").value.toLowerCase();
  var lista = obtenerUsuariosAdmin();
  var html = "";

  for (var i = 0; i < lista.length; i++) {
    var usuario = lista[i];
    var coincide = usuario.nombre.toLowerCase().indexOf(textoBusqueda) !== -1 ||
      usuario.correo.toLowerCase().indexOf(textoBusqueda) !== -1;

    if (!coincide) {
      continue;
    }

    html += "<tr>";
    html += "  <td>" + usuario.run + "</td>";
    html += "  <td>" + usuario.nombre + " " + usuario.apellidos + "</td>";
    html += "  <td>" + usuario.correo + "</td>";
    html += "  <td>" + usuario.tipo + "</td>";
    html += "  <td>" + usuario.comuna + "</td>";
    html += "  <td class='acciones-tabla'>";
    html += "    <a href='usuario-form.html?id=" + usuario.id + "'>Editar</a>";
    html += "    <button class='eliminar' onclick='eliminarUsuarioDesdeTabla(" + usuario.id + ")'>Eliminar</button>";
    html += "  </td>";
    html += "</tr>";
  }

  if (html === "") {
    html = "<tr><td colspan='6' style='text-align:center;'>No hay usuarios que coincidan.</td></tr>";
  }

  cuerpoTabla.innerHTML = html;
}

function eliminarUsuarioDesdeTabla(id) {
  var confirmacion = confirm("Seguro que quieres eliminar este usuario?");
  if (confirmacion) {
    eliminarUsuarioAdmin(id);
    dibujarTablaUsuarios();
  }
}

// ---------- Formulario de nuevo/editar usuario ----------
function inicializarFormularioUsuario() {
  var formulario = document.getElementById("formulario-usuario");
  if (formulario === null) {
    return;
  }

  // Llenamos el select de tipo de usuario
  var selectTipo = document.getElementById("campo-tipo");
  for (var i = 0; i < tiposUsuario.length; i++) {
    var opcion = document.createElement("option");
    opcion.value = tiposUsuario[i];
    opcion.textContent = tiposUsuario[i];
    selectTipo.appendChild(opcion);
  }

  // Llenamos el select de regiones
  llenarSelectRegiones("campo-region");

  document.getElementById("campo-region").addEventListener("change", function () {
    actualizarComunas("campo-region", "campo-comuna");
  });

  // Revisamos si venimos a editar
  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id");
  var esEdicion = id !== null;

  document.getElementById("titulo-formulario").textContent = esEdicion ? "Editar usuario" : "Nuevo usuario";

  if (esEdicion) {
    var usuario = buscarUsuarioAdminPorId(id);
    if (usuario !== null) {
      document.getElementById("campo-run").value = usuario.run;
      document.getElementById("campo-run").readOnly = true;
      document.getElementById("campo-nombre-usuario").value = usuario.nombre;
      document.getElementById("campo-apellidos-usuario").value = usuario.apellidos;
      document.getElementById("campo-correo-usuario").value = usuario.correo;
      selectTipo.value = usuario.tipo;
      document.getElementById("campo-region").value = usuario.region;
      actualizarComunas("campo-region", "campo-comuna");
      document.getElementById("campo-comuna").value = usuario.comuna;
      document.getElementById("campo-direccion-usuario").value = usuario.direccion;
    }
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var runValido = validarRUN("campo-run");
    var nombreValido = validarNoVacio("campo-nombre-usuario", "El nombre") && validarLargoMaximo("campo-nombre-usuario", "El nombre", 50);
    var apellidosValidos = validarNoVacio("campo-apellidos-usuario", "El apellido") && validarLargoMaximo("campo-apellidos-usuario", "El apellido", 100);
    var correoValido = validarCorreo("campo-correo-usuario");
    var tipoValido = validarNoVacio("campo-tipo", "El tipo de usuario");
    var regionValida = validarNoVacio("campo-region", "La region");
    var comunaValida = validarNoVacio("campo-comuna", "La comuna");
    var direccionValida = validarNoVacio("campo-direccion-usuario", "La direccion") && validarLargoMaximo("campo-direccion-usuario", "La direccion", 300);

    var todoValido = runValido && nombreValido && apellidosValidos && correoValido &&
      tipoValido && regionValida && comunaValida && direccionValida;

    if (!todoValido) {
      return;
    }

    var usuarioAGuardar = {
      id: esEdicion ? Number(id) : null,
      run: document.getElementById("campo-run").value.trim().toUpperCase(),
      nombre: document.getElementById("campo-nombre-usuario").value.trim(),
      apellidos: document.getElementById("campo-apellidos-usuario").value.trim(),
      correo: document.getElementById("campo-correo-usuario").value.trim(),
      tipo: selectTipo.value,
      region: document.getElementById("campo-region").value,
      comuna: document.getElementById("campo-comuna").value,
      direccion: document.getElementById("campo-direccion-usuario").value.trim()
    };

    guardarUnUsuarioAdmin(usuarioAGuardar);
    window.location.href = "usuarios.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  dibujarTablaUsuarios();
  inicializarFormularioUsuario();

  var buscador = document.getElementById("buscador-usuarios");
  if (buscador !== null) {
    buscador.addEventListener("input", dibujarTablaUsuarios);
  }
});
