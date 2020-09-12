import { generateShip, generateFaction, Randomizer } from "starshipwright";
import { createSprites, calculateSpriteFinalState } from "./voronoi";
import { trimCanvas } from "./utils";

function hitEffect(canvas) {
  const destCanvas = document.createElement("canvas");
  const { width, height } = canvas;
  destCanvas.width = width;
  destCanvas.height = height;
  const ctx = canvas.getContext("2d");
  const destCtx = destCanvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const { length } = data;
  for (let i = 0; i < length; i += 4) {
    const r = data[i + 0];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i + 0] = 255 - (0.393 * r + 0.769 * g + 0.189 * b);
    data[i + 1] = 255 - (0.349 * r + 0.686 * g + 0.168 * b);
    data[i + 2] = 255 - (0.272 * r + 0.534 * g + 0.131 * b);
  }
  destCtx.putImageData(imageData, 0, 0);
  return destCanvas;
}

function generateShield(level) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(shipWidth * 2);
  canvas.height = Math.floor(shipHeight * 2);
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2 - 15;
  const centerY = canvas.height / 2 - 30;
  ctx.setTransform(1.5, 0, 0, (shipHeight / shipWidth) * 1.5, 0, 0);
  const grad = ctx.createRadialGradient(
    centerX,
    centerY,
    10,
    centerX,
    centerY,
    30 - level * 3
  );
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.7, "blue");
  grad.addColorStop(1, "cyan");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, shipWidth / 2, 0, 7);
  ctx.fill();
  trimCanvas(canvas);
  return canvas;
}

function generateShields() {
  const shields = [];
  for (let c = 0; c < 5; c++) {
    shields.push(generateShield(c));
  }
  return shields;
}

function generateBullet() {
  const canvas = document.createElement("canvas");
  canvas.width = 20;
  canvas.height = 60;
  const ctx = canvas.getContext("2d");
  // gold filled rect
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(10, 60);
  ctx.lineTo(20, 10);
  ctx.arc(10, 10, 10, 0, Math.PI, true);
  ctx.lineTo(10, 60);
  ctx.fill();

  // shadow
  ctx.strokeStyle = "cyan";
  ctx.shadowColor = "blue";
  // restrict new draw to cover existing pixels
  ctx.globalCompositeOperation = "source-atop";
  // shadowed stroke
  // "source-atop" clips off the undesired outer shadow
  ctx.shadowBlur = 4;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(10, 70);
  ctx.lineTo(23, 10);
  ctx.arc(10, 10, 13, 0, Math.PI, true);
  ctx.lineTo(10, 70);
  ctx.stroke();

  return canvas;
}

function generateEnemyBulletFrame(colorStop) {
  const canvas = document.createElement("canvas");
  canvas.width = 20;
  canvas.height = 20;
  const ctx = canvas.getContext("2d");
  var grd = ctx.createRadialGradient(10, 10, 0, 10, 10, 10);
  grd.addColorStop(colorStop, "yellow");
  grd.addColorStop(1, "red");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(10, 10, 10, 0, 7);
  ctx.fill();

  return canvas;
}

function generateEnemyBullet() {
  const frames = [];
  for (let c = 0; c < 9; c++) {
    frames.push(generateEnemyBulletFrame(c / 10));
  }
  // Inverse animation, copying by reference
  for (let d = frames.length - 2; d >= 1; d--) {
    frames.push(frames[d]);
  }
  return frames;
}

function generatePowerupCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 60;
  canvas.height = 60;
  const ctx = canvas.getContext("2d");
  var grd = ctx.createRadialGradient(30, 30, 0, 30, 30, 30);
  grd.addColorStop(0.6, "navy");
  grd.addColorStop(1, "blue");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(30, 30, 30, 0, 7);
  ctx.fill();
  return canvas;
}

