$('document').ready(function () {
  // object creation
  var Block = function (x, y) {
    this.x = x;
    this.y = y;
  }

  var Asteroid = function () {
    this.asteroids = [];
  }
    
  Block.prototype.drawBlock = function () {
    var x = this.x;
    var y = this.y;
    ctx.strokeRect(x, y, 4, 4);
  }

  Block.prototype.drawAsteroid = function () {
    var x = this.x;
    var y = this.y;

    ctx.fillRect(x, y, 15, 15);
  }

  Block.prototype.samesies = function (otherBlock) {
    return (this.y === otherBlock.y && this.x === otherBlock.x);
  }

  var Snonk = function () {
    this.segments = [
      new Block(200, 200),
      new Block(200, 204),
      new Block(200, 208),
      new Block(200, 212),
      new Block(200, 216),
    ];
    this.direction = 'u';
    this.nextDirection = 'u';
  }

  var snonk = new Snonk;

  var Apple = new Object();

  // general variables (oooh ahhhhh)!
  var score = 0;
  var highscore = 0;
  var end = false;
  var passes = 0;

  // Snonk variables?
  var snonk = new Snonk (200, 200);
  var directions = ['l', 'r', 'u', 'd'];

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
    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i].drawBlock()
    }
  };

  // Snonk direction stuff lol
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    } else if (event.key == "ArrowLeft" && snonk.direction != 'r') {
      snonk.nextDirection = 'l';
    } else if (event.key == "ArrowRight" && snonk.direction != 'l') {
      snonk.nextDirection = 'r';
    } else if (event.key == "ArrowUp" && snonk.direction != 'd') {
      snonk.nextDirection = 'u';
    } else if (event.key == "ArrowDown" && snonk.direction != 'u') {
      snonk.nextDirection = 'd';
    }
    event.preventDefault();
  });

  // Set local high score
  var setHigh = function () {
    var element = document.getElementById("highscore");
    element.value = highscore;
  }
  
  // Snonk collision w/ wall detection
  Snonk.prototype.touchWall = function () {
    var head = this.segments[0];
    if (head.y <= 0 || head.y >= 395 || head.x <= 0 || head.x >= 395) {
      highscore = score;
      setHigh();
      clearInterval(Game);
    }
  }

  // Snonk collision w/ apple detection
  Snonk.prototype.snonkApple = function () {
    var head = this.segments[0];
    if (((head.x + 4 <= Apple.x + 4 || head.x <= Apple.x + 4) && (head.x >= Apple.x || head.x + 4 >= Apple.x)) && ((head.y + 4 <= Apple.y + 4 || head.y <= Apple.y + 4) && (head.y >= Apple.y || head.y + 4 >= Apple.y))) {
      ApplePlace();
      return (true);
    }
  }
  
  Snonk.prototype.move = function (dir) {
    var head = this.segments[0];
    var newHead;

    this.direction = this.nextDirection;

    if (dir == 'l') {
      newHead = new Block(head.x - 4, head.y);
    } else if (dir == 'r') {
      newHead = new Block(head.x + 4, head.y);
    } else if (dir == 'u') {
      newHead = new Block(head.x, head.y - 4);
    } else if (dir == 'd') {
      newHead = new Block(head.x, head.y + 4);
    }
    
    this.segments.unshift(newHead);
    
    if (passes <= 0) {
      this.segments.pop();
    } else {
      passes = passes - 1;
    }
    
    if (this.snonkApple()) {
      score++;
      passes = this.segments.length * 2;
      return;
    }
  }

  Snonk.prototype.contact = function () {
    var head = this.segments[0];
    var segment;
    for (var i = 1; i < this.segments.length; i++) {
      if (head.samesies(this.segments[i])) {
        clearInterval(Game);
        console.log("SAMESIES!!");
      }
    }
  }

  // Apple drawing (and enough with that weeb shit)
  function AppleDraw (x, y) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Drawing the score 'n stuff
  function drawScore () {
    if (score >= 1) {
      ctx.font = "20px Courier";
      ctx.fillStyle = "Black";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + score, 20, 20);
    }
  }
    

  // main game?
  ApplePlace();

  var Game = setInterval(function () {
    ctx.clearRect(0, 0, 400, 400);
    drawScore();
    snonk.move(snonk.direction);
    snonk.touchWall();
    snonk.contact();
    snonk.draw();
    AppleDraw(Apple.x, Apple.y);
  }, 30);
});
