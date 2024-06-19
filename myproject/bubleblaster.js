const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const HEIGHT = 500;
const WIDTH = 800;
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

const SHIP_RADIUS = 15;
const MID_X = WIDTH / 2;
const MID_Y = HEIGHT / 2;
let shipX = MID_X;
let shipY = MID_Y;

const SHIP_SPEED = 10;

// Ship drawing
function drawShip() {
    ctx.beginPath();
    ctx.moveTo(shipX, shipY - 20);
    ctx.lineTo(shipX - 10, shipY + 10);
    ctx.lineTo(shipX + 10, shipY + 10);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(shipX, shipY, SHIP_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
}

// Ship movement
function moveShip(event) {
    switch (event.key) {
        case 'ArrowUp':
            shipY -= SHIP_SPEED;
            break;
        case 'ArrowDown':
            shipY += SHIP_SPEED;
            break;
        case 'ArrowLeft':
            shipX -= SHIP_SPEED;
            break;
        case 'ArrowRight':
            shipX += SHIP_SPEED;
            break;
    }
}

document.addEventListener('keydown', moveShip);

const bubbleList = [];
const MIN_BUBBLE_RADIUS = 10;
const MAX_BUBBLE_RADIUS = 30;
const MAX_BUBBLE_SPEED = 5;
const GAP = 100;

// Create new bubble
function createBubble() {
    const x = WIDTH + GAP;
    const y = Math.floor(Math.random() * HEIGHT);
    const radius = Math.floor(Math.random() * (MAX_BUBBLE_RADIUS - MIN_BUBBLE_RADIUS + 1)) + MIN_BUBBLE_RADIUS;
    const speed = Math.random() * MAX_BUBBLE_SPEED + 1;
    const bubble = { x, y, radius, speed };
    bubbleList.push(bubble);
}

// Move bubbles
function moveBubbles() {
    for (let i = 0; i < bubbleList.length; i++) {
        bubbleList[i].x -= bubbleList[i].speed;
    }
}

// Clean up off-screen bubbles
function cleanUpBubbles() {
    for (let i = bubbleList.length - 1; i >= 0; i--) {
        if (bubbleList[i].x < -GAP) {
            bubbleList.splice(i, 1);
        }
    }
}

// Collision detection
function detectCollision() {
    let points = 0;
    for (let i = bubbleList.length - 1; i >= 0; i--) {
        const dx = shipX - bubbleList[i].x;
        const dy = shipY - bubbleList[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < SHIP_RADIUS + bubbleList[i].radius) {
            points += bubbleList[i].radius + bubbleList[i].speed;
            bubbleList.splice(i, 1);
        }
    }
    return points;
}

let score = 0;
const BUBBLE_CHANCE = 10;
const TIME_LIMIT = 60;
const BONUS_SCORE = 1000;
let bonus = 0;
let endTime = Date.now() + TIME_LIMIT * 1000;

function gameLoop() {
    if (Math.random() < 1 / BUBBLE_CHANCE) {
        createBubble();
    }
    moveBubbles();
    cleanUpBubbles();
    score += detectCollision();

    if (Math.floor(score / BONUS_SCORE) > bonus) {
        bonus++;
        endTime += TIME_LIMIT * 1000;
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawShip();
    ctx.fillText('TIME', 50, 30);
    ctx.fillText('SCORE', 150, 30);
    ctx.fillText(Math.ceil((endTime - Date.now()) / 1000), 50, 50);
    ctx.fillText(score, 150, 50);

    if (Date.now() < endTime) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'white';
        ctx.font = '30px Helvetica';
        ctx.fillText('GAME OVER', MID_X - 100, MID_Y);
        ctx.fillText('Score: ' + score, MID_X - 70, MID_Y + 30);
        ctx.fillText('Bonus Time: ' + bonus * TIME_LIMIT, MID_X - 100, MID_Y + 45);
    }
}

gameLoop();