function flipCanvas(canvas) {
  const flippedCanvas = document.createElement("canvas");
  flippedCanvas.width = canvas.width;
  flippedCanvas.height = canvas.height;
  const ctx = flippedCanvas.getContext("2d");
  ctx.scale(1, -1);
  ctx.drawImage(canvas, 0, 0, canvas.width, -canvas.height);
  return flippedCanvas;
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 700;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const SHIP_SPEED = 0.6;
const STARS_WIDTH = 540;

let pointer_down = false;
let introInhibitPress = false;

let click_x = -1,
  click_y = -1,
  down_x = -1,
  down_y = -1,
  up_x = -1,
  up_y = -1,
  move_x = -1,
  move_y = -1,
  x,
  y;

let a = document.getElementById("a");
const faction = generateFaction("piBbgDn4CZqlkqiF");
const ship = generateShip(faction, "ie7jMyCFouoUjkVs", 60).cf;

trimCanvas(ship);

const destroyedShipSprites = createSprites(ship);

const shipWidth = ship.width;
const shipHeight = ship.height;
let shipHitBox = [
  x - Math.floor(shipWidth / 2),
  y - Math.floor(shipHeight / 2),
  shipWidth,
  shipHeight,
];
let shipDestroyed;
let gameOverTime;
let fastFire;
const BOMB_DURATION = 1000;
let bombEffect;
let shieldLevel;

const shields = generateShields();

const enemyBlueprints = [];

const bullet = generateBullet();
const enemyBulletFrames = generateEnemyBullet();

const powerupCanvas = generatePowerupCanvas();

let initialTime = performance.now();

const STATE_LOADING = 0,
  STATE_INTRO = 1,
  STATE_GAME = 2,
  STATE_HIGHSCORES = 3;

let difficulty;
let score;
let scoreText;
let state = STATE_LOADING;

const highscores = JSON.parse(localStorage["pnf_highscores"] || "false") || [];

function updateHighscores() {
  if (score) {
    highscores.push([score, Date.now()]);
    // Sort by score
    highscores.sort((a, b) => {
      const scoreDiff = b[0] - a[0];
      if (scoreDiff === 0) {
        // Tie, newer first
        return b[1] - a[1];
      }
      return scoreDiff;
    });
    // Only keep the top 5
    highscores.length = Math.min(highscores.length, 5);
    localStorage["pnf_highscores"] = JSON.stringify(highscores);
  }
}

function generateEnemy(faction, seed, size, ...more) {
  const enemyShip = flipCanvas(
    generateShip(generateFaction(faction), seed, size).cf
  );
  return [enemyShip, undefined, undefined, ...more];
}

function generateEnemyAssets(enemyBlueprint) {
  const enemyShip = enemyBlueprint[0];
  trimCanvas(enemyShip);
  const hitEnemyShip = hitEffect(enemyShip);
  const destroyedEnemyShipSprites = createSprites(enemyShip);
  enemyBlueprint[1] = hitEnemyShip;
  enemyBlueprint[2] = destroyedEnemyShipSprites;
}

const enemyDefinitions = [
  ["c4pf4K5xHzu4CyZM", "Wl9w64KNQvFNbbbU", 50, 10, 0.35, 0, []],
  ["VTjHVRDIYTbXk766", "a3QM5c7MnbQlWns3", 80, 30, 0.27, 0, []],
  ["1fOXvyryYCvwBWPL", "I4xttvPYWxB1So2A", 230, 80, 0.2, 6, []],

  ["VsM4qdcBSiuCPDGJ", "q4D72OvJMb23kSZC", 60, 20, 0.4, 0, []],
  [
    "l4pyu8yF0mt84Q4u",
    "jPU5GcKNpf2JMgoG",
    100,
    40,
    0.35,
    0,
    [[HALF_CANVAS_HEIGHT]],
  ],
  ["NMp3mtsPHIwzMKYk", "dBzvSKo7wpema3S5", 220, 90, 0.22, 9, []],

  [
    "o67yOby6izpasGgo",
    "fyKKupDEId96qQHu",
    70,
    20,
    0.5,
    0,
    [[HALF_CANVAS_HEIGHT]],
  ],
  [
    "IU7xqL8UqZIXJQDQ",
    "aVBO8buAfBbQ4DOY",
    100,
    40,
    0.35,
    0,
    [[HALF_CANVAS_HEIGHT, 6]],
  ],
  ["LP6kUeGMn7S5xZzi", "p5O7jAQK67mDULTD", 230, 100, 0.25, 14, []],

  [
    "SsSvCKpjLVTGITYH",
    "aOEjI2Owpqpl06ex",
    65,
    30,
    0.5,
    0,
    [[HALF_CANVAS_HEIGHT]],
  ],
  [
    "AGUwhB1E94wgKe49",
    "pwUtokX7oS7ZKFK1",
    110,
    50,
    0.35,
    6,
    [[HALF_CANVAS_HEIGHT, 6]],
  ],
  ["qRF6GA3xnzX0lMcH", "RIdNudvB6T2ro7C3", 240, 120, 0.3, 22, []],
];
//    generateEnemy("KVoA08jfxzGQlU26", "bxfJMJri6hSgr3zD", 220, 80, 0.2),

function increaseDifficulty() {
  difficulty++;
}

function render(now) {
  switch (state) {
    case STATE_LOADING:
    case STATE_INTRO:
      introRender(now);
      break;
    case STATE_GAME:
      gameRender(now);
      break;
  }
}

function newGame() {
  state = STATE_GAME;
  difficulty = 0;
  enemyRandomizer = new Randomizer("enemy");
  powerupRandomizer = new Randomizer("powerup");
  nextEnemy = 1000;
  nextDifficulty = 5000;
  nextPowerup = POWERUP_INTERVAL;
  powerupIndex = 0;
  lastBullet = 0;
  entities = [];
  hitables = [];
  initialTime = performance.now();
  lastTime = performance.now();
  score = 0;
  scoreText = new Intl.NumberFormat().format(score);
  shipDestroyed = false;
  x = HALF_CANVAS_WIDTH;
  y = Math.floor(CANVAS_HEIGHT * 0.9);
  fastFire = 0;
  bombEffect = 0;
  shieldLevel = 1;
}

function introRender(now) {
  // reset
  const ctx = a.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "#fff";
  let ellapsed = (now - initialTime) / 3000;

  ctx.save();
  for (let j = 800; j--; ) {
    let r = 200 / (4 - ((ellapsed + j / 13) % 4));
    ctx.globalAlpha = Math.min(r / 400, 1);
    ctx.beginPath();
    ctx.arc(
      Math.cos(j) * r + HALF_CANVAS_WIDTH,
      Math.sin(j * j) * r + HALF_CANVAS_HEIGHT,
      r / 800,
      0,
      7
    );
    ctx.fill();
  }

  ctx.restore();
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  if (state === STATE_INTRO) {
    if (highscores.length === 0) {
      ctx.font = "bold 40px monospace";
      ctx.fillText("PLANET NOT FOUND", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
    } else {
      ctx.font = "bold 30px monospace";
      ctx.fillText("HIGH SCORES", HALF_CANVAS_WIDTH, 100);

      ctx.save();
      ctx.textAlign = "start";
      ctx.textBaseline = "top";
      for (let c = 0; c < highscores.length; c++) {
        const score = Intl.NumberFormat().format(highscores[c][0]);
        const time = new Date(highscores[c][1]).toLocaleString();
        ctx.font = "60px monospace";
        ctx.fillText(String(c + 1) + "{", 110, 150 + 80 * c);
        ctx.font = "25px monospace";
        ctx.fillText(score + " points", 180, 155 + 80 * c);
        ctx.font = "15px monospace";
        ctx.fillText(time, 180, 185 + 80 * c);
      }

      ctx.restore();
    }
    ctx.font = "20px monospace";
    ctx.fillText(
      "Press anywhere to play",
      HALF_CANVAS_WIDTH,
      CANVAS_HEIGHT - 30
    );

    if (pointer_down) {
      if (!introInhibitPress) {
        // Start game
        newGame();
      }
    } else {
      introInhibitPress = false;
    }
  } else {
    ctx.font = "italic 30px monospace";
    ctx.fillText("Loading…", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
    // Generate assets
    if (enemyBlueprints.length < enemyDefinitions.length) {
      enemyBlueprints.push(
        generateEnemy(...enemyDefinitions[enemyBlueprints.length])
      );
    } else {
      let generatedAllAssets = true;
      for (let c = 0; generatedAllAssets && c < enemyBlueprints.length; c++) {
        if (!enemyBlueprints[c][1]) {
          generatedAllAssets = false;
          generateEnemyAssets(enemyBlueprints[c]);
        }
      }
      if (generatedAllAssets) {
        state = STATE_INTRO;
      }
    }
  }
}

function collide(rect1, rect2) {
  return (
    rect1[0] < rect2[0] + rect2[2] &&
    rect1[0] + rect1[2] > rect2[0] &&
    rect1[1] < rect2[1] + rect2[3] &&
    rect1[1] + rect1[3] > rect2[1]
  );
}

const powerupDefinitions = [
  [
    "F",
    "orange",
    (time) => {
      fastFire = time + 6500;
    },
  ],
  [
    "S",
    "cyan",
    () => {
      shieldLevel++;
    },
  ],
  [
    "B",
    "red",
    (time) => {
      // Bomb
      bombEffect = time + BOMB_DURATION;
      nextEnemy += 1500;
    },
  ],
];

class Powerup {
  constructor(x, y, typeIndex, time) {
    this.x = x;
    this.y = y;
    this.type = typeIndex;
    this.lastTime = time;
    this.frame = 0;
    this.alwaysOnTop = true;
  }

  run(hitables, ctx, time) {
    this.y += (5 * (time - this.lastTime)) / 32;
    this.frame = (this.frame + 1) % 50;

    const hitBox = [
      this.x - Math.floor(powerupCanvas.width / 2),
      this.y - Math.floor(powerupCanvas.height / 2),
      powerupCanvas.width,
      powerupCanvas.height,
    ];

    // Check powerup against ship
    if (!shipDestroyed && collide(shipHitBox, hitBox)) {
      powerupDefinitions[this.type][2](time);
      return false;
    }

    if (this.y - Math.floor(powerupCanvas.height / 2) > CANVAS_HEIGHT) {
      return false;
    }
    this.lastTime = time;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.drawImage(
      powerupCanvas,
      -Math.floor(powerupCanvas.width / 2),
      -Math.floor(powerupCanvas.height / 2)
    );
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    let size = 65;
    if (this.frame < 25) {
      size += this.frame;
    } else {
      size += 50 - this.frame;
    }
    ctx.font = "700 " + Math.floor(size / 2) + "px Arial";
    const measure = ctx.measureText(powerupDefinitions[this.type][0]);
    const textHeight =
      measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
    ctx.fillStyle = powerupDefinitions[this.type][1];
    ctx.fillText(
      powerupDefinitions[this.type][0],
      0,
      -Math.floor(textHeight / 2)
    );
    ctx.restore();
    return true;
  }
}

const BULLET_SPEED = 20;

class Bullet {
  constructor(x, y, time) {
    this.x = x;
    this.y = y;
    this.lastTime = time;
    this.power = 10;
  }

  run(hitables, ctx, time) {
    this.y -= (BULLET_SPEED * (time - this.lastTime)) / 32;

    const hitBox = [
      this.x - Math.floor(bullet.width / 2),
      this.y - Math.floor(bullet.height / 2),
      bullet.width,
      bullet.height,
    ];
    // Check collision with hitables
    for (let c = 0; c < hitables.length; c++) {
      const hitable = hitables[c];
      if (collide(hitBox, hitable.hitBox)) {
        hitable.hit(this.power, time);
        // We're done, get rid of bullet
        return false;
      }
    }

    if (this.y + Math.floor(bullet.height / 2) < 0) {
      return false;
    }
    this.lastTime = time;
    ctx.drawImage(
      bullet,
      this.x - Math.floor(bullet.width / 2),
      this.y - Math.floor(bullet.height / 2)
    );
    return true;
  }
}

const ENEMY_EXPLOSION_DURATION = 500;
const PLAYER_EXPLOSION_DURATION = 1500;

class Shard {
  constructor(sprite, shipX, shipY, duration, time) {
    this.time = time;
    this.center = sprite.center;
    this.canvas = sprite.canvas;
    this.corner = sprite.corner;
    this.translateX = sprite.translateX;
    this.translateY = sprite.translateY;
    this.angle = sprite.angle;
    this.shipX = shipX;
    this.shipY = shipY;
    this.duration = duration;
  }

  run(hitables, ctx, time) {
    const ellapsed = time - this.time;
    if (ellapsed > this.duration) {
      // Explosion is over
      return false;
    }
    const destX =
      this.shipX +
      this.center[0] +
      (this.translateX * Math.min(ellapsed, this.duration)) / this.duration;
    const destY =
      this.shipY +
      this.center[1] +
      (this.translateY * Math.min(ellapsed, this.duration)) / this.duration;
    ctx.save();
    ctx.globalAlpha =
      1 - (Math.min(ellapsed, this.duration) / this.duration) ** 2;
    ctx.translate(destX, destY);
    ctx.rotate(
      (this.angle * Math.min(ellapsed, this.duration)) / this.duration
    );
    const offsetX = this.corner[0] - this.center[0];
    const offsetY = this.corner[1] - this.center[1];
    ctx.drawImage(this.canvas, offsetX, offsetY);
    ctx.restore();

    return true;
  }
}

class EnemyBullet {
  constructor(startX, startY, destinationX, destinationY, speed, time) {
    this.width = enemyBulletFrames[0].width;
    this.height = enemyBulletFrames[0].height;
    this.x = startX;
    this.y = startY;
    const magnitude = Math.sqrt(
      (destinationX - startX) ** 2 + (destinationY - startY) ** 2
    );
    this.xFactor = (destinationX - startX) / magnitude;
    this.yFactor = (destinationY - startY) / magnitude;
    this.lastTime = time;
    this.speed = speed;
    this.frame = 0;
    this.alwaysOnTop = true;
    this.updateHitBox();
  }

  run(hitables, ctx, time) {
    // Destroy bullets if bomb time
    if (bombEffect > time) {
      return false;
    }
    const ellapsed = time - this.lastTime;
    this.y += ellapsed * this.speed * this.yFactor;
    this.x += ellapsed * this.speed * this.xFactor;
    this.updateHitBox();

    // Check collision to ship
    if (collide(shipHitBox, this.hitBox)) {
      if (shieldLevel) {
        shieldLevel--;
        return false;
      }
      shipDestroyed = true;
    }

    // Make it disappear after it leaves the screen
    if (
      this.y - Math.floor(this.height / 2) > CANVAS_HEIGHT ||
      this.y + Math.floor(this.height / 2) < 0 ||
      this.x - Math.floor(this.width / 2) > CANVAS_WIDTH ||
      this.x + Math.floor(this.width / 2) < 0
    ) {
      return false;
    }

    this.lastTime = time;

    this.frame = (this.frame + 1) % enemyBulletFrames.length;
    ctx.drawImage(
      enemyBulletFrames[this.frame],
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height
    );
    return true;
  }

  updateHitBox() {
    this.hitBox = [
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height,
    ];
  }
}

function fireBullets(amount, x, y, initialAngle, speed, time) {
  const bullets = [];
  for (let c = 0; c < amount; c++) {
    const angle = initialAngle + (2 * c * Math.PI) / amount;
    bullets.push(
      new EnemyBullet(
        x,
        y,
        x + Math.round(100 * Math.cos(angle)),
        y + Math.round(100 * Math.sin(angle)),
        speed,
        time
      )
    );
  }
  return bullets;
}

class Enemy {
  constructor(
    canvas,
    hitCanvas,
    destroyedSprites,
    startX,
    startY,
    speed,
    health,
    points,
    deathBullets,
    fireSequences,
    time
  ) {
    this.fireAngle = enemyRandomizer.sd(0, Math.PI * 2);
    this.canvas = canvas;
    this.hitCanvas = hitCanvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.health = health;
    this.x = startX;
    this.y = startY;
    this.lastTime = time;
    this.hitTime = 0;
    this.destroyedSprites = destroyedSprites;
    this.speed = speed;
    this.points = points;
    this.deathBullets = deathBullets;
    this.fireSequences = fireSequences;
    this.updateHitBox();
  }

  run(hitables, ctx, time) {
    const originalY = this.y;
    let isDead = false;
    // Destroy enemies if no health or bomb time
    if (this.health <= 0 || bombEffect > time) {
      isDead = true;
    } else {
      const ellapsed = time - this.lastTime;
      // DEBUG just testing
      this.y += ellapsed * this.speed;
      this.updateHitBox();

      // Check collision to ship
      if (collide(shipHitBox, this.hitBox)) {
        if (shieldLevel) {
          shieldLevel--;
          isDead = true;
        } else {
          shipDestroyed = true;
        }
      }
    }

    if (isDead) {
      // Add score
      score += this.points;
      scoreText = new Intl.NumberFormat().format(score);
      // Return array with pieces
      const returnEntities =
        this.deathBullets > 0
          ? fireBullets(
              this.deathBullets,
              this.x,
              this.y + Math.round(17 * this.speed),
              this.fireAngle,
              0.45,
              time
            )
          : [];

      return returnEntities.concat(
        this.destroyedSprites.map((sprite) => {
          calculateSpriteFinalState(sprite, this.width, this.height);
          return new Shard(
            sprite,
            this.x - Math.floor(this.width / 2),
            this.y - Math.floor(this.height / 2),
            ENEMY_EXPLOSION_DURATION,
            time
          );
        })
      );
    }

    // Make it disappear after it leaves the screen
    if (this.y - Math.floor(this.height / 2) > CANVAS_HEIGHT) {
      return false;
    }

    this.lastTime = time;

    const hitTimeEllapsed = time - this.hitTime;
    let hitTint = 0;
    if (hitTimeEllapsed < 400) {
      hitTint = (400 - hitTimeEllapsed) / 400;
    }
    ctx.save();
    ctx.drawImage(
      this.canvas,
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height
    );
    if (hitTint > 0) {
      ctx.globalAlpha = hitTint;
      ctx.drawImage(
        this.hitCanvas,
        this.x - Math.floor(this.width / 2),
        this.y - Math.floor(this.height / 2),
        this.width,
        this.height
      );
    }
    ctx.restore();

    if (!shipDestroyed) {
      for (let c = 0; c < this.fireSequences.length; c++) {
        const fireY = this.fireSequences[c][0];
        if (originalY < fireY && this.y > fireY) {
          const bulletAmount = this.fireSequences[c][1];
          const fromY = this.y + Math.round(17 * this.speed);
          if (bulletAmount) {
            // Fire bullet spread, a bit forward as it looks better
            return [
              this,
              ...fireBullets(
                bulletAmount,
                this.x,
                fromY,
                this.fireAngle,
                0.3,
                time
              ),
            ];
          } else {
            // Fire single bullet targeted to the user
            return [this, new EnemyBullet(this.x, fromY, x, y, 0.3, time)];
          }
        }
      }
    }

    return true;
  }

  updateHitBox() {
    this.hitBox = [
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height,
    ];
  }

  hit(power, now) {
    this.hitTime = now;
    this.health -= power;
  }
}

let entities;
let hitables;
let lastBullet;
let bulletOffset = 5;

let enemyRandomizer;
let powerupRandomizer;
let nextEnemy;
let nextDifficulty;
let nextPowerup;
let powerupIndex;

const POWERUP_INTERVAL = 9000;

let lastTime;
function gameRender(now) {
  const ellapsed = now - lastTime;
  lastTime = now;
  if (ellapsed > 160) {
    // First frame or detecting a pause
    initialTime += ellapsed;
    return;
  }

  if (!shipDestroyed) {
    const originalX = x,
      originalY = y;
    // Move ship
    if (move_x > -1) {
      x +=
        Math.sign(move_x - x) *
        Math.min(Math.abs(move_x - x), SHIP_SPEED * ellapsed);
    }
    if (move_x > -1) {
      y +=
        Math.sign(move_y - y) *
        Math.min(Math.abs(move_y - y), SHIP_SPEED * ellapsed);
    }
    let moved = false;
    if (x !== originalX) {
      if (x - Math.floor(shipWidth / 2) < 0) {
        x = Math.floor(shipWidth / 2);
      } else if (x + Math.floor(shipWidth / 2) > CANVAS_WIDTH) {
        x = CANVAS_WIDTH - Math.floor(shipWidth / 2);
      }
    }
    if (y !== originalY) {
      if (y - Math.floor(shipHeight / 2) < 0) {
        y = Math.floor(shipHeight / 2);
      } else if (y + Math.floor(shipHeight / 2) > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - Math.floor(shipHeight / 2);
      }
    }
    if (x !== originalX || y !== originalY) {
      shipHitBox = [
        x - Math.floor(shipWidth / 2),
        y - Math.floor(shipHeight / 2),
        shipWidth,
        shipHeight,
      ];
    }
  }

  // Reset canvas
  const ctx = a.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Paint background stars
  let s;
  ctx.fillStyle = "#777";
  for (
    let i = 100;
    i--;
    ctx.beginPath(),
      ctx.arc(
        Math.floor(
          ((100 - i) * (CANVAS_WIDTH - STARS_WIDTH) * (x - shipWidth / 2)) /
            (100 * (CANVAS_WIDTH - shipWidth))
        ) +
          Math.floor(STARS_WIDTH / 2) +
          Math.floor(STARS_WIDTH / 2) * Math.sin(s * STARS_WIDTH),
        (CANVAS_HEIGHT * (Math.tan(i / 9) + (s * (now - initialTime)) / 3000)) %
          CANVAS_HEIGHT,
        s * 2,
        0,
        7
      ),
      ctx.fill()
  )
    s = 149 / (i * 3 + 199);

  const previousShipDestroyed = shipDestroyed;

  // Run entities
  const nextEntities = [],
    alwaysOnTop = [],
    nextHitables = [];
  function runEntity(entity) {
    const result = entity.run(hitables, ctx, now - initialTime);
    if (typeof result === "boolean") {
      if (result) {
        if (entity.alwaysOnTop) {
          alwaysOnTop.push(entity);
        } else {
          nextEntities.push(entity);
        }
        if (entity.hit) {
          nextHitables.push(entity);
        }
      }
    } else if (Array.isArray(result)) {
      result.forEach((subEntity) => {
        if (entity === subEntity) {
          // The original wants to be persisted, don't rerun it
          if (result) {
            if (entity.alwaysOnTop) {
              alwaysOnTop.push(entity);
            } else {
              nextEntities.push(entity);
            }
            if (entity.hit) {
              nextHitables.push(entity);
            }
          }
        } else {
          // New subentity, run it
          runEntity(subEntity);
        }
      });
    }
  }
  entities.forEach(runEntity);

  if (!previousShipDestroyed && shipDestroyed) {
    // Record time
    gameOverTime = now - initialTime;
    // add shards
    destroyedShipSprites
      .map((sprite) => {
        calculateSpriteFinalState(sprite, shipWidth, shipHeight);
        return new Shard(
          sprite,
          x - Math.floor(shipWidth / 2),
          y - Math.floor(shipHeight / 2),
          PLAYER_EXPLOSION_DURATION,
          now - initialTime
        );
      })
      .forEach(runEntity);
  }

  entities = nextEntities.concat(alwaysOnTop);
  hitables = nextHitables;

  // Common styles
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";

  if (!shipDestroyed) {
    if (shieldLevel) {
      const shieldCanvas =
        shields[Math.min(shieldLevel - 1, shields.length - 1)];
      // Paint shield
      ctx.drawImage(
        shieldCanvas,
        x - Math.floor(shieldCanvas.width / 2),
        y - Math.floor(shieldCanvas.height / 2) + 5
      );
    }
    // Paint ship
    ctx.drawImage(
      ship,
      x - Math.floor(shipWidth / 2),
      y - Math.floor(shipHeight / 2)
    );
  } else {
    // Paint game over
    ctx.save();
    ctx.globalAlpha = Math.min(1, (now - initialTime - gameOverTime) / 2000);
    ctx.textBaseline = "middle";
    ctx.font = "40px monospace";
    ctx.fillText("Game Over", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

    ctx.restore();
  }

  // Paint bomb
  if (bombEffect > now - initialTime) {
    ctx.save();
    ctx.globalAlpha = (bombEffect - now + initialTime) / BOMB_DURATION;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();
  }

  // Paint HUD
  ctx.textBaseline = "top";
  ctx.font = "16px monospace";
  ctx.fillText(scoreText, HALF_CANVAS_WIDTH, 5);

  const isFastFire = fastFire > now - initialTime;
  // Should we fire?
  if (
    !shipDestroyed &&
    lastBullet + (isFastFire ? 100 : 200) < now - initialTime
  ) {
    bulletOffset = -bulletOffset;
    entities.push(
      new Bullet(
        x + (isFastFire ? bulletOffset : 0),
        y - Math.floor(shipHeight / 2),
        now - initialTime
      )
    );
    lastBullet = Math.max(now - initialTime);
  }
  if (nextDifficulty < now - initialTime) {
    increaseDifficulty();
    nextDifficulty = now - initialTime + 10000;
  }

  // Should we spawn powerup
  if (nextPowerup < now - initialTime) {
    entities.push(
      new Powerup(
        powerupRandomizer.si(30, CANVAS_WIDTH - 30),
        Math.floor(-powerupCanvas.height / 2),
        powerupIndex,
        now - initialTime
      )
    );
    powerupIndex = (powerupIndex + 1) % powerupDefinitions.length;
    nextPowerup = now - initialTime + POWERUP_INTERVAL;
  }

  // Should we spawn enemy
  if (nextEnemy < now - initialTime) {
    const enemyDifficulty = enemyRandomizer.si(
      Math.min(Math.max(difficulty - 2, 0), enemyBlueprints.length - 3),
      Math.min(difficulty, enemyBlueprints.length - 1)
    );

    const [
      enemyShip,
      hitEnemyShip,
      destroyedEnemyShipSprites,
      health,
      speed,
      deathBullets,
      fireSequences,
    ] = enemyBlueprints[enemyDifficulty];
    entities.push(
      new Enemy(
        enemyShip,
        hitEnemyShip,
        destroyedEnemyShipSprites,
        enemyRandomizer.si(30, CANVAS_WIDTH - 30),
        Math.floor(-enemyShip.height / 2),
        speed,
        health,
        (enemyDifficulty + 1) * 50,
        deathBullets,
        fireSequences,
        now - initialTime
      )
    );
    const minNextEnemy = Math.max(400, 1000 - difficulty * 25);
    nextEnemy += enemyRandomizer.si(minNextEnemy, minNextEnemy + 400);
  }

  if (shipDestroyed && gameOverTime + 3500 < now - initialTime) {
    // Update highscores if needed
    updateHighscores();

    state = STATE_INTRO;
    introInhibitPress = pointer_down;
  }
}

const canvas_ratio = CANVAS_WIDTH / CANVAS_HEIGHT;
let screen_ratio = innerWidth / innerHeight;

onload = (e) => {
  a.width = CANVAS_WIDTH;
  a.height = CANVAS_HEIGHT;
  let c = a.getContext("2d");
  onresize();
  function renderWrapper(now) {
    render(now);
    requestAnimationFrame(renderWrapper);
  }
  requestAnimationFrame(renderWrapper);
};

/* Canvas offsets (changed onresize) */
let canvas_left = 0;
let canvas_top = 0;

/* Canvas "real" size (changed onresize) */
let canvas_real_width = 0;
let canvas_real_height = 0;

/* Resize */
self.onresize = self.onrotate = (b) => {
  screen_ratio = innerWidth / innerHeight;

  /* Full width */
  if (canvas_ratio > screen_ratio) {
    canvas_real_width = innerWidth;
    canvas_real_height = innerWidth / canvas_ratio;
    canvas_left = 0;
    canvas_top = (innerHeight - canvas_real_height) / 2;
  } else {
    /* Full height */
    canvas_real_width = innerHeight * canvas_ratio;
    canvas_real_height = innerHeight;
    canvas_left = (innerWidth - canvas_real_width) / 2;
    canvas_top = 0;
  }
  a.style.width = canvas_real_width + "px";
  a.style.height = canvas_real_height + "px";
};

/* Compute mouse / touch coordinates on the canvas */

let update_mouse = (e) => {
  let pointer = {};
  if (e.changedTouches) {
    pointer = e.changedTouches[0];
  } else {
    pointer = e;
  }

  return [
    ~~(((pointer.pageX - canvas_left) * CANVAS_WIDTH) / canvas_real_width),
    ~~(((pointer.pageY - canvas_top) * CANVAS_HEIGHT) / canvas_real_height),
  ];
};

/* Click */
onclick = (e) => {
  e.preventDefault();
  [click_x, click_y] = update_mouse(e);
};

/* Mousedown / touchstart */
self.onmousedown = self.ontouchstart = (e) => {
  e.preventDefault();
  pointer_down = true;
  [down_x, down_y] = update_mouse(e);
  move_x = down_x;
  move_y = down_y;
};

/* Mousemove / touchmove */
self.onmousemove = self.ontouchmove = (e) => {
  e.preventDefault();
  [move_x, move_y] = update_mouse(e);
};

/* Mouseup / touchend */
self.onmouseup = self.ontouchend = (e) => {
  e.preventDefault();
  pointer_down = false;
  [up_x, up_y] = update_mouse(e);

  /* Add click on mobile */
  if (e.changedTouches) {
    onclick();
  }
};

/* Right click */
oncontextmenu = (e) => {
  e.preventDefault();
};

// For debug, start game right away
//newGame();
