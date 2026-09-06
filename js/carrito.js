
function obtenerCarrito() {
  var datosGuardados = localStorage.getItem("carrito");
  if (datosGuardados === null) {
    return [];
  }
  return JSON.parse(datosGuardados);
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function agregarAlCarrito(codigo, cantidad) {
  var producto = buscarProductoPorCodigo(codigo);

  if (producto === null) {
    alert("Producto no encontrado.");
    return;
  }

  if (producto.stock <= 0) {
    alert("Este producto no tiene stock disponible.");
    return;
  }

  var carrito = obtenerCarrito();
  var yaExiste = false;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigo) {
      // ya esta en el carrito, sumamos la cantidad
      var nuevaCantidad = carrito[i].cantidad + cantidad;

      if (nuevaCantidad > producto.stock) {
        alert("Solo quedan " + producto.stock + " unidades disponibles.");
        return;
      }

      carrito[i].cantidad = nuevaCantidad;
      yaExiste = true;
    }
  }

  if (!yaExiste) {
    if (cantidad > producto.stock) {
      alert("Solo quedan " + producto.stock + " unidades disponibles.");
      return;
    }
    carrito.push({ codigo: codigo, cantidad: cantidad });
  }

  guardarCarrito(carrito);
  alert("Producto agregado al carrito.");
}

// Quita un producto completo del carrito
function quitarDelCarrito(codigo) {
  var carrito = obtenerCarrito();
  var nuevoCarrito = [];

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo !== codigo) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  guardarCarrito(nuevoCarrito);
}

// Cambia la cantidad de un producto ya agregado
function cambiarCantidadCarrito(codigo, nuevaCantidad) {
  var carrito = obtenerCarrito();

  if (nuevaCantidad <= 0) {
    quitarDelCarrito(codigo);
    return;
  }

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigo) {
      carrito[i].cantidad = nuevaCantidad;
    }
  }

  guardarCarrito(carrito);
}

// Vacia el carrito completo
function vaciarCarrito() {
  guardarCarrito([]);
}

// Suma cuantas unidades hay en total (para mostrar el numero en el header)
function contarUnidadesCarrito() {
  var carrito = obtenerCarrito();
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }
  return total;
}

// Calcula el total a pagar sumando precio x cantidad de cada producto
function calcularTotalCarrito() {
  var carrito = obtenerCarrito();
  var total = 0;

  for (var i = 0; i < carrito.length; i++) {
    var producto = buscarProductoPorCodigo(carrito[i].codigo);
    if (producto !== null) {
      total = total + (producto.precio * carrito[i].cantidad);
    }
  }

  return total;
}

// Actualiza el numerito del carrito que aparece en el header de todas las paginas
function actualizarContadorCarrito() {
  var elementos = document.querySelectorAll(".contador-carrito");
  var totalUnidades = contarUnidadesCarrito();

  for (var i = 0; i < elementos.length; i++) {
    elementos[i].textContent = totalUnidades;
  }
}

// Apenas carga la pagina, actualizamos el contador
document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
});
