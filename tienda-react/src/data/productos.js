const productos = [
  { codigo: 'JM001', nombre: 'Catan', descripcion: 'Juego de mesa de estrategia y comercio para 3 a 4 jugadores.', categoria: 'Juegos de Mesa', precio: 29990, stock: 12, stockCritico: 3, imagen: '/images/catan.jpg' },
  { codigo: 'JM002', nombre: 'Carcassonne', descripcion: 'Construye ciudades y caminos en este clásico juego de fichas.', categoria: 'Juegos de Mesa', precio: 24990, stock: 8, stockCritico: 2, imagen: '/images/Carcassonne.jpg' },
  { codigo: 'AC001', nombre: 'Control Inalámbrico Xbox', descripcion: 'Control oficial con conectividad Bluetooth.', categoria: 'Accesorios', precio: 59990, stock: 15, stockCritico: 4, imagen: '/images/control_Xbox.jpg' },
  { codigo: 'AC002', nombre: 'Audífonos Gamer HyperX', descripcion: 'Sonido envolvente y micrófono desmontable.', categoria: 'Accesorios', precio: 79990, stock: 6, stockCritico: 2, imagen: '/images/Audifonos_Gamer_HyperX.jpg' },
  { codigo: 'CO001', nombre: 'PlayStation 5', descripcion: 'Consola de nueva generación con SSD ultra rápido.', categoria: 'Consolas', precio: 549990, stock: 4, stockCritico: 2, imagen: '/images/PlayStation_5.jpg' },
  { codigo: 'CO002', nombre: 'Nintendo Switch OLED', descripcion: 'Pantalla OLED de 7 pulgadas, modo portátil y modo TV.', categoria: 'Consolas', precio: 329990, stock: 7, stockCritico: 2, imagen: '/images/Nintendo_Switch_OLED.jpg' },
  { codigo: 'CG001', nombre: 'Notebook Gamer ASUS TUF', descripcion: 'Procesador Ryzen 7 y tarjeta gráfica RTX.', categoria: 'Computadores', precio: 899990, stock: 3, stockCritico: 1, imagen: '/images/Notebook_Gamer_ASUS_TUF.jpg' },
  { codigo: 'SG001', nombre: 'Silla Gamer', descripcion: 'Ergonomía premium y soporte lumbar ajustable.', categoria: 'Sillas Gamers', precio: 349990, stock: 5, stockCritico: 2, imagen: '/images/Silla_Gamer.jpg' },
  { codigo: 'MS001', nombre: 'Mouse Gamer Logitech G502', descripcion: 'Sensor óptico de alta precisión y 11 botones.', categoria: 'Accesorios', precio: 39990, stock: 20, stockCritico: 5, imagen: '/images/Mouse_Gamer_Logitech_G502.jpg' },
  { codigo: 'MO001', nombre: 'Monitor Gamer LG 27 pulgadas', descripcion: 'Panel IPS 165Hz y 1ms de respuesta.', categoria: 'Monitores', precio: 289990, stock: 6, stockCritico: 2, imagen: '/images/Monitor_Gamer_LG_27_pulgadas.jpg' },
  { codigo: 'PP001', nombre: 'Alfombrilla XL RGB', descripcion: 'Mousepad extendido con iluminación RGB.', categoria: 'Accesorios', precio: 19990, stock: 0, stockCritico: 3, imagen: '/images/Alfombrilla_XL_RGB.jpg' },
  { codigo: 'PC001', nombre: 'Polera Gamer Level-Up', descripcion: 'Polera oficial de la comunidad Level-Up.', categoria: 'Poleras Personalizadas', precio: 14990, stock: 25, stockCritico: 5, imagen: '/images/Polera_Gamer_Level-Up.jpg' },
]

export default productos