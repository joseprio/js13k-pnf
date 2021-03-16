import { generateShip, Randomizer } from "starshipwright";
import {
  createSprites,
  generateSpriteFinalState,
  SPRITE_CENTER_X,
  SPRITE_CENTER_Y,
  SPRITE_OFFSET_X,
  SPRITE_OFFSET_Y,
  SPRITE_CANVAS,
  SPRITE_TRANSLATE_X,
  SPRITE_TRANSLATE_Y,
  SPRITE_ANGLE,
} from "./voronoi";
import {
  trimCanvas,
  createFavicon,
  createCanvas,
  obtainImageData,
  fillCircle,
} from "./utils";
import * as sounds from "./sounds";

const STAR_COLORS = ["#9af", "#abf", "#ccf", "#fef", "#fee", "#fc9", "#fc6"];

function hitEffect(canvas) {
  const destCanvas = createCanvas(canvas.width, canvas.height);
  const imageData = obtainImageData(canvas);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
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
    const shieldPhase = createCanvas(shipWidth * 2, shipHeight * 2);
    const shieldPhaseCtx = shieldPhase.getContext("2d");

    for (let offsetY = 0; offsetY < 3; offsetY++) {
      for (let offsetX = 0; offsetX < 3; offsetX++) {
        shieldPhaseCtx.drawImage(
          phases[0],
          halfShipWidth - phases.length - 1 + offsetX,
          halfShipHeight - phases.length - 1 + offsetY
        );
      }
    }
    shieldPhaseCtx.globalCompositeOperation = "source-in";
    // Solid cyan
    shieldPhaseCtx.fillStyle = c > 5 ? "#0ff" : "#00f";
    shieldPhaseCtx.fillRect(0, 0, shieldPhase.width, shieldPhase.height);
    shieldPhaseCtx.globalCompositeOperation = "source-over";
    shieldPhaseCtx.drawImage(
      phases[0],
      halfShipWidth - phases.length,
      halfShipHeight - phases.length
    );
    phases.unshift(trimCanvas(shieldPhase));
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
  const canvas = createCanvas(20, 60);
  const ctx = canvas.getContext("2d");
  // gold filled rect
  ctx.fillStyle = "#ff0";
  ctx.beginPath();
  ctx.moveTo(10, 60);
  ctx.lineTo(0, 10);
  ctx.arc(10, 10, 10, Math.PI, 0);
  ctx.lineTo(10, 60);
  ctx.fill();

  // shadow
  ctx.strokeStyle = "#0ff";
  ctx.shadowColor = "#00f";
  // restrict new draw to cover existing pixels
  ctx.globalCompositeOperation = "source-atop";
  // shadowed stroke
  // "source-atop" clips off the undesired outer shadow
  ctx.shadowBlur = 4;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(10, 70);
  ctx.lineTo(-3, 10);
  ctx.arc(10, 10, 13, Math.PI, 0);
  ctx.lineTo(10, 70);
  ctx.stroke();

  return [canvas, obtainImageData(canvas).data];
}

function generateEnemyBulletFrame(colorStop) {
  const canvas = createCanvas(20, 20);
  const ctx = canvas.getContext("2d");
  const grd = ctx.createRadialGradient(10, 10, 0, 10, 10, 10);
  grd.addColorStop(colorStop, "#ff0");
  grd.addColorStop(1, "#f00");
  ctx.fillStyle = grd;
  fillCircle(ctx, 10, 10, 10);

  return canvas;
}

function generateEnemyBullet() {
  const frames = [];
  for (let c = 0; c < 9; c++) {
    frames.unshift(generateEnemyBulletFrame(c / 10));
    frames.push(generateEnemyBulletFrame(c / 10));
  }
  return frames;
}

function generatePowerupCanvas() {
  const canvas = createCanvas(60, 60);
  const ctx = canvas.getContext("2d");
  const grd = ctx.createRadialGradient(30, 30, 0, 30, 30, 30);
  grd.addColorStop(0.6, "#008");
  grd.addColorStop(1, "#00f");
  ctx.fillStyle = grd;
  fillCircle(ctx, 30, 30, 30);
  return [canvas, obtainImageData(canvas).data];
}

