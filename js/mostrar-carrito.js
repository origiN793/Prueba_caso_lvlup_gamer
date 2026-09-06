/* =========================================
   mostrar-carrito.js
   Dibuja los productos que estan dentro del
   carrito de compras y calcula el total.
   ========================================= */

function dibujarCarrito() {
  var contenedorLista = document.getElementById("lista-carrito");
  if (contenedorLista === null) {
    return;
  }

  var carrito = obtenerCarrito();
  var mensajeVacio = document.getElementById("carrito-vacio");

  if (carrito.length === 0) {
    contenedorLista.innerHTML = "";
    mensajeVacio.style.display = "block";
    document.getElementById("total-carrito").textContent = formatearPrecio(0);
    return;
  }

  mensajeVacio.style.display = "none";

  var htmlCompleto = "";

  for (var i = 0; i < carrito.length; i++) {
    var producto = buscarProductoPorCodigo(carrito[i].codigo);
    if (producto === null) {
      continue;
    }

    var subtotal = producto.precio * carrito[i].cantidad;

    htmlCompleto += "<div class='fila-carrito'>";
    htmlCompleto += "  <img src='" + producto.imagen + "' alt='" + producto.nombre + "'>";
    htmlCompleto += "  <div class='info-producto'>";
    htmlCompleto += "    <h3>" + producto.nombre + "</h3>";
    htmlCompleto += "    <p>" + formatearPrecio(producto.precio) + " c/u</p>";
    htmlCompleto += "    <a href='#' onclick=\"quitarProductoCarrito('" + carrito[i].codigo + "'); return false;\">Quitar</a>";
    htmlCompleto += "  </div>";
    htmlCompleto += "  <div class='selector-cantidad'>";
    htmlCompleto += "    <button onclick=\"restarCantidadCarrito('" + carrito[i].codigo + "', " + carrito[i].cantidad + ")\">-</button>";
    htmlCompleto += "    <input type='number' value='" + carrito[i].cantidad + "' readonly>";
    htmlCompleto += "    <button onclick=\"sumarCantidadCarrito('" + carrito[i].codigo + "', " + carrito[i].cantidad + ")\">+</button>";
    htmlCompleto += "  </div>";
    htmlCompleto += "  <strong>" + formatearPrecio(subtotal) + "</strong>";
    htmlCompleto += "</div>";
  }

  contenedorLista.innerHTML = htmlCompleto;
  document.getElementById("total-carrito").textContent = formatearPrecio(calcularTotalCarrito());
}

function quitarProductoCarrito(codigo) {
  quitarDelCarrito(codigo);
  dibujarCarrito();
}

function sumarCantidadCarrito(codigo, cantidadActual) {
  cambiarCantidadCarrito(codigo, cantidadActual + 1);
  dibujarCarrito();
}

function restarCantidadCarrito(codigo, cantidadActual) {
  cambiarCantidadCarrito(codigo, cantidadActual - 1);
  dibujarCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
  dibujarCarrito();

  var botonVaciar = document.getElementById("boton-vaciar-carrito");
  if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", function () {
      vaciarCarrito();
      dibujarCarrito();
    });
  }
});
