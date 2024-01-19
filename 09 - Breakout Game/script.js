const showRulesBtn = document.getElementById("rules-btn");
const closeRulesBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Close - Open Rules
showRulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeRulesBtn.addEventListener("click", () => rules.classList.remove("show"));

const bricksRowCount = 9;
const brickColumnCount = 5;
let score = 0;

//Create Ball Props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 2,
  dx: 2,
  dy: -2,
};

//Create Paddle Props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 4,
  dx: 0,
};

//Draw Ball On Canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.moveTo(110, 75);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
//Draw Paddle On Canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.moveTo(110, 75);
  ctx.fill();
  ctx.closePath();
}

//Create Brick Props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//Create Bricks
const bricks = [];
for (let i = 0; i < bricksRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

//Draw Score On Canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//Draw Bricks On Canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? `#0095dd` : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

//Move Paddle on Canvas
function movePaddle() {
  paddle.x += paddle.dx;

  //Wall Detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//Move Ball on Canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall Collision (Right/Left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall Collision (TOP/BOTTOM)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //Paddle Collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //Brick Collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit Bottom Wall - LOSE
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

//Increase Score
function increaseScore() {
  score++;
  if (score % (bricksRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

//Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Draw Everything
function draw() {
  //Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

//Update Canvas Drawing and Animation
function update() {
  movePaddle();
  moveBall();

  // Draw Everything
  draw();

  requestAnimationFrame(update);
}
update();

//KeyDown event
function keyDown(e) {
  console.log(e);
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}
//KeyUp event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

//Keyboard Event Handler
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
