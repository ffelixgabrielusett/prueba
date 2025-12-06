class Bala {
  constructor(posX = -100, posY = -100, velY = -5, img = null)  {  //metodo que me define las particularidades
    this.posX = posX;
    this.posY = posY;
    this.velY = velY; //si es negativa sube, si es positiva baja
    this.disparada = false;
    this.activa = true; //para marcar la bala q ya cumplio su ciclo
    this.img = img;
  }

   dibujar() {
    if (this.disparada && this.activa) {
      if (this.img){
        image(this.img, this.posX - 12.5, this.posY - 12.5, 40, 40);
      }
      this.mover();
    }
    if (this.posY < -25 || this.posY > height + 25) {
      this.activa = false;
    } //si se va de la pantalla se desactiva
  }

  mover() {
    this.posY += this.velY;
  }

  disparar() {
    this.disparada = true;
  }

  desactivar() {
    this.disparada = false;
    this.activa = false;
    this.posX = -100;
    this.posY = -100;
  }
}
