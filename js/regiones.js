/* =========================================
   regiones.js
   Arreglo con region y sus comunas, para
   llenar los selects del formulario de
   registro y del mantenedor de usuarios.
   ========================================= */

var regiones = [
  {
    nombre: "Region Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Maipu", "Melipilla"]
  },
  {
    nombre: "Region de Valparaiso",
    comunas: ["Valparaiso", "Vina del Mar", "Quilpue", "San Antonio"]
  },
  {
    nombre: "Region del Maule",
    comunas: ["Talca", "Curico", "Linares", "Longavi"]
  },
  {
    nombre: "Region del Biobio",
    comunas: ["Concepcion", "Talcahuano", "Los Angeles"]
  },
  {
    nombre: "Region de Nuble",
    comunas: ["Chillan", "San Carlos", "Bulnes"]
  },
  {
    nombre: "Region de la Araucania",
    comunas: ["Temuco", "Villarrica", "Angol"]
  }
];

// Llena el select de regiones con las opciones del arreglo de arriba
function llenarSelectRegiones(idSelectRegion) {
  var selectRegion = document.getElementById(idSelectRegion);
  selectRegion.innerHTML = "<option value=''>-- Seleccione la region --</option>";

  for (var i = 0; i < regiones.length; i++) {
    var opcion = document.createElement("option");
    opcion.value = regiones[i].nombre;
    opcion.textContent = regiones[i].nombre;
    selectRegion.appendChild(opcion);
  }
}

// Cuando cambia la region seleccionada, llena las comunas correspondientes
function actualizarComunas(idSelectRegion, idSelectComuna) {
  var selectRegion = document.getElementById(idSelectRegion);
  var selectComuna = document.getElementById(idSelectComuna);
  var regionElegida = selectRegion.value;

  selectComuna.innerHTML = "<option value=''>-- Seleccione la comuna --</option>";

  for (var i = 0; i < regiones.length; i++) {
    if (regiones[i].nombre === regionElegida) {
      for (var j = 0; j < regiones[i].comunas.length; j++) {
        var opcion = document.createElement("option");
        opcion.value = regiones[i].comunas[j];
        opcion.textContent = regiones[i].comunas[j];
        selectComuna.appendChild(opcion);
      }
    }
  }
}
