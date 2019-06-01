$('document').ready(function () {
  // object creation
  var Snonk = new Object();
  var Apple = new Object();

  // general variables (oooh ahhhhh)!
  var score = 0;

  // Snonk variables?
  Snonk.x = 200;
  Snonk.y = 200;
  Snonk.directions = ['l', 'r', 'u', 'd'];
  Snonk.direction;

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
  function SnonkDraw (x, y) {
    ctx.strokeRect(x, y, 5, 5);
  }

  // Snonk direction stuff lol
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    } else if (event.key == "ArrowLeft" && Snonk.direction != 'r') {
      Snonk.direction = 'l';
    } else if (event.key == "ArrowRight" && Snonk.direction != 'l') {
      Snonk.direction = 'r';
    } else if (event.key == "ArrowUp" && Snonk.direction != 'd') {
      Snonk.direction = 'u';
    } else if (event.key == "ArrowDown" && Snonk.direction != 'u') {
      Snonk.direction = 'd';
    }
    event.preventDefault();
  });

  function SnonkMove (dir) {
    if (dir == 'l') {
      Snonk.x -= 2;
    } else if (dir == 'r') {
      Snonk.x += 2;
    } else if (dir == 'u') {
      Snonk.y -= 2;
    } else if (dir == 'd') {
      Snonk.y += 2;
    }
  }

  // Snonk collision w/ wall detection
  function SnonkHitQuery (x, y) {
    if (y <= 0 || y >= 395 || x <= 0 || x >= 395) {
      return (true);
    }
  }

  // Snonk collision w/ apple detection
  function SnonkAppleQuery (x, y) {
    if (((x + 4 <= Apple.x + 8 || x <= Apple.x +8) && (x >= Apple.x || x + 4 >= Apple.x)) && ((y + 4 <= Apple.y + 8 || y <= Apple.y) && (y >= Apple.y || y + 4 >= Apple.y))) {
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
    SnonkMove(Snonk.direction);
    SnonkAppleQuery(Snonk.x, Snonk.y);
    if (SnonkHitQuery(Snonk.x, Snonk.y) == true) {
      clearInterval(Game);
    }

    SnonkDraw(Snonk.x, Snonk.y);
    AppleDraw(Apple.x, Apple.y);
  }, 16);
});
