class Gorila {
  constructor(posX, posY, gorilaImg) {
    this.posX = posX;
    this.posY = posY;
    this.gorilaImg = gorilaImg;
  }

  dibujar() {
    image(this.gorilaImg, this.posX - 30, this.posY - 70, 120, 160);
  }

  tarzanCerca(tarzan) {
    let distancia = dist(this.posX + 60/2, this.posY + 60/2, tarzan.posX, tarzan.posY);
    return distancia < 120;
  }
}
