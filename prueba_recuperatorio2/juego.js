class Juego {
  constructor(cantidadCazadores, controlador) {
    this.controlador = controlador; // Guarda la referencia al controlador
    this.cantidadCazadores = cantidadCazadores; // defino cuantos cazadores puedo tener
    this.crearTarzan();
    this.crearCazadores();
    this.crearGorilas();
  }

  dibujar() {
    this.tarzan.dibujar();

    for (let i=0; i < this.gorilas.length; i++) {
      this.gorilas[i].dibujar();

      if (this.gorilas[i].tarzanCerca(this.tarzan)) {
        this.tarzan.recargar();
      }
    }

    for (let i = 0; i < this.cazadores.length; i++) { // length guarda todos los cazadores del juego. devuelve 5, porque hay 5 cazadores.
      this.cazadores[i].movimiento();
      this.cazadores[i].dibujar();
    }

    this.controlarDisparosACazadores(); //me aseguro de que reciben el disparo
    this.controlarBalasDeCazadores(); //me aseguro de que tarzan recibe el disparo
  }

  crearCazadores() {
    this.cazadores = [];
    for (let i=0; i < this.cantidadCazadores; i++) {
      let posXInicial = -50 - (i*80);
      let posYInicial = random(50, height - 250);
      // Pasa los recursos necesarios al Cazador: imagen y sonido.
      this.cazadores[i] = new Cazador(posXInicial, posYInicial, this.controlador.cazadorImg, this.controlador.balaImg, this.controlador.sonidoMuereCazador);
    }
  }

  crearTarzan() {
    this.tarzan = new Tarzan( width/2, 400, this.controlador.tarzanImg, this.controlador.corazonImg, this.controlador.sonidoPierdeVida, this.controlador.frutaImg);
  }

  crearGorilas() {
    this.gorilas = [];
    // Pasa la imagen de Gorila al constructor
    this.gorilas[0] = new Gorila(50, 400, this.controlador.gorilaImg);
    this.gorilas[1] = new Gorila(width - 110, 400, this.controlador.gorilaImg);
  }


  teclaPresionada(keyCode) {
    this.tarzan.teclaPresionada(keyCode); //el juego le avisa a tarzan
  }

  controlarDisparosACazadores() {
    if (this.tarzan.haDisparadoBala()) {
      for (let i=0; i < this.cantidadCazadores; i++) {
        this.cazadores[i].haTocadoLaBala(this.tarzan.bala); //controla disparos y pregunta c la pos de la bala si cumple la condicion o no
      }
    }
  }

  controlarBalasDeCazadores() {
    for (let i = 0; i < this.cazadores.length; i++) {
      let bala = this.cazadores[i].bala;
      if (bala.disparada && bala.activa && dist(this.tarzan.posX + 25, this.tarzan.posY + 25, bala.posX, bala.posY) < 30) {
        this.tarzan.perderVida();
        bala.desactivar();
      }
    }
  }

  contarCazadoresMuertos() {
    let muertos = 0;
    for (let i = 0; i < this.cazadores.length; i++) {
      if (!this.cazadores[i].vida) {
        muertos++;
      }
    }
    return muertos;
  }
}
