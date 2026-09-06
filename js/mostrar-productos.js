/* =========================================
   mostrar-productos.js
   Dibuja las tarjetas de producto en la
   pantalla, recorriendo el arreglo de
   productos con un for.
   ========================================= */

// Genera el HTML de una sola tarjeta de producto
function crearTarjetaProducto(producto) {
  var etiquetaStock = "";

  if (producto.stock <= 0) {
    etiquetaStock = "<span class='aviso-stock stock-bajo'>Sin stock</span>";
  } else if (producto.stock <= producto.stockCritico) {
    etiquetaStock = "<span class='aviso-stock stock-bajo'>Quedan " + producto.stock + "</span>";
  } else {
    etiquetaStock = "<span class='aviso-stock stock-ok'>Disponible</span>";
  }

  var textoBoton = producto.stock <= 0 ? "Agotado" : "Anadir";
  var deshabilitado = producto.stock <= 0 ? "disabled" : "";

  var html = "";
  html += "<div class='tarjeta-producto'>";
  html += "  <a href='detalle-producto.html?codigo=" + producto.codigo + "'>";
  html += "    <img src='" + producto.imagen + "' alt='" + producto.nombre + "' width='180' height='120'>";
  html += "  </a>";
  html += "  <span class='categoria'>" + producto.categoria + "</span>";
  html += "  <h3><a href='detalle-producto.html?codigo=" + producto.codigo + "'>" + producto.nombre + "</a></h3>";
  html += "  " + etiquetaStock;
  html += "  <p class='precio'>" + formatearPrecio(producto.precio) + "</p>";
  html += "  <button class='boton' onclick=\"agregarAlCarrito('" + producto.codigo + "', 1)\" " + deshabilitado + ">" + textoBoton + "</button>";
  html += "</div>";

  return html;
}

// Dibuja una lista de productos dentro de un elemento contenedor
function dibujarListaProductos(idContenedor, listaProductos) {
  var contenedor = document.getElementById(idContenedor);

  if (contenedor === null) {
    return;
  }

  if (listaProductos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  var htmlCompleto = "";
  for (var i = 0; i < listaProductos.length; i++) {
    htmlCompleto += crearTarjetaProducto(listaProductos[i]);
  }

  contenedor.innerHTML = htmlCompleto;
}

// ---------- Pagina de inicio: muestra los primeros 6 productos ----------
function mostrarProductosDestacados() {
  var contenedor = document.getElementById("productos-destacados");
  if (contenedor === null) {
    return;
  }

  var destacados = [];
  for (var i = 0; i < productos.length && i < 6; i++) {
    destacados.push(productos[i]);
  }

  dibujarListaProductos("productos-destacados", destacados);
}

// ---------- Pagina de productos: muestra todos, con filtros ----------
function mostrarTodosLosProductos() {
  var contenedor = document.getElementById("lista-productos-completa");
  if (contenedor === null) {
    return;
  }

  // Llenamos el select de categorias sin repetir
  var selectCategoria = document.getElementById("filtro-categoria");
  var categoriasAgregadas = [];

  for (var i = 0; i < productos.length; i++) {
    var categoriaActual = productos[i].categoria;
    if (categoriasAgregadas.indexOf(categoriaActual) === -1) {
      categoriasAgregadas.push(categoriaActual);
      var opcion = document.createElement("option");
      opcion.value = categoriaActual;
      opcion.textContent = categoriaActual;
      selectCategoria.appendChild(opcion);
    }
  }

  function aplicarFiltro() {
    var categoriaElegida = selectCategoria.value;
    var textoBusqueda = document.getElementById("filtro-busqueda").value.toLowerCase();
    var resultado = [];

    for (var i = 0; i < productos.length; i++) {
      var coincideCategoria = categoriaElegida === "" || productos[i].categoria === categoriaElegida;
      var coincideTexto = productos[i].nombre.toLowerCase().indexOf(textoBusqueda) !== -1;

      if (coincideCategoria && coincideTexto) {
        resultado.push(productos[i]);
      }
    }

    dibujarListaProductos("lista-productos-completa", resultado);
  }

  selectCategoria.addEventListener("change", aplicarFiltro);
  document.getElementById("filtro-busqueda").addEventListener("input", aplicarFiltro);

  aplicarFiltro();
}

// ---------- Pagina de detalle de producto ----------
function mostrarDetalleProducto() {
  var contenedor = document.getElementById("detalle-producto");
  if (contenedor === null) {
    return;
  }

  // Sacamos el codigo del producto desde la URL (?codigo=XXX)
  var parametros = new URLSearchParams(window.location.search);
  var codigo = parametros.get("codigo");
  var producto = buscarProductoPorCodigo(codigo);

  if (producto === null) {
    producto = productos[0];
  }

  document.title = producto.nombre + " - Level-Up Gamer";
  document.getElementById("detalle-imagen").src = producto.imagen;
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  document.getElementById("detalle-categoria").textContent = producto.categoria;
  document.getElementById("detalle-precio").textContent = formatearPrecio(producto.precio);
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;

  var avisoStock = document.getElementById("detalle-stock");
  var inputCantidad = document.getElementById("detalle-cantidad");
  var botonAgregar = document.getElementById("boton-agregar-detalle");

  if (producto.stock <= 0) {
    avisoStock.innerHTML = "<span class='aviso-stock stock-bajo'>Sin stock disponible</span>";
    botonAgregar.disabled = true;
    botonAgregar.textContent = "Agotado";
  } else if (producto.stock <= producto.stockCritico) {
    avisoStock.innerHTML = "<span class='aviso-stock stock-bajo'>Quedan solo " + producto.stock + " unidades</span>";
  } else {
    avisoStock.innerHTML = "<span class='aviso-stock stock-ok'>Stock disponible</span>";
  }

  document.getElementById("boton-restar").addEventListener("click", function () {
    var valorActual = Number(inputCantidad.value);
    if (valorActual > 1) {
      inputCantidad.value = valorActual - 1;
    }
  });

  document.getElementById("boton-sumar").addEventListener("click", function () {
    var valorActual = Number(inputCantidad.value);
    if (valorActual < producto.stock) {
      inputCantidad.value = valorActual + 1;
    }
  });

  botonAgregar.addEventListener("click", function () {
    var cantidad = Number(inputCantidad.value);
    agregarAlCarrito(producto.codigo, cantidad);
  });

  // Productos relacionados: misma categoria, distinto codigo
  var relacionados = [];
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].categoria === producto.categoria && productos[i].codigo !== producto.codigo) {
      relacionados.push(productos[i]);
    }
  }
  dibujarListaProductos("productos-relacionados", relacionados);
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarProductosDestacados();
  mostrarTodosLosProductos();
  mostrarDetalleProducto();
});
