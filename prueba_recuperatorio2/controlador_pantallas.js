class Controlador {
  constructor() {

    this.pantalla = 0;
    this.reproducido = false; // Control de sonido de fondo
    this.objJuego = null; // Instancia de la clase Juego

    // Variables para recursos multimedia
    this.fondos = [];
    this.tarzanImg = [];
    this.gorilaImg;
    this.cazadorImg;
    this.frutaImg;
    this.balaImg;
    this.corazonImg;

    // Variables para sonidos
    this.sonidoFondo;
    this.sonidoBoton;
    this.sonidoPierdeVida;
    this.sonidoPerdiste;
    this.sonidoMuereCazador;
    this.sonidoGanaste;
  }

  // Contenido multimedia (antes en preload)
  cargarRecursos() {
    this.fondos[0] = loadImage("data/menu.png");
    this.fondos[1] = loadImage("data/instrucciones.png");
    this.fondos[2] = loadImage("data/creditos.png");
    this.fondos[3] = loadImage("data/juego.png");
    this.fondos[4] = loadImage("data/perdiste.png");
    this.fondos[5] = loadImage("data/ganaste.png");
    this.tarzanImg[0] = loadImage("data/tarzanCargado.png");
    this.tarzanImg[1] = loadImage("data/tarzanSinCarga.png");
    this.gorilaImg = loadImage("data/gorila.png");
    this.cazadorImg = loadImage("data/cazador.png");
    this.frutaImg = loadImage("data/fruta.png");
    this.balaImg = loadImage("data/bala.png");
    this.corazonImg = loadImage("data/corazon.png");

    soundFormats('mp3');
    this.sonidoFondo = loadSound('data/sonidofondo.mp3');
    this.sonidoBoton = loadSound('data/sonidoboton.mp3');
    this.sonidoPierdeVida = loadSound('data/sonidopierdevida.mp3');
    this.sonidoPerdiste = loadSound('data/perdisteeljuego.mp3');
    this.sonidoMuereCazador = loadSound('data/sonidomuerecazador.mp3');
    this.sonidoGanaste = loadSound('data/ganasteeljuego.mp3');
  }

  // Iniciar un nuevo juego
  iniciarJuego() {
    this.objJuego = new Juego(5, this);
  }

  // control de pantallas
  dibujar() {
    switch (this.pantalla) {
    case 0:
      this.dibujarMenu();
      break;
    case 1:
      this.dibujarInstrucciones();
      break;
    case 2:
      this.dibujarCreditos();
      break;
    case 3:
      this.dibujarJuego();
      break;
    case 4:
      this.dibujarPerdiste();
      break;
    case 5:
      this.dibujarGanaste();
      break;
    }
  }


  manejarMouseClick() { //Manejo de botones en las pantallas.
    if (!this.reproducido) {
      this.sonidoFondo.loop();
      this.reproducido = true;
    }

    switch (this.pantalla) {
    case 0: // MENÚ
      if (this.detectarBoton(width / 2 - 75, 200, 150, 50)) {
        this.sonidoBoton.play();
        this.pantalla = 3; // JUEGO
        this.iniciarJuego();
      } else if (this.detectarBoton(width / 2 - 75, 280, 150, 50)) {
        this.sonidoBoton.play();
        this.pantalla = 1; // INSTRUCCIONES
      } else if (this.detectarBoton(width / 2 - 75, 360, 150, 50)) {
        this.sonidoBoton.play();
        this.pantalla = 2; // CREDITOS
      }
      break;
    case 1: // instrucciones
    case 2: // creditos
      if (this.detectarBoton(20, 20, 100, 40)) {
        this.sonidoBoton.play();
        this.pantalla = 0; // Volver al menú
      }
      break;
    case 4: // perdiste
    case 5: // ganaste
      if (this.detectarBoton(width / 2 - 75, 380, 150, 50)) {
        this.pantalla = 0; // volver al menu
        this.objJuego = null; // Limpia la instancia anterior
        this.sonidoFondo.loop();
      }
      break;
    }
  }


  manejarTeclaPresionada(keyCode) { //si la pantalla es 3 revisa en juego que teclas estan presionadas
    if (this.pantalla === 3 && this.objJuego) {
      this.objJuego.teclaPresionada(keyCode);
    }
  }


  dibujarMenu() {
    if (this.fondos[0]) {
      image(this.fondos[0], 0, 0, width, height);
    }
    this.dibujarBoton(width/2 - 75, 200, 150, 50, "Jugar");
    this.dibujarBoton(width/2 - 75, 280, 150, 50, "Instrucciones");
    this.dibujarBoton(width/2 - 75, 360, 150, 50, "Créditos");
  }

  dibujarInstrucciones() {
    if (this.fondos[1]) {
      image(this.fondos[1], 0, 0, width, height);
    }
    this.dibujarBoton(20, 20, 100, 40, "MENÚ");
  }

  dibujarCreditos() {
    if (this.fondos[2]) {
      image(this.fondos[2], 0, 0, width, height);
    }
    this.dibujarBoton(20, 20, 100, 40, "MENÚ");
  }

  dibujarJuego() {
    if (this.fondos[3]) {
      image(this.fondos[3], 0, 0, width, height);
    }

    // Lógica principal del juego
    if (this.objJuego) {
      this.objJuego.dibujar();
      
      this.objJuego.tarzan.mostrarVidas(this.corazonImg);

      if (this.objJuego.tarzan.vida <= 0) {
        this.sonidoFondo.stop();
        this.sonidoPerdiste.play();
        this.pantalla = 4; // perdiste
      } else if (this.objJuego.contarCazadoresMuertos() >= this.objJuego.cantidadCazadores) {
        this.sonidoGanaste.play();
        this.sonidoFondo.stop();
        this.pantalla = 5; // ganaste
      }
    }
  }

  dibujarPerdiste() {
    if (this.fondos[4]) {
      image(this.fondos[4], 0, 0, width, height);
    }
    this.dibujarBoton(width / 2 - 75, 380, 150, 50, "MENÚ");
  }

  dibujarGanaste() {
    if (this.fondos[5]) {
      image(this.fondos[5], 0, 0, width, height);
    }
    this.dibujarBoton(width / 2 - 75, 380, 150, 50, "MENÚ");
  }


  dibujarBoton(x, y, an, al, texto) {
    if (this.detectarBoton(x, y, an, al)) {
      fill(99, 106, 10);
    } else {
      fill(136, 195, 41);
    }
    rect(x, y, an, al, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(texto, x + an / 2, y + al / 2);
  }

  detectarBoton(x, y, an, al) {
    return mouseX > x && mouseX < x + an && mouseY > y && mouseY < y + al;
  }
}
