import { generateShip, Randomizer } from "starshipwright";
import { createSprites, calculateSpriteFinalState } from "./voronoi";
import { trimCanvas, createFavicon } from "./utils";
import * as sounds from "./sounds";

const STAR_COLORS = ["#9af", "#abf", "#ccf", "#fef", "#fee", "#fc9", "#fc6"];

function hitEffect(canvas) {
  const destCanvas = document.createElement("canvas");
  const { width, height } = canvas;
  destCanvas.width = width;
  destCanvas.height = height;
  const ctx = canvas.getContext("2d");
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
  destCanvas.getContext("2d").putImageData(imageData, 0, 0);
  return destCanvas;
}

function generateShields() {
  const phases = [ship];
  for (let c = 0; c < 10; c++) {
    const shieldPhase = document.createElement("canvas");
    const shieldPhaseCtx = shieldPhase.getContext("2d");
    shieldPhase.width = shipWidth * 2;
    shieldPhase.height = shipHeight * 2;

    for (let offsetY = 0; offsetY < 3; offsetY++) {
      for (let offsetX = 0; offsetX < 3; offsetX++) {
        shieldPhaseCtx.drawImage(
          phases[0],
          Math.floor(shipWidth / 2) - phases.length - 1 + offsetX,
          Math.floor(shipHeight / 2) - phases.length - 1 + offsetY
        );
      }
    }
    shieldPhaseCtx.globalCompositeOperation = "source-in";
    if (c > 5) {
      // Solid cyan
      shieldPhaseCtx.fillStyle = "cyan";
    } else {
      shieldPhaseCtx.fillStyle = "blue";
    }
    shieldPhaseCtx.fillRect(0, 0, shieldPhase.width, shieldPhase.height);
    shieldPhaseCtx.globalCompositeOperation = "source-over";
    shieldPhaseCtx.drawImage(
      phases[0],
      Math.floor(shipWidth / 2) - phases.length,
      Math.floor(shipHeight / 2) - phases.length
    );
    trimCanvas(shieldPhase);
    phases.unshift(shieldPhase);
  }
  // Remove original ship from processing
  phases.pop();
  phases.map((phase) => {
    const phaseCtx = phase.getContext("2d");
    phaseCtx.globalCompositeOperation = "destination-out";
    phaseCtx.globalAlpha = 0.2;
    for (let c = 5; c < 10; c++) {
      phaseCtx.drawImage(
        phases[c],
        Math.floor((phase.width - phases[c].width) / 2),
        Math.floor((phase.height - phases[c].height) / 2)
      );
    }
  });
  phases.length = 5;
  return phases;
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

  return [canvas, ctx.getImageData(0, 0, canvas.width, canvas.height).data];
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
  return [canvas, ctx.getImageData(0, 0, canvas.width, canvas.height).data];
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

function generateNewTag() {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 20px Helvetica";
  ctx.translate(50, 50);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "red";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("NEW!", 0, 0);
  trimCanvas(canvas);
  const tagCanvas = document.createElement("canvas");
  tagCanvas.width = canvas.width + 10;
  tagCanvas.height = canvas.height + 10;
  const tagCtx = tagCanvas.getContext("2d");
  tagCtx.fillStyle = "red";
  tagCtx.fillRect(0, 0, tagCanvas.width, tagCanvas.height);
  tagCtx.drawImage(canvas, 5, 5);
  return tagCanvas;
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 700;
const HALF_CANVAS_WIDTH = Math.floor(CANVAS_WIDTH / 2);
const HALF_CANVAS_HEIGHT = Math.floor(CANVAS_HEIGHT / 2);
const SHIP_SPEED = 0.6;
const STARS_WIDTH = 540;

let pointer_down = false;
let introInhibitPress = false;

let move_x = -1,
  move_y = -1,
  x,
  y,
  keysPressed = [],
  anyKeyPressed = false;

let a = document.getElementById("a");
const faction = new Randomizer("piBbgDn4CZqlkqiF");
const ship = generateShip(faction, "ie7jMyCFouoUjkVs", 60);

trimCanvas(ship);

const destroyedShipSprites = createSprites(ship);
const shipWidth = ship.width;
const shipHeight = ship.height;
const shipMask = ship.getContext("2d").getImageData(0, 0, shipWidth, shipHeight)
  .data;

let shipHitBox = [x, y, shipWidth, shipHeight, shipMask];
let shipDestroyed;
let gameOverTime;
let fastFire;
const BOMB_DURATION = 1000;
let bombEffect;
let shieldLevel;

// Create favicon
createFavicon(ship);

const shields = generateShields();

const enemyBlueprints = [];

const [bullet, bulletMask] = generateBullet();
const enemyBulletFrames = generateEnemyBullet();
const enemyBulletMask = enemyBulletFrames[0]
  .getContext("2d")
  .getImageData(0, 0, enemyBulletFrames[0].width, enemyBulletFrames[0].height)
  .data;

const [powerupCanvas, powerupMask] = generatePowerupCanvas();

let initialTime = performance.now();

const STATE_LOADING = 0,
  STATE_INTRO = 1,
  STATE_GAME = 2;

let difficulty;
let score;
let scoreText;
let state = STATE_LOADING;

const highscores = JSON.parse(self.localStorage["pnf_highscores"] || 0) || [];
let highlightHighscore = -1;
const newTag = generateNewTag();

function addScore(points) {
  score += points;
  scoreText = new Intl.NumberFormat().format(score);
}

function updateNextEnemy() {
  const minNextEnemy = Math.max(400, 1000 - difficulty * 25);
  nextEnemy += enemyRandomizer.si(minNextEnemy, minNextEnemy + 400);
}

function updateHighscores() {
  if (score) {
    const newScore = [score, Date.now()];
    highscores.push(newScore);
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
    highlightHighscore = highscores.indexOf(newScore);
    self.localStorage["pnf_highscores"] = JSON.stringify(highscores);
  }
}

let bossShip;
let bossMask;
let bossHit;
let destroyedBossSprites;

function generateBoss() {
  bossShip = flipCanvas(
    generateShip(new Randomizer("HYj7ADLjQr6icLtO"), "CdiB9N2ZoQWuAxur", 270)
  );
  trimCanvas(bossShip);
  bossHit = hitEffect(bossShip);
  destroyedBossSprites = createSprites(bossShip);
  bossMask = bossShip
    .getContext("2d")
    .getImageData(0, 0, bossShip.width, bossShip.height).data;
}

function generateEnemy(faction, seed, size, ...more) {
  const enemyShip = flipCanvas(
    generateShip(new Randomizer(faction), seed, size)
  );
  return [enemyShip, undefined, undefined, undefined, ...more];
}

function generateEnemyAssets(enemyBlueprint) {
  const enemyShip = enemyBlueprint[0];
  trimCanvas(enemyShip);
  const mask = enemyShip
    .getContext("2d")
    .getImageData(0, 0, enemyShip.width, enemyShip.height).data;
  const hitEnemyShip = hitEffect(enemyShip);
  const destroyedEnemyShipSprites = createSprites(enemyShip);
  enemyBlueprint[1] = mask;
  enemyBlueprint[2] = hitEnemyShip;
  enemyBlueprint[3] = destroyedEnemyShipSprites;
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
  // Any key press detection should have been consumed now
  anyKeyPressed = false;
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
  addScore(0);
  shipDestroyed = false;
  x = HALF_CANVAS_WIDTH;
  y = Math.floor(CANVAS_HEIGHT * 0.9);
  fastFire = 0;
  bombEffect = 0;
  shieldLevel = 1;
  bossTime = false;
  highlightHighscore = -1;
}

function introRender(now) {
  // reset
  const ctx = a.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let ellapsed = (now - initialTime) / 3000;

  // Intro starfield
  ctx.save();
  for (let j = 200; j--; ) {
    ctx.fillStyle = STAR_COLORS[j % STAR_COLORS.length];
    let r = 50 / (6 - ((ellapsed + j / 13) % 6));
    ctx.globalAlpha = Math.min(r / 100, 1);
    ctx.beginPath();
    ctx.arc(
      Math.cos(j) * r + HALF_CANVAS_WIDTH,
      Math.sin(j * j) * r + HALF_CANVAS_HEIGHT,
      r / 200,
      0,
      7
    );
    ctx.fill();
  }

  ctx.restore();
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  if (state === STATE_INTRO) {
    if (highscores.length === 0) {
      ctx.font = "bold 40px Helvetica";
      ctx.fillText("PLANET NOT FOUND", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
    } else {
      ctx.font = "bold 30px Helvetica";
      ctx.fillText("HIGH SCORES", HALF_CANVAS_WIDTH, 100);

      ctx.save();
      ctx.textAlign = "start";
      ctx.textBaseline = "top";
      for (let c = 0; c < highscores.length; c++) {
        if (c === highlightHighscore) {
          ctx.save();
          ctx.translate(90, 185 + 80 * c);
          ctx.drawImage(
            newTag,
            -Math.floor(newTag.width / 2),
            -Math.floor(newTag.height / 2)
          );
          ctx.restore();
          ctx.fillStyle = "gold";
        } else {
          ctx.fillStyle = "#fff";
        }
        const score = Intl.NumberFormat().format(highscores[c][0]);
        const time = new Date(highscores[c][1]).toLocaleString();
        ctx.font = "50px Helvetica";
        ctx.fillText(String(c + 1), 115, 160 + 80 * c);
        ctx.font = "60px Helvetica";
        ctx.fillText("{", 145, 150 + 80 * c);
        ctx.font = "25px Helvetica";
        ctx.fillText(score + " points", 170, 160 + 80 * c);
        ctx.font = "15px Helvetica";
        ctx.fillText(time, 170, 190 + 80 * c);
      }

      ctx.restore();
    }
    ctx.font = "20px Helvetica";
    ctx.fillText(
      "<Press anywhere or any key to play>",
      HALF_CANVAS_WIDTH,
      CANVAS_HEIGHT - 30
    );

    if (pointer_down || anyKeyPressed) {
      if (!introInhibitPress) {
        // Start game
        newGame();
      }
    } else {
      introInhibitPress = false;
    }
  } else {
    ctx.font = "italic 30px Helvetica";
    ctx.fillText("Loading…", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
    // Generate assets
    if (!bossShip) {
      generateBoss();
    } else if (enemyBlueprints.length < enemyDefinitions.length) {
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

function collide(o1, o2) {
  const xs = o1[0] - o1[2] / 2 < o2[0] - o2[2] / 2 ? [o1, o2] : [o2, o1];
  const ys = o1[1] - o1[3] / 2 < o2[1] - o2[3] / 2 ? [o1, o2] : [o2, o1];

  // Do bounding boxes collide
  if (
    xs[0][0] + xs[0][2] / 2 > xs[1][0] - xs[1][2] / 2 &&
    ys[0][1] + ys[0][3] / 2 > ys[1][1] - ys[1][3] / 2
  ) {
    // Create the collision bounding box
    const cBoundingX = Math.floor(xs[1][0] - xs[1][2] / 2);
    const cBoundingY = Math.floor(ys[1][1] - ys[1][3] / 2);
    const cBoundingWidth =
      Math.floor(Math.min(xs[0][0] + xs[0][2] / 2, xs[1][0] + xs[1][2] / 2)) -
      cBoundingX;
    const cBoundingHeight =
      Math.floor(Math.min(ys[0][1] + ys[0][3] / 2, ys[1][1] + ys[1][3] / 2)) -
      cBoundingY;

    const o1StartX = cBoundingX - Math.floor(o1[0] - o1[2] / 2);
    const o1StartY = cBoundingY - Math.floor(o1[1] - o1[3] / 2);
    const o2StartX = cBoundingX - Math.floor(o2[0] - o2[2] / 2);
    const o2StartY = cBoundingY - Math.floor(o2[1] - o2[3] / 2);
    for (let c = 0; c < cBoundingHeight; c++) {
      for (let d = 0; d < cBoundingWidth; d++) {
        if (
          o1[4][((o1StartY + c) * o1[2] + o1StartX + d) * 4 + 3] > 0 &&
          o2[4][((o2StartY + c) * o2[2] + o2StartX + d) * 4 + 3] > 0
        ) {
          //Found common filled pixel!!
          return true;
        }
      }
    }
  }

  return false;
}

function hitShip() {
  if (shieldLevel) {
    shieldLevel--;
    sounds.shieldHit();
  } else if (!shipDestroyed) {
    sounds.explosion();
    shipDestroyed = true;
  }
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
      sounds.shieldPowerup();
      shieldLevel++;
    },
  ],
  [
    "B",
    "red",
    (time) => {
      sounds.explosion();
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
    this.frameIndex = 0;
    this.alwaysOnTop = true;
  }

  run(hitables, ctx, time) {
    this.y += (5 * (time - this.lastTime)) / 32;
    this.frameIndex = (this.frameIndex + 1) % 50;

    const hitBox = [
      this.x,
      this.y,
      powerupCanvas.width,
      powerupCanvas.height,
      powerupMask,
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
    if (this.frameIndex < 25) {
      size += this.frameIndex;
    } else {
      size += 50 - this.frameIndex;
    }
    ctx.font = "700 " + Math.floor(size / 2) + "px Helvetica";
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

    const hitBox = [this.x, this.y, bullet.width, bullet.height, bulletMask];
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
const BOSS_EXPLOSION_DURATION = 500;
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
    this.explosionDuration = duration;
  }

  run(hitables, ctx, time) {
    const ellapsed = time - this.time;
    if (ellapsed > this.explosionDuration) {
      // Explosion is over
      return false;
    }
    const destX =
      this.shipX +
      this.center[0] +
      (this.translateX * Math.min(ellapsed, this.explosionDuration)) /
        this.explosionDuration;
    const destY =
      this.shipY +
      this.center[1] +
      (this.translateY * Math.min(ellapsed, this.explosionDuration)) /
        this.explosionDuration;
    ctx.save();
    ctx.globalAlpha =
      1 -
      (Math.min(ellapsed, this.explosionDuration) / this.explosionDuration) **
        2;
    ctx.translate(destX, destY);
    ctx.rotate(
      (this.angle * Math.min(ellapsed, this.explosionDuration)) /
        this.explosionDuration
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
    const magnitude = Math.hypot(destinationX - startX, destinationY - startY);
    this.xFactor = (destinationX - startX) / magnitude;
    this.yFactor = (destinationY - startY) / magnitude;
    this.lastTime = time;
    this.speed = speed;
    this.frameIndex = 0;
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
      hitShip();
      if (!shipDestroyed) {
        return false;
      }
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

    this.frameIndex = (this.frameIndex + 1) % enemyBulletFrames.length;
    ctx.drawImage(
      enemyBulletFrames[this.frameIndex],
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height
    );
    return true;
  }

  updateHitBox() {
    this.hitBox = [this.x, this.y, this.width, this.height, enemyBulletMask];
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
    mask,
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
    this.enemyMask = mask;
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
    this.killPoints = points;
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
      this.y += ellapsed * this.speed;
      this.updateHitBox();

      // Check collision to ship
      if (collide(shipHitBox, this.hitBox)) {
        hitShip();
        if (!shipDestroyed) {
          isDead = true;
        }
      }
    }

    if (isDead) {
      sounds.explosion();
      // Add score
      addScore(this.killPoints);
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
          sounds.enemyFire();
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
    this.hitBox = [this.x, this.y, this.width, this.height, this.enemyMask];
  }

  hit(power, now) {
    this.hitTime = now;
    this.health -= power;
    if (this.health > 0) {
      sounds.enemyHit();
    }
  }
}

const BOSS_WAITING = 0;
const BOSS_COMING = 1;
const BOSS_FIGHT = 2;
const DIRECTION_RIGHT = 0;
const DIRECTION_LEFT = 1;

class Boss {
  constructor(difficulty, time) {
    this.phase = BOSS_WAITING;
    this.nextPhase = time + 2000;
    // We want to be basically immortal until we start the fight
    this.health = Number.MAX_SAFE_INTEGER;
    this.lastTime = time;
    this.width = bossShip.width;
    this.height = bossShip.height;
    this.x = HALF_CANVAS_WIDTH;
    this.y = -this.height / 2;
    this.direction = DIRECTION_RIGHT;
    this.hitTime = 0;
    this.difficulty = difficulty;
    this.updateHitBox();
  }

  run(hitables, ctx, time) {
    const originalY = this.y;
    let isDead = false;
    // Destroy enemies if no health or bomb time
    if (this.health <= 0) {
      isDead = true;
    } else {
      const ellapsed = time - this.lastTime;
      if (this.phase === BOSS_WAITING) {
        if (time > this.nextPhase) {
          this.phase = BOSS_COMING;
        }
      } else if (this.phase === BOSS_COMING) {
        this.y += ellapsed * 0.15;
        if (this.y > 150) {
          this.y = 150;
          // Give it normal health
          this.health = 100 + 250 * this.difficulty;
          this.phase = BOSS_FIGHT;
          this.nextBullet = time;
          this.bulletCount = 0;
        }
      } else {
        // Update X
        if (this.direction === DIRECTION_RIGHT) {
          this.x += ellapsed * 0.1;
          if (this.x + Math.floor(this.width / 2) > CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - Math.floor(this.width / 2);
            this.direction = DIRECTION_LEFT;
          }
        } else {
          this.x -= ellapsed * 0.1;
          if (this.x - Math.floor(this.width / 2) < 0) {
            this.x = Math.floor(this.width / 2);
            this.direction = DIRECTION_RIGHT;
          }
        }
      }

      this.updateHitBox();

      // Check collision to ship
      if (collide(shipHitBox, this.hitBox)) {
        shipDestroyed = true;
      }
    }

    if (isDead) {
      sounds.bossExplosion();
      addScore(difficulty * 500);

      // Restore game!
      bossTime = false;
      nextDifficulty = time + 10000;
      nextEnemy = BOSS_EXPLOSION_DURATION + time;
      updateNextEnemy();
      nextPowerup = BOSS_EXPLOSION_DURATION + time;

      return destroyedBossSprites.map((sprite) => {
        calculateSpriteFinalState(sprite, this.width, this.height);
        return new Shard(
          sprite,
          this.x - Math.floor(this.width / 2),
          this.y - Math.floor(this.height / 2),
          BOSS_EXPLOSION_DURATION,
          time
        );
      });
    }

    this.lastTime = time;

    const hitTimeEllapsed = time - this.hitTime;
    let hitTint = 0;
    if (hitTimeEllapsed < 400) {
      hitTint = (400 - hitTimeEllapsed) / 400;
    }
    ctx.save();
    ctx.drawImage(
      bossShip,
      this.x - Math.floor(this.width / 2),
      this.y - Math.floor(this.height / 2),
      this.width,
      this.height
    );
    if (hitTint > 0) {
      ctx.globalAlpha = hitTint;
      ctx.drawImage(
        bossHit,
        this.x - Math.floor(this.width / 2),
        this.y - Math.floor(this.height / 2),
        this.width,
        this.height
      );
    }
    ctx.restore();

    if (!shipDestroyed && this.phase === BOSS_FIGHT) {
      // Fire bullets if needed
      if (this.nextBullet < time) {
        sounds.enemyFire();
        const bullets = [];
        if (this.bulletCount < 5 * this.difficulty) {
          let offsetX, offsetY;
          switch (Math.floor(this.bulletCount / this.difficulty)) {
            case 0:
              offsetX = 28;
              offsetY = 119;
              break;
            case 1:
              offsetX = 42;
              offsetY = 123;
              break;
            case 2:
              offsetX = 108;
              offsetY = 94;
              break;
            case 3:
              offsetX = 121;
              offsetY = 80;
              break;
            default:
              offsetX = 143;
              offsetY = 50;
              break;
          }
          // Side bullets
          bullets.push(
            new EnemyBullet(
              this.x - offsetX,
              this.y + offsetY,
              this.x - offsetX,
              this.y + offsetY + 100,
              0.5,
              time
            )
          );
          bullets.push(
            new EnemyBullet(
              this.x + offsetX,
              this.y + offsetY,
              this.x + offsetX,
              this.y + offsetY + 100,
              0.5,
              time
            )
          );
        } else {
          // Targeted bullets
          bullets.push(new EnemyBullet(this.x, this.y + 125, x, y, 0.3, time));
        }
        this.bulletCount++;
        if (this.bulletCount >= 10 * this.difficulty) {
          this.bulletCount = 0;
          this.nextBullet = time + 800;
        } else if (this.bulletCount > 5 * this.difficulty) {
          this.nextBullet = time + 200;
        } else if (this.bulletCount === 5 * this.difficulty) {
          this.nextBullet = time + 800;
        } else {
          // this.bulletCount < 5 * this.level
          if (this.bulletCount % this.difficulty) {
            this.nextBullet = time + 180;
          } else {
            this.nextBullet = time + 500;
          }
        }
        return [this, ...bullets];
      }
    }

    return true;
  }

  updateHitBox() {
    this.hitBox = [this.x, this.y, this.width, this.height, bossMask];
  }

  hit(power, now) {
    this.hitTime = now;
    this.health -= power;
    if (this.health > 0) {
      sounds.enemyHit();
    }
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
let bossTime;

const POWERUP_INTERVAL = 9000;

let lastTime;
function gameRender(now) {
  const ellapsed = now - lastTime;
  lastTime = now;
  if (ellapsed > 160) {
    // First frame or detecting a pause
    initialTime += ellapsed;
    // We don't want the controls to get stuck
    keysPressed = [];
    return;
  }

  if (!shipDestroyed) {
    // Check pressed keys
    const toTravel = SHIP_SPEED * ellapsed,
      keyUp = keysPressed[38] || keysPressed[90],
      keyDown = keysPressed[40] || keysPressed[83],
      keyLeft = keysPressed[37] || keysPressed[65],
      keyRight = keysPressed[39] || keysPressed[68];

    if (keyUp || keyDown || keyLeft || keyRight) {
      const distance =
        (keyUp || keyDown) && (keyLeft || keyRight)
          ? (toTravel ** 2 / 2) ** 0.5
          : toTravel;
      if (keyUp) {
        y -= distance;
      }
      if (keyDown) {
        y += distance;
      }
      if (keyLeft) {
        x -= distance;
      }
      if (keyRight) {
        x += distance;
      }
      // We don't want to move to the pointer position unless it's updated
      move_x = x;
      move_y = y;
    } else {
      // Move ship with pointer
      let vx = move_x - x,
        vy = move_y - y;
      const distance = Math.hypot(vx, vy);

      if (distance < toTravel) {
        x = move_x;
        y = move_y;
      } else {
        x += (vx / distance) * toTravel;
        y += (vy / distance) * toTravel;
      }
    }
    if (x - Math.floor(shipWidth / 2) < 0) {
      x = Math.floor(shipWidth / 2);
    } else if (x + Math.floor(shipWidth / 2) > CANVAS_WIDTH) {
      x = CANVAS_WIDTH - Math.floor(shipWidth / 2);
    }
    if (y - Math.floor(shipHeight / 2) < 0) {
      y = Math.floor(shipHeight / 2);
    } else if (y + Math.floor(shipHeight / 2) > CANVAS_HEIGHT) {
      y = CANVAS_HEIGHT - Math.floor(shipHeight / 2);
    }
    shipHitBox = [x, y, shipWidth, shipHeight, shipMask];
  }

  // Reset canvas
  const ctx = a.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Paint background stars
  let s;

  for (
    let i = 100;
    i--;
    ctx.fillStyle = STAR_COLORS[i % STAR_COLORS.length],
      ctx.beginPath(),
      ctx.arc(
        Math.floor(
          ((100 - i) * (CANVAS_WIDTH - STARS_WIDTH) * (x - shipWidth / 2)) /
            (100 * (CANVAS_WIDTH - shipWidth))
        ) +
          ((102797 * (1 + Math.sin(s)) * i) % STARS_WIDTH),
        (CANVAS_HEIGHT * (Math.tan(i / 9) + (s * (now - initialTime)) / 3000)) %
          CANVAS_HEIGHT,
        (s - 0.3) * 3.3,
        0,
        7
      ),
      ctx.fill()
  )
    s = 150 / (i * 3 + 200);

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
      const shieldCanvas = shields[Math.max(0, shields.length - shieldLevel)];
      // Paint shield
      ctx.drawImage(
        shieldCanvas,
        x - Math.floor(shieldCanvas.width / 2),
        y - Math.floor(shieldCanvas.height / 2)
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
    ctx.font = "40px Helvetica";
    ctx.fillText("Game Over", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

    ctx.restore();
  }

  // Paint bomb
  if (bombEffect > now - initialTime) {
    ctx.save();
    // Fill style is already white
    ctx.globalAlpha = (bombEffect - now + initialTime) / BOMB_DURATION;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();
  }

  // Paint HUD
  ctx.textBaseline = "top";
  ctx.font = "16px Helvetica";
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
    sounds.bullet();
  }
  if (nextDifficulty < now - initialTime && !bossTime) {
    increaseDifficulty();
    if (difficulty % 5) {
      nextDifficulty = now - initialTime + 10000;
    } else {
      bossTime = true;
      entities.push(new Boss(Math.floor(difficulty / 5), now - initialTime));
    }
  }

  // Should we spawn powerup
  if (nextPowerup < now - initialTime && !bossTime) {
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
  if (nextEnemy < now - initialTime && !bossTime) {
    const enemyDifficulty = enemyRandomizer.si(
      Math.min(Math.max(difficulty - 2, 0), enemyBlueprints.length - 3),
      Math.min(difficulty, enemyBlueprints.length - 1)
    );

    const [
      enemyShip,
      enemyMask,
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
        enemyMask,
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
    updateNextEnemy();
  }

  if (shipDestroyed && gameOverTime + 3500 < now - initialTime) {
    // Update highscores if needed
    updateHighscores();

    state = STATE_INTRO;
    introInhibitPress = pointer_down;
  }
}

/* Compute mouse / touch coordinates on the canvas */

function handleMouseEvent(e) {
  e.preventDefault();
  let offsetLeft, offsetTop, offsetWidth, offsetHeight;
  if (a.offsetWidth / a.offsetHeight > CANVAS_WIDTH / CANVAS_HEIGHT) {
    // Wider
    offsetTop = 0;
    offsetHeight = a.offsetHeight;
    offsetWidth = (offsetHeight * CANVAS_WIDTH) / CANVAS_HEIGHT;
    offsetLeft = Math.floor(a.offsetWidth - offsetWidth) / 2;
  } else {
    // Narrower
    offsetLeft = 0;
    offsetWidth = a.offsetWidth;
    offsetHeight = (offsetWidth * CANVAS_HEIGHT) / CANVAS_WIDTH;
    offsetTop = Math.floor(a.offsetHeight - offsetHeight) / 2;
  }
  let pointer = {};
  if (e.changedTouches) {
    pointer = e.changedTouches[0];
  } else {
    pointer = e;
  }
  move_x = Math.floor(
    ((pointer.pageX - offsetLeft) * CANVAS_WIDTH) / offsetWidth
  );
  move_y = Math.floor(
    ((pointer.pageY - offsetTop) * CANVAS_HEIGHT) / offsetHeight
  );
}

/* Down */
self.ontouchstart = self.onpointerdown = (e) => {
  pointer_down = true;
  handleMouseEvent(e);
};

/* Move */
self.ontouchmove = self.onpointermove = handleMouseEvent;

/* Up */
self.ontouchend = self.onpointerup = (e) => {
  e.preventDefault();
  pointer_down = false;
};

self.onkeydown = self.onkeyup = (e) => {
  anyKeyPressed = keysPressed[e.keyCode] = e.type[5];
};

// Let's run the game
a.width = CANVAS_WIDTH;
a.height = CANVAS_HEIGHT;
let c = a.getContext("2d");
function renderWrapper(now) {
  render(now);
  requestAnimationFrame(renderWrapper);
}
requestAnimationFrame(renderWrapper);
