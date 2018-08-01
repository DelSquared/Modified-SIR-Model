var h=500,w=1100;
var a=0.1,b=1.75,g=0.005,k=0.5;
var dt=0.00001;

function ODE(So,Io,Ro,No){
  this.S=So;
  this.I=Io;
  this.R=Ro;
  this.N=No;
  this.Step = (dt) => {
    let q = 0;
    if (Math.random()>0.999999 && frameCount>=500) q=1
    let dN=g*this.N*dt + q*(0.1*this.N);
    let dS=(-a*this.S*this.I)*dt+dN;
    let dR=b*(this.I-k*this.N)*dt;
    let dI=-dS-dR+dN;
    this.N += dN;
    this.S += dS;
    this.I += dI;//+ q*Math.floor(0.3*Math.random()*this.n);
    this.R += dR;
  }
}

function setup() {
  createCanvas(w, h);
  background(0);
  strokeWeight(5);
  ode = new ODE(990,10,0,1000);
  vals = createDiv('');
  fr = createDiv('');
}

function draw() {
  stroke(255,255,255,100);
  point(w*frameCount*0.0001,h-0.1*(ode.N));
  stroke(255,0,0,100);
  point(w*frameCount*0.0001,h-0.1*(ode.I));
  stroke(0,255,0,100);
  point(w*frameCount*0.0001,h-0.1*(ode.R));
  for(i=0;i<200;i++){
    ode.Step(dt);
  }
  vals.html("S: "+Math.floor(ode.S)+"<br> I: "+Math.floor(ode.I)+"<br> R: "+Math.floor(ode.R));
  fr.html("frames: "+Math.floor(frameRate()));
}
