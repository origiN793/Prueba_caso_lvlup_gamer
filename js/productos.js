/* =========================================
   productos.js
   Aqui guardamos los productos de la tienda
   en un arreglo. Cada producto es un objeto
   con sus datos (esto despues se reemplazaria
   por una base de datos real).
   ========================================= */

var productos = [
  {
    codigo: "JM001",
    nombre: "Catan",
    descripcion: "Juego de mesa de estrategia y comercio para 3 a 4 jugadores.",
    precio: 29990,
    stock: 12,
    stockCritico: 3,
    categoria: "Juegos de Mesa",
    imagen: "images/catan.jpg"
  },
  {
    codigo: "JM002",
    nombre: "Carcassonne",
    descripcion: "Construye ciudades y caminos en este clasico juego de fichas.",
    precio: 24990,
    stock: 8,
    stockCritico: 2,
    categoria: "Juegos de Mesa",
    imagen: "images/Carcassonne.jpg"
  },
  {
    codigo: "AC001",
    nombre: "Control Inalambrico Xbox",
    descripcion: "Control oficial con conectividad Bluetooth.",
    precio: 59990,
    stock: 15,
    stockCritico: 4,
    categoria: "Accesorios",
    imagen: "images/control_Xbox.jpg"
  },
  {
    codigo: "AC002",
    nombre: "Audifonos Gamer HyperX",
    descripcion: "Sonido envolvente y microfono desmontable.",
    precio: 79990,
    stock: 6,
    stockCritico: 2,
    categoria: "Accesorios",
    imagen: "images/Audifonos_Gamer_HyperX.jpg"
  },
  {
    codigo: "CO001",
    nombre: "PlayStation 5",
    descripcion: "Consola de nueva generacion con SSD ultra rapido.",
    precio: 549990,
    stock: 4,
    stockCritico: 2,
    categoria: "Consolas",
    imagen: "images/PlayStation_5.jpg"
  },
  {
    codigo: "CO002",
    nombre: "Nintendo Switch OLED",
    descripcion: "Pantalla OLED de 7 pulgadas, modo portatil y modo TV.",
    precio: 329990,
    stock: 7,
    stockCritico: 2,
    categoria: "Consolas",
    imagen: "images/Nintendo_Switch_OLED.jpg"
  },
  {
    codigo: "CG001",
    nombre: "Notebook Gamer ASUS TUF",
    descripcion: "Procesador Ryzen 7 y tarjeta grafica RTX.",
    precio: 899990,
    stock: 3,
    stockCritico: 1,
    categoria: "Computadores",
    imagen: "images/Notebook_Gamer_ASUS_TUF.jpg"
  },
  {
    codigo: "SG001",
    nombre: "Silla Gamer",
    descripcion: "Ergonomia premium y soporte lumbar ajustable.",
    precio: 349990,
    stock: 5,
    stockCritico: 2,
    categoria: "Sillas Gamers",
    imagen: "images/Silla_Gamer.jpg"
  },
  {
    codigo: "MS001",
    nombre: "Mouse Gamer Logitech G502",
    descripcion: "Sensor optico de alta precision y 11 botones.",
    precio: 39990,
    stock: 20,
    stockCritico: 5,
    categoria: "Accesorios",
    imagen: "images/Mouse_Gamer_Logitech_G502.jpg"
  },
  {
    codigo: "MO001",
    nombre: "Monitor Gamer LG 27 pulgadas",
    descripcion: "Panel IPS 165Hz y 1ms de respuesta.",
    precio: 289990,
    stock: 6,
    stockCritico: 2,
    categoria: "Monitores",
    imagen: "images/Monitor_Gamer_LG_27_pulgadas.jpg"
  },
  {
    codigo: "PP001",
    nombre: "Alfombrilla XL RGB",
    descripcion: "Mousepad extendido con iluminacion RGB.",
    precio: 19990,
    stock: 0,
    stockCritico: 3,
    categoria: "Accesorios",
    imagen: "images/Alfombrilla_XL_RGB.jpg"
  },
  {
    codigo: "PC001",
    nombre: "Polera Gamer Level-Up",
    descripcion: "Polera oficial de la comunidad Level-Up.",
    precio: 14990,
    stock: 25,
    stockCritico: 5,
    categoria: "Poleras Personalizadas",
    imagen: "images/Polera_Gamer_Level-Up.jpg"
  }
];

// Esta funcion recibe un numero y lo transforma en texto de precio chileno
// Ejemplo: formatearPrecio(29990) devuelve "$29.990"
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

// Busca un producto dentro del arreglo usando su codigo
function buscarProductoPorCodigo(codigo) {
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo === codigo) {
      return productos[i];
    }
  }
  return null;
}
