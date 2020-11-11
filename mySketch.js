let settings;
let num = 110;
let xpos;
let ypos;
let degree = 0.4;
let posy = [];
let sizelist = [];
let sp = 0;
let sp2 = 0;
let col;

function setup() {
  colorMode(HSB, 100);
  noStroke();
  createCanvas(windowWidth, windowHeight);

  settings = {
    radius: (height * 2) / 5,
    speed: 0.001,
    colorChanging: 90,
    number: 150,
    text: "",
    //colour: [random(255), random(255), random(255)],
  };
  let gui = new dat.GUI();

  gui.add(settings, "radius", 50, 600, 3);
  gui.add(settings, "speed", 0.0002, 0.002, 0.0001);
  gui.add(settings, "colorChanging", 0, 100, 1);
  gui.add(settings, "number", 3, 200, 5);
  gui.add(settings, "text");
  //gui.addColor(settings, 'colour');

  for (let i = 0; i < settings.number; i++) {
    posy[i] = floor(random(0, height));
    sizelist[i] = floor(random((height / 590) * 2, (height / 590) * 11));
  }
}

function draw() {
  background(0, 0, 0, 28);
  if (!settings.text) {
    fill(255);
    ellipse(mouseX, mouseY, 0.25 * settings.radius);
    fill(0);
    ellipse(mouseX + 0.05 * settings.radius, mouseY - 5, 0.2 * settings.radius);
  }

  sp += settings.speed;

  for (let i = 0; i < settings.number; i++) {
    let ii = map(i, 0, settings.number - 1, 0, 100);
    ypos = posy[i];

    xpos =
      width / 2 +
      sin(2 * PI * sp + posy[i]) *
        sqrt(sq(settings.radius) - sq(abs(height / 2 - ypos)));

    let size = sizelist[i];
    push();
    stroke(255);
    noStroke();
    fill(255);
    //let the moon attract the stars
    if (
      abs(mouseX - xpos) <= settings.radius / 2 &&
      abs(mouseY - ypos) <= settings.radius / 2.5 &&
      !settings.text
    ) {
      let tarX = mouseX;
      let diffX = tarX - xpos;

      xpos += diffX * degree;
      let tarY = mouseY;
      let diffY = tarY - ypos;
      ypos += diffY * degree;
      //set the colors of the stars being attracted
      if (settings.colorChanging + 15 > 100) {
        col = settings.colorChanging + 15 - 100;
      } else {
        col = settings.colorChanging + 15;
      }
      star(xpos, ypos, 5, size, color(col, ii, 100), sp * 20);
    } else if (!settings.text) {
      star(
        xpos,
        ypos,
        5,
        size,
        color(settings.colorChanging, ii, 100),
        sp * 20
      );
    } else {
      text1(
        settings.text,
        xpos,
        ypos,
        size / 4,
        color(settings.colorChanging, ii, 100)
      );
    }

    pop();
  }
  fill(0);
  rect(0, 0, 20, 20);
  //noFill();
}

function star(x, y, num, size, color, rotat) {
  push();
  fill(color);
  noStroke();
  translate(x, y);
  rotate(rotat);
  let a = (PI * 2) / num;
  beginShape();
  for (i = 0; i < PI * 2; i += a) {
    let x1 = cos(i) * size;
    let y1 = sin(i) * size;
    vertex(x1, y1);

    x1 = (cos(i + a / 2) * size) / 1.8;
    y1 = (sin(i + a / 2) * size) / 1.8;
    vertex(x1, y1);
  }
  endShape(CLOSE);
  pop();
}
//Words don't look as good as stars
function text1(word, x, y, size, color) {
  push();
  fill(color);
  translate(x, y);
  scale(size);
  textAlign(CENTER);
  text(word, 0, 0);
  pop();
}
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}
