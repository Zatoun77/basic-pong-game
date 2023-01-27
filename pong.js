// the ball class
class Ball {
  constructor() {
    this.id = "ball";

    this.x = body.width / 2;
    this.y = body.height / 2;

    this.width = 64;
    this.height = 64;

    // random direction between -45 and 45 degrees
    this.side = 1;
    let angle = (1 / 2) * Math.PI * Math.random() - (1 / 4) * Math.PI;
    if (Math.random() > 0.5) {
      this.side = 0;
      angle = angle + Math.PI;
    }
    this.speed = speedBall;
    this.vx = this.speed * Math.cos(angle);
    this.vy = this.speed * Math.sin(angle);
  }
}
// the paddle class
class Paddle {
  constructor(id, x) {
    this.id = id;

    this.x = x - 5;
    this.y = 0 - 5;

    this.width = 24;
    this.height = 192;

    this.speed = speedPaddle;
  }
}

// place the objects in the page
function place_objects(objects) {
  for (let object of objects) {
    let element = document.getElementById(object.id);
    element.style.left = object.x + "px";
    element.style.top = object.y + "px";
  }
}

// update the game state
function update() {
  // move ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // check for collision with the top and bottom walls and update the score.
  if (ball.x < 0 || ball.x > body.width) {
    if (ball.x < 0) {
      scorePlayer2++;
      scoreBoard2.innerHTML = scorePlayer2;
    } else {
      scorePlayer1++;
      scoreBoard1.innerHTML = scorePlayer1;
    }
    ball = new Ball();
  }
  if (ball.y < 0 || ball.y + ball.height > body.height) {
    ball.vy = -ball.vy;
  }

  // check the collision between le ball area et the paddle area
  if (
    ball.x < paddle1.x + paddle1.width &&
    ball.x + ball.width > paddle1.x &&
    ball.y < paddle1.y + paddle1.height &&
    ball.y + ball.height > paddle1.y &&
    ball.side == 0
  ) {
    console.log("collision paddle1");
    ball.side = 1;
    ball.x = paddle1.x + paddle1.width;
    ball.vx = -ball.vx;
  }
  if (
    ball.x < paddle2.x + paddle2.width &&
    ball.x + ball.width > paddle2.x &&
    ball.y < paddle2.y + paddle2.height &&
    ball.y + ball.height > paddle2.y &&
    ball.side == 1
  ) {
    console.log("collision paddle2");
    ball.side = 0;
    ball.x = paddle2.x - ball.width;
    ball.vx = -ball.vx;
  }

  //move paddles
  if (buttons.p1_up && paddle1.y - 5 >= 0) {
    paddle1.y -= paddle1.speed;
  }
  if (buttons.p1_down && paddle1.y + paddle1.height + 5 <= body.height) {
    paddle1.y += paddle1.speed;
  }
  if (buttons.p2_up && paddle2.y - 5 >= 0) {
    paddle2.y -= paddle1.speed;
  }
  if (buttons.p2_down && paddle2.y + paddle2.height + 5 <= body.height) {
    paddle2.y += paddle1.speed;
  }

  place_objects([ball, paddle1, paddle2]);
}

let fps = 30;
let speedBall = 15;
let speedPaddle = 15;

// get the body dimensions
let body = document.body.getBoundingClientRect();

// create the objects
let ball;
let paddle1;
let paddle2;

// create the scores
let scoreBoard1;
let scorePlayer1 = 0;
let scoreBoard12;
let scorePlayer2 = 0;

let separator;

// wait all the elements to be loaded for start the game
window.onload = function () {
  init();
};

// initialize the game
function init() {
  // put the separator in the middle
  document.getElementById("separator").style.height = body.height + "px";
  document.body.style.height = "100%";

  ball = new Ball();
  paddle1 = new Paddle("paddle1", 15);
  paddle2 = new Paddle("paddle2", body.width - 20 - 15);

  scoreBoard1 = document.getElementById("score1");
  scoreBoard2 = document.getElementById("score2");

  place_objects([ball, paddle1, paddle2]);
  setInterval(update, 1000 / fps);
}

// track the player input
let buttons = {
  p1_up: false,
  p1_down: false,
  p2_up: false,
  p2_down: false,
};

function track_player_input(event) {
  if (event.type == "keydown") {
    switch (event.key) {
      case "z":
        buttons.p1_up = true;
        break;
      case "s":
        buttons.p1_down = true;
        break;
      case "ArrowUp":
        buttons.p2_up = true;
        break;
      case "ArrowDown":
        buttons.p2_down = true;
        break;
    }
  } else if (event.type == "keyup") {
    switch (event.key) {
      case "z":
        buttons.p1_up = false;
        break;
      case "s":
        buttons.p1_down = false;
        break;
      case "ArrowUp":
        buttons.p2_up = false;
        break;
      case "ArrowDown":
        buttons.p2_down = false;
        break;
    }
  }
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);