function flipCanvas(canvas) {
  const flippedCanvas = createCanvas(canvas.width, canvas.height);
  const ctx = flippedCanvas.getContext("2d");
  ctx.scale(1, -1);
  ctx.drawImage(canvas, 0, 0, canvas.width, -canvas.height);
  return flippedCanvas;
}

function generateNewTag() {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 20px Helvetica";
  ctx.translate(50, 50);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText("NEW!", 0, 0);
  trimCanvas(canvas);
  const tagCanvas = createCanvas(canvas.width + 10, canvas.height + 10);
  const tagCtx = tagCanvas.getContext("2d");
  tagCtx.fillStyle = "#f00";
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

const gameCanvas = g;
const gameCtx = gameCanvas.getContext("2d");
const faction = new Randomizer("piBbgDn4CZqlkqiF");
const ship = trimCanvas(generateShip(faction, "ie7jMyCFouoUjkVs", 60));
const destroyedShipSprites = createSprites(ship);
const shipWidth = ship.width;
const shipHeight = ship.height;
const halfShipWidth = Math.floor(shipWidth / 2);
const halfShipHeight = Math.floor(shipHeight / 2);
const shipMask = obtainImageData(ship).data;

const BOMB_DURATION = 1000;
const shields = generateShields();

const enemyBlueprints = [];

const [bullet, bulletMask] = generateBullet();
const enemyBulletFrames = generateEnemyBullet();
const enemyBulletMask = obtainImageData(enemyBulletFrames[0]).data;

const [powerupCanvas, powerupMask] = generatePowerupCanvas();

const STATE_LOADING = 0,
  STATE_INTRO = 1,
  STATE_GAME = 2;
const highscores = JSON.parse(self.localStorage["pnf_highscores"] || 0) || [];
const newTag = generateNewTag();

let pointer_down = false;
let introInhibitPress = false;

let touch_previous_x,
  touch_previous_y,
  move_x,
  move_y,
  x,
  y,
  keysPressed = [],
  anyKeyPressed = false;

let shipHitBox = [x, y, shipWidth, shipHeight, shipMask];
let shipDestroyed;
let gameOverTime;
let fastFire;
let bombEffect;
let shieldLevel;

let initialTime = performance.now();
let difficulty;
let score;
let scoreText;
let state = STATE_LOADING;

let highlightHighscore = -1;

// Create favicon
createFavicon(ship);

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
    highscores.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
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
    trimCanvas(
      generateShip(new Randomizer("HYj7ADLjQr6icLtO"), "CdiB9N2ZoQWuAxur", 270)
    )
  );
  bossHit = hitEffect(bossShip);
  destroyedBossSprites = createSprites(bossShip);
  bossMask = obtainImageData(bossShip).data;
}

function generateEnemy(faction, seed, size, ...more) {
  const enemyShip = flipCanvas(
    generateShip(new Randomizer(faction), seed, size)
  );
  return [enemyShip, undefined, undefined, undefined, ...more];
}

