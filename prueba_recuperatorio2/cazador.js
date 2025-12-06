class Cazador { //aca dibujo 1x1, en JUEGO se ubica c/u al iniciarse el programa (crearcazador)
  constructor(posX, posY, cazadorImg, balaImg, sonidoMuereCazador) {   //metodo que me define las particularidades
    this.posX = posX;
    this.posY = posY;
    this.ancho = 50
      this.alto = 70
      this.cazadorImg = cazadorImg;
    this.balaImg = balaImg;
    this.sonidoMuereCazador = sonidoMuereCazador;
    this.vida = true;
    this.bala = new Bala(-100, -100, 4, this.balaImg);
    this.velocidad = random(1, 2);
    this.disparoRealizado = false; //solo dispara 1 vez x "ciclo"
    this.puntoDeDisparo = random(50, width - 50); //x donde va a disparar
  }

  dibujar() {
    if (this.vida) {
      // Usa this.cazadorImg en lugar de la global 'cazador'
      image(this.cazadorImg, this.posX, this.posY, this.ancho, this.alto);
    }
    this.bala.dibujar();
  }


  movimiento() {
    if (!this.vida) {
      return; // si está muerto no se mueve
    }
    if (this.posX > width) {
      this.reset();
    }
    this.posX += this.velocidad;
    this.intentarDisparar();
  }

  intentarDisparar() {

    if (!this.disparoRealizado && this.posX >= this.puntoDeDisparo && this.bala.activa === false) {
      // Crea la bala y le pasa la imagen
      this.bala = new Bala(this.posX + this.ancho/2, this.posY + this.alto, 4, this.balaImg);
      this.bala.disparar();
      this.disparoRealizado = true;
    }
  }

  //la reaparicion de los cazadores
  reset() {
    this.posX = -30;
    this.posY = random (height-240);
    this.velocidad = random(1, 2);
    this.vida = true;
    this.disparoRealizado = false; //reseteo para q dispare en el nuevo ciclo y no haya multiples disparos
    this.puntoDeDisparo = random(50, width - 50);
    this.bala.desactivar(); //q la bala previa no moleste?
  }


  matar() {
    this.vida = false;
    this.bala.desactivar();
    // Usa this.sonidoMuereCazador
    this.sonidoMuereCazador.play();
  }

  haTocadoLaBala(bala) {
    let centroX = this.posX + this.ancho / 2;
    let centroY = this.posY + this.alto / 2; //calculo la distancia desde el centro de la img del cazador

    if (bala.disparada && bala.activa && this.vida && dist(this.posX, this.posY, bala.posX, bala.posY) < 37.5) {
      this.matar();
      bala.desactivar(); //el radio de la bala es 12.5 y el del cazador aprox 25. si la dist es < a la suma de radios, hay colision
    }
  }
}
