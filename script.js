$('document').ready(function () {
  // object creation
  function Snonk (x, y) {
    this.x = x;
    this.y = y;
  }
  var Apple = new Object();

  // general variables (oooh ahhhhh)!
  var score = 0;

  // Snonk variables?
  var snonk = new Snonk (200, 200);
  var directions = ['l', 'r', 'u', 'd'];
  var direction;

  // Apple variables!
  function ApplePlace () {
    Apple.x = Math.floor(Math.random() * 400);
    Apple.y = Math.floor(Math.random() * 400);
  }

  // canvas stuff owo
  var canvas = document.getElementById("snonk");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;

  // Snonk drawing uwu
  Snonk.prototype.draw = function () {
    ctx.strokeRect(this.x, this.y, 5, 5);
  }

  // Snonk direction stuff lol
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    } else if (event.key == "ArrowLeft" && direction != 'r') {
      direction = 'l';
    } else if (event.key == "ArrowRight" && direction != 'l') {
      direction = 'r';
    } else if (event.key == "ArrowUp" && direction != 'd') {
      direction = 'u';
    } else if (event.key == "ArrowDown" && direction != 'u') {
      direction = 'd';
    }
    event.preventDefault();
  });

  Snonk.prototype.move = function (dir) {
    if (dir == 'l') {
      this.x -= 2;
    } else if (dir == 'r') {
      this.x += 2;
    } else if (dir == 'u') {
      this.y -= 2;
    } else if (dir == 'd') {
      this.y += 2;
    }
  }

  // Snonk collision w/ wall detection
  Snonk.prototype.touchWall = function () {
    if (this.y <= 0 || this.y >= 395 || this.x <= 0 || this.x >= 395) {
      return (true);
    }
  }

  // Snonk collision w/ apple detection
  Snonk.prototype.snonkApple = function () {
    if (((this.x + 4 <= Apple.x + 8 || this.x <= Apple.x + 8) && (this.x >= Apple.x || this.x + 4 >= Apple.x)) && ((this.y + 4 <= Apple.y + 8 || this.y <= Apple.y) && (this.y >= Apple.y || this.y + 4 >= Apple.y))) {
      score++;
      console.log(score);
      ApplePlace();
    }
  }

  // Apple drawing (and enough with that weeb shit)
  function AppleDraw (x, y) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  // main game?
  ApplePlace();

  var Game = setInterval(function () {
    ctx.clearRect(0, 0, 400, 400);
    snonk.move(direction);
    snonk.snonkApple();
    if (snonk.touchWall() == true) {
      clearInterval(Game);
    }

    snonk.draw();
    AppleDraw(Apple.x, Apple.y);
  }, 16);
});
