// Artículos del blog de Level-Up Gamer.
// Cada párrafo del texto es un elemento del arreglo "parrafos".

const articulos = [
  {
    id: 1,
    titulo: 'El origen de los "easter eggs" en los videojuegos',
    tituloCorto: 'Caso curioso #1: El origen de los "easter eggs"',
    resumen:
      '¿Sabías que el primer huevo de pascua digital se escondió en un juego de Atari para que su creador pudiera firmar su trabajo en secreto?',
    imagen: '/images/easter_egg.jpg',
    imagenLista: '/images/easter_egg.jpg',
    alt: 'Consola clásica',
    parrafos: [
      'En 1979, el programador Warren Robinett trabajaba para Atari en el desarrollo del juego "Adventure". En esa época, la empresa no permitía que los desarrolladores firmaran su trabajo, ya que consideraba que el mérito debía ser exclusivamente de la compañía.',
      'Robinett decidió esconder una sala secreta dentro del juego, accesible solo si el jugador encontraba un píxel gris casi invisible y lo llevaba hasta un punto específico del mapa. Al entrar a esa sala, aparecía el mensaje "Created by Warren Robinett", convirtiéndose en la primera firma oculta de la historia de los videojuegos.',
      'Cuando Atari descubrió el secreto, decidió no eliminarlo, y así nació el concepto de "easter egg" que hoy conocemos en prácticamente todos los videojuegos modernos.',
    ],
  },
  {
    id: 2,
    titulo: 'El primer "bug" documentado de la historia',
    tituloCorto: 'Caso curioso #2: El primer "bug" documentado',
    resumen:
      'La palabra "bug" para describir un error de software nació de un insecto real encontrado dentro de una computadora en 1947.',
    imagen: '/images/primer_bug_informatico.jpg',
    imagenLista: '/images/bug_informatico.jpg',
    alt: 'Computadora antigua',
    parrafos: [
      'El término "bug" para referirse a un error informático se popularizó gracias a un hecho ocurrido en 1947, en la Universidad de Harvard, mientras el equipo de la computadora Mark II realizaba pruebas de funcionamiento.',
      'Los ingenieros notaron que la máquina presentaba fallas intermitentes y, al revisar uno de sus relés electromecánicos, encontraron una polilla atrapada entre los contactos. El insecto fue retirado y pegado en el registro de mantenimiento con la anotación "First actual case of bug being found".',
      'Aunque la palabra "bug" ya se usaba de forma coloquial antes, este episodio ayudó a fijar el término dentro de la cultura informática, y hoy es parte fundamental del vocabulario de cualquier persona que trabaje con tecnología.',
    ],
  },
]

export default articulos