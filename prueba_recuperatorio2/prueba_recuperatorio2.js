let controlador;

function preload() {
  controlador = new Controlador();
  controlador.cargarRecursos(); //imagenes y sonido
}

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background (0, 100, 0);
  controlador.dibujar();
}

function mousePressed() {
  controlador.manejarMouseClick();
}

function keyPressed() {
  controlador.manejarTeclaPresionada(keyCode); //revisa en controlador que teclas estan presionadas
}
