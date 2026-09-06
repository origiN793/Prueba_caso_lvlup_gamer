/* =========================================
   menu.js
   Muestra u oculta el menu de navegacion
   cuando se aprieta el boton en pantallas
   chicas (celulares).
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  var boton = document.getElementById("boton-menu");
  var menu = document.getElementById("menu-principal");

  if (boton !== null) {
    boton.addEventListener("click", function () {
      menu.classList.toggle("activo");
    });
  }

  // Pone el ano actual en el pie de pagina
  var elementoAno = document.getElementById("anio-actual");
  if (elementoAno !== null) {
    elementoAno.textContent = new Date().getFullYear();
  }
});
