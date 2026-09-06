/* =========================================
   admin-productos.js
   Dibuja la tabla de productos y maneja el
   formulario de crear/editar producto.
   ========================================= */

function dibujarTablaProductos() {
  var cuerpoTabla = document.getElementById("cuerpo-tabla-productos");
  if (cuerpoTabla === null) {
    return;
  }

  var textoBusqueda = document.getElementById("buscador-productos").value.toLowerCase();
  var lista = obtenerProductosAdmin();
  var html = "";

  for (var i = 0; i < lista.length; i++) {
    var producto = lista[i];
    var coincide = producto.nombre.toLowerCase().indexOf(textoBusqueda) !== -1 ||
      producto.codigo.toLowerCase().indexOf(textoBusqueda) !== -1;

    if (!coincide) {
      continue;
    }

    var avisoStock = "";
    if (producto.stock <= producto.stockCritico) {
      avisoStock = " <span class='aviso-stock'>Critico</span>";
    }

    html += "<tr>";
    html += "  <td><img src='" + producto.imagen + "' alt='" + producto.nombre + "'></td>";
    html += "  <td>" + producto.codigo + "</td>";
    html += "  <td>" + producto.nombre + "</td>";
    html += "  <td>" + producto.categoria + "</td>";
    html += "  <td>" + formatearPrecio(producto.precio) + "</td>";
    html += "  <td>" + producto.stock + avisoStock + "</td>";
    html += "  <td class='acciones-tabla'>";
    html += "    <a href='producto-form.html?id=" + producto.id + "'>Editar</a>";
    html += "    <button class='eliminar' onclick='eliminarProductoDesdeTabla(" + producto.id + ")'>Eliminar</button>";
    html += "  </td>";
    html += "</tr>";
  }

  if (html === "") {
    html = "<tr><td colspan='7' style='text-align:center;'>No hay productos que coincidan.</td></tr>";
  }

  cuerpoTabla.innerHTML = html;
}

function eliminarProductoDesdeTabla(id) {
  var confirmacion = confirm("Seguro que quieres eliminar este producto?");
  if (confirmacion) {
    eliminarProductoAdmin(id);
    dibujarTablaProductos();
  }
}

// ---------- Formulario de nuevo/editar producto ----------
function inicializarFormularioProducto() {
  var formulario = document.getElementById("formulario-producto");
  if (formulario === null) {
    return;
  }

  // Llenamos el select de categorias
  var selectCategoria = document.getElementById("campo-categoria");
  for (var i = 0; i < categorias.length; i++) {
    var opcion = document.createElement("option");
    opcion.value = categorias[i];
    opcion.textContent = categorias[i];
    selectCategoria.appendChild(opcion);
  }

  // Revisamos si venimos a editar (viene un id en la URL)
  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id");
  var esEdicion = id !== null;

  document.getElementById("titulo-formulario").textContent = esEdicion ? "Editar producto" : "Nuevo producto";

  if (esEdicion) {
    var producto = buscarProductoAdminPorId(id);
    if (producto !== null) {
      document.getElementById("campo-codigo").value = producto.codigo;
      document.getElementById("campo-codigo").readOnly = true;
      document.getElementById("campo-nombre").value = producto.nombre;
      document.getElementById("campo-descripcion").value = producto.descripcion;
      document.getElementById("campo-precio").value = producto.precio;
      document.getElementById("campo-stock").value = producto.stock;
      document.getElementById("campo-stock-critico").value = producto.stockCritico;
      selectCategoria.value = producto.categoria;
      document.getElementById("campo-imagen").value = producto.imagen;
    }
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var codigoValido = validarNoVacio("campo-codigo", "El codigo");
    var nombreValido = validarNoVacio("campo-nombre", "El nombre") && validarLargoMaximo("campo-nombre", "El nombre", 100);
    var precioValido = validarNumeroMinimo("campo-precio", "El precio", 0);
    var stockValido = validarNumeroMinimo("campo-stock", "El stock", 0);
    var categoriaValida = validarNoVacio("campo-categoria", "La categoria");

    if (!(codigoValido && nombreValido && precioValido && stockValido && categoriaValida)) {
      return;
    }

    var productoAGuardar = {
      id: esEdicion ? Number(id) : null,
      codigo: document.getElementById("campo-codigo").value.trim(),
      nombre: document.getElementById("campo-nombre").value.trim(),
      descripcion: document.getElementById("campo-descripcion").value.trim(),
      precio: Number(document.getElementById("campo-precio").value),
      stock: Number(document.getElementById("campo-stock").value),
      stockCritico: Number(document.getElementById("campo-stock-critico").value) || 0,
      categoria: selectCategoria.value,
      imagen: document.getElementById("campo-imagen").value.trim() || "../images/example_image.jpg"
    };

    guardarUnProductoAdmin(productoAGuardar);
    window.location.href = "productos.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  dibujarTablaProductos();
  inicializarFormularioProducto();

  var buscador = document.getElementById("buscador-productos");
  if (buscador !== null) {
    buscador.addEventListener("input", dibujarTablaProductos);
  }
});
