/* =========================================
   validaciones.js
   Funciones que revisan si los datos de un
   formulario son validos. Cada funcion
   devuelve true si esta correcto o false si
   hay un error (y muestra el mensaje).
   ========================================= */

// Lista de dominios de correo permitidos
var dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

// Muestra un mensaje de error debajo del campo indicado
function mostrarError(idCampo, mensaje) {
  var campo = document.getElementById(idCampo);
  var contenedor = campo.closest(".campo");
  var spanError = contenedor.querySelector(".mensaje-error");

  contenedor.classList.add("error");
  spanError.textContent = mensaje;
}

// Quita el mensaje de error de un campo (cuando ya quedo correcto)
function quitarError(idCampo) {
  var campo = document.getElementById(idCampo);
  var contenedor = campo.closest(".campo");
  var spanError = contenedor.querySelector(".mensaje-error");

  contenedor.classList.remove("error");
  spanError.textContent = "";
}

// Valida que un campo de texto no este vacio
function validarNoVacio(idCampo, nombreCampo) {
  var valor = document.getElementById(idCampo).value.trim();

  if (valor === "") {
    mostrarError(idCampo, nombreCampo + " es obligatorio.");
    return false;
  }

  quitarError(idCampo);
  return true;
}

// Valida que el texto no supere una cantidad maxima de caracteres
function validarLargoMaximo(idCampo, nombreCampo, maximo) {
  var valor = document.getElementById(idCampo).value.trim();

  if (valor.length > maximo) {
    mostrarError(idCampo, nombreCampo + " no puede tener mas de " + maximo + " caracteres.");
    return false;
  }

  quitarError(idCampo);
  return true;
}

// Valida el formato y dominio de un correo electronico
function validarCorreo(idCampo) {
  var valor = document.getElementById(idCampo).value.trim();

  if (valor === "") {
    mostrarError(idCampo, "El correo es obligatorio.");
    return false;
  }

  if (valor.length > 100) {
    mostrarError(idCampo, "El correo no puede tener mas de 100 caracteres.");
    return false;
  }

  // Expresion regular simple para revisar el formato de correo
  var formatoCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  if (!formatoCorrecto) {
    mostrarError(idCampo, "Ingresa un correo con formato valido.");
    return false;
  }

  // Sacamos el dominio (lo que viene despues del @)
  var dominio = valor.split("@")[1].toLowerCase();
  var dominioValido = false;

  for (var i = 0; i < dominiosPermitidos.length; i++) {
    if (dominio === dominiosPermitidos[i]) {
      dominioValido = true;
    }
  }

  if (!dominioValido) {
    mostrarError(idCampo, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    return false;
  }

  quitarError(idCampo);
  return true;
}

// Valida que la contrasena tenga entre 4 y 10 caracteres
function validarPassword(idCampo) {
  var valor = document.getElementById(idCampo).value;

  if (valor === "") {
    mostrarError(idCampo, "La contrasena es obligatoria.");
    return false;
  }

  if (valor.length < 4 || valor.length > 10) {
    mostrarError(idCampo, "La contrasena debe tener entre 4 y 10 caracteres.");
    return false;
  }

  quitarError(idCampo);
  return true;
}

// Valida que dos contrasenas sean iguales (confirmar contrasena)
function validarConfirmacionPassword(idClave, idConfirmacion) {
  var clave = document.getElementById(idClave).value;
  var confirmacion = document.getElementById(idConfirmacion).value;

  if (confirmacion === "") {
    mostrarError(idConfirmacion, "Debes confirmar la contrasena.");
    return false;
  }

  if (clave !== confirmacion) {
    mostrarError(idConfirmacion, "Las contrasenas no coinciden.");
    return false;
  }

  quitarError(idConfirmacion);
  return true;
}

// Valida un numero, revisando que no sea menor a un minimo
function validarNumeroMinimo(idCampo, nombreCampo, minimo) {
  var valor = document.getElementById(idCampo).value;

  if (valor === "") {
    mostrarError(idCampo, nombreCampo + " es obligatorio.");
    return false;
  }

  var numero = Number(valor);

  if (isNaN(numero) || numero < minimo) {
    mostrarError(idCampo, nombreCampo + " no puede ser menor a " + minimo + ".");
    return false;
  }

  quitarError(idCampo);
  return true;
}

// Valida un RUN chileno simple (sin puntos ni guion), largo entre 7 y 9
function validarRUN(idCampo) {
  var valor = document.getElementById(idCampo).value.trim().toUpperCase();

  if (valor === "") {
    mostrarError(idCampo, "El RUN es obligatorio.");
    return false;
  }

  if (valor.length < 7 || valor.length > 9) {
    mostrarError(idCampo, "El RUN debe tener entre 7 y 9 caracteres.");
    return false;
  }

  // Revisa que solo tenga numeros y, al final, opcionalmente una K
  var formatoCorrecto = /^[0-9]+[0-9K]$/.test(valor);

  if (!formatoCorrecto) {
    mostrarError(idCampo, "El RUN debe ingresarse sin puntos ni guion. Ejemplo: 19011022K");
    return false;
  }

  quitarError(idCampo);
  return true;
}
