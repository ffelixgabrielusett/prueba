class Tarzan {
  constructor(posX, posY, tarzanImgs, corazonImg, sonidoPierdeVida, frutaImg) {   //metodo que me define las particularidades
    this.posX = posX;
    this.posY = posY;
    this.tarzanImgs = tarzanImgs;
    this.corazonImg = corazonImg;
    this.frutaImg = frutaImg;
    this.sonidoPierdeVida = sonidoPierdeVida;
    this.vida = 3;
    this.ancho = 60;
    this.alto = 100;
    this.bala = new Bala(-100, -100, -5);
    this.puedeDisparar = true;
  }

  dibujar() { //aca es donde voy a cambiar la imagen de tarzan p poner el png
    this.bala.dibujar(); //para q la bala aparezca detras del pj

    if (this.puedeDisparar) {
      image(this.tarzanImgs[0], this.posX, this.posY- 50, 60, 100); //si cargó esta normal
    } else {
      image(this.tarzanImgs[1], this.posX, this.posY- 50, 60, 100); //si no tiene balas está rojo
    }
  }

  mostrarVidas(corazonImg) {
    for (let i = 0; i < this.vida; i++) {
      image(corazonImg, 20 + i * 40, 20, 35, 35);
    }
  }

  teclaPresionada(keyCode) {
    if (keyCode == LEFT_ARROW) {// tarzan se mueve izquierda
      this.moverIzq();
    } else if (keyCode == RIGHT_ARROW) {// tarzan se mueve drecha
      this.moverDer();
    } else if (keyCode == 32) { //32 = barra espaciadora.
      this.dispararBala(); //si es la barra dispara
    }
  }

  moverDer() {
    this.posX += 15;
  }

  moverIzq() {
    this.posX -= 15;
  }

  dispararBala() {
    if (this.puedeDisparar) { //solamente si recargó
      let posXBala = this.posX + this.ancho / 2;
      let posYBala = this.posY - this.alto;
      this.bala = new Bala(posXBala, posYBala, -5, this.frutaImg); 
      this.bala.disparar(); 
      this.puedeDisparar = false; //gastó la bala
    }
  }

  haDisparadoBala() {
    return this.bala.disparada && this.bala.activa;
  }

  recargar() {
    if (!this.puedeDisparar) { //sólo recarga si no tiene bala
      this.puedeDisparar = true; //ahora si puede disparar
      this.bala = new Bala(-100, -100, -5);
    }
  }

  perderVida() {
    this.sonidoPierdeVida.play();
    this.vida--;
  }
}