function generateEnemyAssets(enemyBlueprint) {
  const enemyShip = trimCanvas(enemyBlueprint[0]);
  enemyBlueprint[1] = obtainImageData(enemyShip).data;
  enemyBlueprint[2] = hitEffect(enemyShip);
  enemyBlueprint[3] = createSprites(enemyShip);
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

function render(now) {
  if (state === STATE_GAME) {
    gameRender(now);
  } else {
    // STATE_LOADING or STATE_INTRO
    introRender(now);
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
  move_x = x = HALF_CANVAS_WIDTH;
  move_y = y = Math.floor(CANVAS_HEIGHT * 0.9);
  fastFire = 0;
  bombEffect = 0;
  shieldLevel = 1;
  bossTime = false;
  highlightHighscore = -1;
}

function introRender(now) {
  // reset
  gameCtx.fillStyle = "#002";
  gameCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Intro starfield
  gameCtx.save();
  for (let c = 200; c--; ) {
    gameCtx.fillStyle = STAR_COLORS[c % STAR_COLORS.length];
    const r = 50 / (6 - (((now - initialTime) / 3000 + c / 13) % 6));
    gameCtx.globalAlpha = Math.min(r / 100, 1);
    fillCircle(
      gameCtx,
      Math.cos(c) * r + HALF_CANVAS_WIDTH,
      Math.sin(c * c) * r + HALF_CANVAS_HEIGHT,
      r / 200
    );
  }

  gameCtx.restore();
  gameCtx.fillStyle = "#fff";
  gameCtx.textBaseline = "middle";
  gameCtx.textAlign = "center";
  if (state === STATE_INTRO) {
    gameCtx.font =
      "italic small-caps 40px Futura-CondensedMedium,sans-serif-condensed,sans-serif";
    if (highscores.length) {
      gameCtx.fillText("High Scores", HALF_CANVAS_WIDTH, 100);

      gameCtx.save();
      gameCtx.textAlign = "start";
      gameCtx.textBaseline = "top";
      for (let c = 0; c < highscores.length; c++) {
        gameCtx.fillStyle = "#fff";
        if (c === highlightHighscore) {
          gameCtx.save();
          gameCtx.translate(90, 185 + 80 * c);
          gameCtx.drawImage(
            newTag,
            -Math.floor(newTag.width / 2),
            -Math.floor(newTag.height / 2)
          );
          gameCtx.restore();
          gameCtx.fillStyle = "#fc6";
        }
        const score = Intl.NumberFormat().format(highscores[c][0]);
        const time = new Date(highscores[c][1]).toLocaleString();
        gameCtx.font = "50px Helvetica";
        gameCtx.fillText(c + 1, 115, 160 + 80 * c);
        gameCtx.font = "60px Helvetica";
        gameCtx.fillText("{", 145, 150 + 80 * c);
        gameCtx.font = "25px Helvetica";
        gameCtx.fillText(score + " points", 170, 160 + 80 * c);
        gameCtx.font = "15px Helvetica";
        gameCtx.fillText(time, 170, 190 + 80 * c);
      }

      gameCtx.restore();
    } else {
      gameCtx.fillText(
        "Planet Not Found",
        HALF_CANVAS_WIDTH,
        HALF_CANVAS_HEIGHT
      );
    }
    gameCtx.font = "20px Helvetica";
    gameCtx.fillText(
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
    gameCtx.font = "italic 30px Helvetica";
    gameCtx.fillText("Loading\u2026", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
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
  const o1Left = Math.round(o1[0] - o1[2] / 2);
  const o1Top = Math.round(o1[1] - o1[3] / 2);
  const o2Left = Math.round(o2[0] - o2[2] / 2);
  const o2Top = Math.round(o2[1] - o2[3] / 2);
  // Do bounding boxes collide
  if (
    o1Left < o2Left + o2[2] &&
    o1Left + o1[2] > o2Left &&
    o1Top < o2Top + o2[3] &&
    o1Top + o1[3] > o2Top
  ) {
    // Create the collision bounding box
    const collisionEndX = Math.min(o1Left + o1[2], o2Left + o2[2]);
    const collisionEndY = Math.min(o1Top + o1[3], o2Top + o2[3]);
    const [o1StartX, o2StartX, collisionWidth] =
      o1Left > o2Left
        ? [0, o1Left - o2Left, collisionEndX - o1Left]
        : [o2Left - o1Left, 0, collisionEndX - o2Left];
    const [o1StartY, o2StartY, collisionHeight] =
      o1Top > o2Top
        ? [0, o1Top - o2Top, collisionEndY - o1Top]
        : [o2Top - o1Top, 0, collisionEndY - o2Top];
    for (let c = 0; c < collisionHeight; c++) {
      for (let d = 0; d < collisionWidth; d++) {
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
    sounds.explosion(1);
    shipDestroyed = true;
  }
}

const powerupDefinitions = [
  [
    "F",
    "#fa0",
    (time) => {
      fastFire = time + 6500;
    },
  ],
  [
    "S",
    "#0ff",
    () => {
      sounds.shieldPowerup();
      shieldLevel++;
    },
  ],
  [
    "B",
    "#f00",
    (time) => {
      sounds.explosion(1.5);
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
    this.powerupType = typeIndex;
    this.lastTime = time;
    this.alwaysOnTop = true;
  }

  run(time) {
    this.y += (5 * (time - this.lastTime)) / 32;

    const hitBox = [
      this.x,
      this.y,
      powerupCanvas.width,
      powerupCanvas.height,
      powerupMask,
    ];
    const textScale = 1.5 + Math.sin(time / 200) / 2;

    // Check powerup against ship
    if (!shipDestroyed && collide(shipHitBox, hitBox)) {
      powerupDefinitions[this.powerupType][2](time);
      return false;
    }

    if (this.y - Math.floor(powerupCanvas.height / 2) > CANVAS_HEIGHT) {
      return false;
    }
    this.lastTime = time;
    gameCtx.save();
    gameCtx.translate(this.x, this.y);
    gameCtx.drawImage(
      powerupCanvas,
      -powerupCanvas.width / 2,
      -powerupCanvas.height / 2
    );
    gameCtx.textAlign = "center";
    gameCtx.textBaseline = "top";
    gameCtx.font = "700 " + Math.floor(textScale * 25) + "px Helvetica";
    const measure = gameCtx.measureText(
      powerupDefinitions[this.powerupType][0]
    );
    const textHeight =
      measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
    gameCtx.fillStyle = powerupDefinitions[this.powerupType][1];
    gameCtx.fillText(
      powerupDefinitions[this.powerupType][0],
      0,
      -Math.floor(textHeight / 2)
    );
    gameCtx.restore();
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

  run(time) {
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

    if (this.y + bullet.height / 2 < 0) {
      return false;
    }
    this.lastTime = time;
    gameCtx.drawImage(
      bullet,
      this.x - bullet.width / 2,
      this.y - bullet.height / 2
    );
    return true;
  }
}

const ENEMY_EXPLOSION_DURATION = 500;
const BOSS_EXPLOSION_DURATION = 500;
const PLAYER_EXPLOSION_DURATION = 1500;

class Shard {
  constructor(sprite, shipX, shipY, duration, creation) {
    this.creation = creation;
    this.sprite = sprite;
    this.shipX = shipX;
    this.shipY = shipY;
    this.explosionDuration = duration;
  }

  run(time) {
    const progress = (time - this.creation) / this.explosionDuration;
    if (progress > 1) {
      // Explosion is over
      return false;
    }
    gameCtx.save();
    gameCtx.globalAlpha = 1 - progress ** 2;
    gameCtx.translate(
      this.shipX +
        this.sprite[SPRITE_CENTER_X] +
        this.sprite[SPRITE_TRANSLATE_X] * progress,
      this.shipY +
        this.sprite[SPRITE_CENTER_Y] +
        this.sprite[SPRITE_TRANSLATE_Y] * progress
    );
    gameCtx.rotate(this.sprite[SPRITE_ANGLE] * progress);
    gameCtx.drawImage(
      this.sprite[SPRITE_CANVAS],
      this.sprite[SPRITE_OFFSET_X],
      this.sprite[SPRITE_OFFSET_Y]
    );
    gameCtx.restore();

    return true;
  }
}

class EnemyBullet {
  constructor(startX, startY, destinationX, destinationY, speed, time) {
    this.w = enemyBulletFrames[0].width;
    this.h = enemyBulletFrames[0].height;
    this.x = startX;
    this.y = startY;
    const magnitude = Math.hypot(destinationX - startX, destinationY - startY);
    this.xFactor = (destinationX - startX) / magnitude;
    this.yFactor = (destinationY - startY) / magnitude;
    this.lastTime = time;
    this.s = speed;
    this.alwaysOnTop = true;
  }

  run(time) {
    // Destroy bullets if bomb time
    if (bombEffect > time) {
      return false;
    }
    const ellapsed = time - this.lastTime;
    this.y += ellapsed * this.s * this.yFactor;
    this.x += ellapsed * this.s * this.xFactor;

    // Check collision to ship
    if (
      collide(shipHitBox, [this.x, this.y, this.w, this.h, enemyBulletMask])
    ) {
      hitShip();
      if (!shipDestroyed) {
        return false;
      }
    }

    // Make it disappear after it leaves the screen
    if (
      this.y - this.h / 2 > CANVAS_HEIGHT ||
      this.y + this.h / 2 < 0 ||
      this.x - this.w / 2 > CANVAS_WIDTH ||
      this.x + this.w / 2 < 0
    ) {
      return false;
    }

    this.lastTime = time;

    gameCtx.drawImage(
      enemyBulletFrames[time % enemyBulletFrames.length | 0],
      this.x - this.w / 2,
      this.y - this.h / 2
    );
    return true;
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
        x + 100 * Math.cos(angle),
        y + 100 * Math.sin(angle),
        speed,
        time
      )
    );
  }
  return bullets;
}

class Enemy {
  constructor(
    [
      canvas,
      mask,
      hitCanvas,
      destroyedSprites,
      health,
      speed,
      deathBullets,
      fireSequences,
    ],
    startX,
    points,
    time
  ) {
    this.fireAngle = enemyRandomizer.sd(0, Math.PI * 2);
    this.canvas = canvas;
    this.enemyMask = mask;
    this.hitCanvas = hitCanvas;
    this.w = canvas.width;
    this.h = canvas.height;
    this.health = health;
    this.x = startX;
    this.y = -canvas.height / 2;
    this.lastTime = time;
    this.hitTime = 0;
    this.destroyedSprites = destroyedSprites;
    this.s = speed;
    this.killPoints = points;
    this.deathBullets = deathBullets;
    this.fireSequences = fireSequences;
  }

  run(time) {
    const originalY = this.y;
    let isDead = false;
    // Destroy enemies if no health or bomb time
    if (this.health <= 0 || bombEffect > time) {
      isDead = true;
    } else {
      const ellapsed = time - this.lastTime;
      this.y += ellapsed * this.s;
      // Update hit box
      this.hitBox = [this.x, this.y, this.w, this.h, this.enemyMask];

      // Check collision to ship
      if (collide(shipHitBox, this.hitBox)) {
        hitShip();
        if (!shipDestroyed) {
          isDead = true;
        }
      }
    }

    if (isDead) {
      sounds.explosion(this.w / 275);
      // Add score
      addScore(this.killPoints);
      // Return array with pieces
      const returnEntities =
        this.deathBullets > 0
          ? fireBullets(
              this.deathBullets,
              this.x,
              this.y + 17 * this.s,
              this.fireAngle,
              0.45,
              time
            )
          : [];

      return returnEntities.concat(
        this.destroyedSprites.map((sprite) => {
          return new Shard(
            generateSpriteFinalState(sprite, this.w, this.h),
            this.x - this.w / 2,
            this.y - this.h / 2,
            ENEMY_EXPLOSION_DURATION,
            time
          );
        })
      );
    }

    // Make it disappear after it leaves the screen
    if (this.y - this.h / 2 > CANVAS_HEIGHT) {
      return false;
    }

    this.lastTime = time;

    gameCtx.save();
    gameCtx.drawImage(this.canvas, this.x - this.w / 2, this.y - this.h / 2);
    const hitTint = 400 - time + this.hitTime;
    if (hitTint > 0) {
      gameCtx.globalAlpha = hitTint / 400;
      gameCtx.drawImage(
        this.hitCanvas,
        this.x - this.w / 2,
        this.y - this.h / 2
      );
    }
    gameCtx.restore();

    if (!shipDestroyed) {
      for (let c = 0; c < this.fireSequences.length; c++) {
        const fireY = this.fireSequences[c][0];
        if (originalY < fireY && this.y > fireY) {
          sounds.enemyFire();
          const bulletAmount = this.fireSequences[c][1];
          const fromY = this.y + 17 * this.s;
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
    this.health = 1e9;
    this.lastTime = time;
    this.w = bossShip.width;
    this.h = bossShip.height;
    this.x = HALF_CANVAS_WIDTH;
    this.y = -this.h / 2;
    this.moveDirection = DIRECTION_RIGHT;
    this.hitTime = 0;
    this.difficulty = difficulty;
  }

  run(time) {
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
        if (this.moveDirection === DIRECTION_RIGHT) {
          this.x += ellapsed * 0.1;
          if (this.x + this.w / 2 > CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.w / 2;
            this.moveDirection = DIRECTION_LEFT;
          }
        } else {
          this.x -= ellapsed * 0.1;
          if (this.x - this.w / 2 < 0) {
            this.x = this.w / 2;
            this.moveDirection = DIRECTION_RIGHT;
          }
        }
      }

      // Update hit box
      this.hitBox = [this.x, this.y, this.w, this.h, bossMask];

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
        return new Shard(
          generateSpriteFinalState(sprite, this.w, this.h),
          this.x - this.w / 2,
          this.y - this.h / 2,
          BOSS_EXPLOSION_DURATION,
          time
        );
      });
    }

    this.lastTime = time;

    gameCtx.save();
    gameCtx.drawImage(bossShip, this.x - this.w / 2, this.y - this.h / 2);
    const hitTint = 400 - time + this.hitTime;
    if (hitTint > 0) {
      gameCtx.globalAlpha = hitTint / 400;
      gameCtx.drawImage(bossHit, this.x - this.w / 2, this.y - this.h / 2);
    }
    gameCtx.restore();

    if (!shipDestroyed && this.phase === BOSS_FIGHT) {
      // Fire bullets if needed
      if (this.nextBullet < time) {
        sounds.enemyFire();
        const bullets = [];
        if (this.bulletCount < 5 * this.difficulty) {
          const [offsetX, offsetY] = [
            [28, 119],
            [42, 123],
            [108, 94],
            [121, 80],
            [143, 50],
            [28, 119],
          ][Math.floor(this.bulletCount / this.difficulty)];

          // Side bullets
          bullets.push(
            new EnemyBullet(
              this.x - offsetX,
              this.y + offsetY,
              this.x - offsetX,
              this.y + offsetY + 100,
              0.5,
              time
            ),
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
        toTravel / ((keyUp || keyDown) && (keyLeft || keyRight) ? 2 ** 0.5 : 1);
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
      const vx = move_x - x,
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
    if (x < halfShipWidth) {
      x = halfShipWidth;
    } else if (x > CANVAS_WIDTH - halfShipWidth) {
      x = CANVAS_WIDTH - halfShipWidth;
    }
    if (y < halfShipHeight) {
      y = halfShipHeight;
    } else if (y > CANVAS_HEIGHT - halfShipHeight) {
      y = CANVAS_HEIGHT - halfShipHeight;
    }
    shipHitBox = [x, y, shipWidth, shipHeight, shipMask];
  }

  // Reset canvas
  gameCtx.fillStyle = "#002";
  gameCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Paint background stars
  for (
    let i = 100, s;
    i--;
    gameCtx.fillStyle = STAR_COLORS[i % STAR_COLORS.length],
      fillCircle(
        gameCtx,
        Math.floor(
          ((100 - i) * (CANVAS_WIDTH - STARS_WIDTH) * (x - halfShipWidth)) /
            (100 * (CANVAS_WIDTH - shipWidth))
        ) +
          ((102797 * (1 + Math.sin(s)) * i) % STARS_WIDTH),
        (CANVAS_HEIGHT * (Math.tan(i / 9) + (s * (now - initialTime)) / 3000)) %
          CANVAS_HEIGHT,
        (s - 0.3) * 3.3
      )
  )
    s = 150 / (i * 3 + 200);

  const previousShipDestroyed = shipDestroyed;

  // Run entities
  const nextEntities = [],
    alwaysOnTop = [],
    nextHitables = [];
  function runEntity(entity) {
    const result = entity.run(now - initialTime);
    if (Array.isArray(result)) {
      result.map((subEntity) => {
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
    } else if (result) {
      if (entity.alwaysOnTop) {
        alwaysOnTop.push(entity);
      } else {
        nextEntities.push(entity);
      }
      if (entity.hit) {
        nextHitables.push(entity);
      }
    }
  }
  entities.map(runEntity);

  if (!previousShipDestroyed && shipDestroyed) {
    // Record time
    gameOverTime = now - initialTime;
    // add shards
    destroyedShipSprites
      .map((sprite) => {
        return new Shard(
          generateSpriteFinalState(sprite, shipWidth, shipHeight),
          x - halfShipWidth,
          y - halfShipHeight,
          PLAYER_EXPLOSION_DURATION,
          now - initialTime
        );
      })
      .map(runEntity);
  }

  entities = nextEntities.concat(alwaysOnTop);
  hitables = nextHitables;

  // Common styles
  gameCtx.fillStyle = "#fff";
  gameCtx.textAlign = "center";

  if (!shipDestroyed) {
    if (shieldLevel) {
      const shieldCanvas = shields[Math.max(0, shields.length - shieldLevel)];
      // Paint shield
      gameCtx.drawImage(
        shieldCanvas,
        x - shieldCanvas.width / 2,
        y - shieldCanvas.height / 2
      );
    }
    // Paint ship
    gameCtx.drawImage(ship, x - halfShipWidth, y - halfShipHeight);
  } else {
    // Paint game over
    gameCtx.save();
    gameCtx.globalAlpha = Math.min(
      1,
      (now - initialTime - gameOverTime) / 2000
    );
    gameCtx.textBaseline = "middle";
    gameCtx.font = "40px Helvetica";
    gameCtx.fillText("Game Over", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);

    gameCtx.restore();
  }

  // Paint bomb
  if (bombEffect > now - initialTime) {
    gameCtx.save();
    // Fill style is already white
    gameCtx.globalAlpha = (bombEffect - now + initialTime) / BOMB_DURATION;
    gameCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameCtx.restore();
  }

  // Paint HUD
  gameCtx.textBaseline = "top";
  gameCtx.font = "16px Helvetica";
  gameCtx.fillText(scoreText, HALF_CANVAS_WIDTH, 5);

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
    // Increase difficulty and check
    if (++difficulty % 5) {
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
        // Increasing it here to optimize for size
        powerupIndex++,
        now - initialTime
      )
    );
    powerupIndex %= powerupDefinitions.length;
    nextPowerup = now - initialTime + POWERUP_INTERVAL;
  }

  // Should we spawn enemy
  if (nextEnemy < now - initialTime && !bossTime) {
    const enemyDifficulty = enemyRandomizer.si(
      Math.min(Math.max(difficulty - 2, 0), enemyBlueprints.length - 3),
      Math.min(difficulty, enemyBlueprints.length - 1)
    );

    entities.push(
      new Enemy(
        enemyBlueprints[enemyDifficulty],
        enemyRandomizer.si(30, CANVAS_WIDTH - 30),
        (enemyDifficulty + 1) * 50,
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

function processPointerEvent(e) {
  e.preventDefault();
  const ratio = CANVAS_WIDTH / CANVAS_HEIGHT;
  const [actualOffsetWidth, actualOffsetHeight] =
    gameCanvas.offsetWidth / gameCanvas.offsetHeight > ratio
      ? // Wider
        [gameCanvas.offsetHeight * ratio, gameCanvas.offsetHeight]
      : // Narrower
        [gameCanvas.offsetWidth, gameCanvas.offsetWidth / ratio];
  const [pointer] = e.changedTouches || [e];
  return [
    Math.floor(
      ((pointer.pageX - (gameCanvas.offsetWidth - actualOffsetWidth) / 2) *
        CANVAS_WIDTH) /
        actualOffsetWidth
    ),
    Math.floor(
      ((pointer.pageY - (gameCanvas.offsetHeight - actualOffsetHeight) / 2) *
        CANVAS_HEIGHT) /
        actualOffsetHeight
    ),
  ];
}

/* Down */
self.onmousedown = (e) => {
  processPointerEvent(e);
  pointer_down = true;
};

self.ontouchstart = (e) => {
  [touch_previous_x, touch_previous_y] = processPointerEvent(e);
  pointer_down = true;
};

/* Move */
self.onmousemove = (e) => {
  [move_x, move_y] = processPointerEvent(e);
};

self.ontouchmove = (e) => {
  const [current_x, current_y] = processPointerEvent(e);
  move_x += current_x - touch_previous_x;
  move_y += current_y - touch_previous_y;
  touch_previous_x = current_x;
  touch_previous_y = current_y;
};

/* Up */
self.ontouchend = self.onmouseup = (e) => {
  processPointerEvent(e);
  pointer_down = false;
};

self.onkeydown = self.onkeyup = (e) => {
  anyKeyPressed = keysPressed[e.keyCode] = e.type[5];
};

// Let's run the game
gameCanvas.width = CANVAS_WIDTH;
gameCanvas.height = CANVAS_HEIGHT;
function renderWrapper(now) {
  render(now);
  requestAnimationFrame(renderWrapper);
}
requestAnimationFrame(renderWrapper);
