//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diamentro = 15;
let raio = diamentro / 2;
//velocidade da bolinha
let veloncidadeXBolinha = 5;
let veloncidadeYBolinha = 5;

//variaveis da raquete
let xRaquete = 2;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;
let colidiu = false

//variaveis raquete oponente
let xRaqueteOponente = 588;
let yRaqueteOponente = 150;
let veloncidadeYOponente;
let chanceDeErrar = 0;

//placar jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  raquetada = loadSound("Extras/raquetada.mp3")
  trilha = loadSound("Extras/trilha.mp3")
  ponto = loadSound("Extras/ponto.mp3")
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}

function draw(){
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  //multiplayer();
  //verificaColisaoRaquete();//I made this one.
  verificaColisaoRaqueteExported(xRaquete, yRaquete);//I got this one from Github p5.collide2d
  verificaColisaoRaqueteExported(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diamentro);
}

function movimentaBolinha(){
  xBolinha += veloncidadeXBolinha
  yBolinha += veloncidadeYBolinha
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    veloncidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0) {
    veloncidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, wRaquete, hRaquete);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function movimentaRaqueteOponente(){
  veloncidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
  yRaqueteOponente += veloncidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function multiplayer(){
   if(keyIsDown(87)){
    yRaqueteOponente -= 10
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10
  }
}

function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
    veloncidadeXBolinha *= -1;
  }
}

function verificaColisaoRaqueteExported(x,y){
  colidiu = collideRectCircle(x, y,wRaquete,hRaquete,xBolinha,yBolinha,diamentro);
  if(colidiu){
    veloncidadeXBolinha *= -1; raquetada.play();
             }
} 

function incluiPlacar(){
  fill(255, 140, 0);
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  stroke(255)
  textSize(16);
  textAlign(CENTER);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1; 
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}