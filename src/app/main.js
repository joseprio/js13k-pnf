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
  createCanvas,
  obtainImageData,
  fillCircle,
  getContext,
} from "canvas-utils";
import * as sounds from "./sounds";

function gameCtxWrap(wrappedFunc) {
  gameCtx.save();
  wrappedFunc();
  gameCtx.restore();
}

function createFavicon(img) {
  const [favicon, favCtx] = createCanvas(32, 32);
  let destWidth = 32,
    destHeight = 32;
  if (img.width > img.height) {
    destHeight *= img.height / img.width;
  } else {
    destWidth *= img.width / img.height;
  }
  favCtx.drawImage(img, 0, 0, destWidth, destHeight);

  const link = document.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("href", favicon.toDataURL());
  document.head.appendChild(link);
}

function hitEffect(canvas) {
  const [destCanvas, destCtx] = createCanvas(canvas.width, canvas.height);
  const imageData = obtainImageData(canvas);
  const data = imageData.data;
  for (let c = 0; c < data.length; c += 4) {
    const r = data[c + 0];
    const g = data[c + 1];
    const b = data[c + 2];
    data[c + 0] = 255 - (0.393 * r + 0.769 * g + 0.189 * b);
    data[c + 1] = 255 - (0.349 * r + 0.686 * g + 0.168 * b);
    data[c + 2] = 255 - (0.272 * r + 0.534 * g + 0.131 * b);
  }
  destCtx.putImageData(imageData, 0, 0);
  return destCanvas;
}

function generateShields() {
  const phases = [ship];
  for (let c = 0; c < 10; c++) {
    const [shieldPhase, shieldPhaseCtx] = createCanvas(
      shipWidth * 2,
      shipHeight * 2
    );

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
    const phaseCtx = getContext(phase);
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
  const [canvas, ctx] = createCanvas(20, 60);
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
  const [canvas, ctx] = createCanvas(20, 20);
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
  const [canvas, ctx] = createCanvas(60, 60);
  const grd = ctx.createRadialGradient(30, 30, 0, 30, 30, 30);
  grd.addColorStop(0.6, "#008");
  grd.addColorStop(1, "#00f");
  ctx.fillStyle = grd;
  fillCircle(ctx, 30, 30, 30);
  return [canvas, obtainImageData(canvas).data];
}

function flipCanvas(canvas) {
  const [flippedCanvas, ctx] = createCanvas(canvas.width, canvas.height);
  ctx.scale(1, -1);
  ctx.drawImage(canvas, 0, 0, canvas.width, -canvas.height);
  return flippedCanvas;
}

function generateNewTag() {
  const [canvas, ctx] = createCanvas(100, 100);
  ctx.font = "bold 20px Helvetica";
  ctx.translate(50, 50);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText("NEW!", 0, 0);
  trimCanvas(canvas);
  const [tagCanvas, tagCtx] = createCanvas(
    canvas.width + 10,
    canvas.height + 10
  );
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
const STAR_COLORS = ["#9af", "#abf", "#ccf", "#fef", "#fee", "#fc9", "#fc6"];
const ENEMY_EXPLOSION_DURATION = 500;
const BOSS_EXPLOSION_DURATION = 500;
const PLAYER_EXPLOSION_DURATION = 1500;
const BULLET_SPEED = 20;
const BULLET_POWER = 10;

const gameCanvas = g;
const gameCtx = getContext(gameCanvas);
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
const highscores = JSON.parse(localStorage["pnf_highscores"] || 0) || [];
const newTag = generateNewTag();

let pointer_down = false;
let introInhibitPress = false;

let touch_previous_x,
  touch_previous_y,
  move_x,
  move_y,
  shipX,
  shipY,
  keysPressed = [],
  anyKeyPressed = false;

let shipHitBox;
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

let highlightHighscore;

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
  const newScore = [score, Date.now()];
  if (score) {
    highscores.push(newScore);
    // Sort by score
    highscores.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    // Only keep the top 5
    highscores.length = Math.min(highscores.length, 5);
    localStorage["pnf_highscores"] = JSON.stringify(highscores);
  }
  highlightHighscore = highscores.indexOf(newScore);
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

function generateEnemy([faction, seed, size, ...more]) {
  const enemyShip = flipCanvas(
    generateShip(new Randomizer(faction), seed, size)
  );
  return [enemyShip, 0, 0, 0, ...more];
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
  requestAnimationFrame(render);
}

function newGame() {
  state = STATE_GAME;
  enemyRandomizer = new Randomizer("enemy");
  powerupRandomizer = new Randomizer("powerup");
  nextEnemy = 1000;
  nextDifficulty = 5000;
  nextPowerup = POWERUP_INTERVAL;
  entities = [];
  hitables = [];
  lastTime = initialTime = performance.now();
  addScore(
    (difficulty = powerupIndex = lastBullet = bombEffect = fastFire = score = 0)
  );
  shipDestroyed = false;
  move_x = shipX = HALF_CANVAS_WIDTH;
  move_y = shipY = Math.floor(CANVAS_HEIGHT * 0.9);
  shieldLevel = 1;
  bossTime = false;
}

function introRender(now) {
  // reset
  gameCtx.fillStyle = "#002";
  gameCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Intro starfield
  gameCtxWrap(() => {
    for (let c = 200; c--; ) {
      gameCtx.fillStyle = STAR_COLORS[c % STAR_COLORS.length];
      const r = 50 / (6 - ((now / 3000 + c / 13) % 6));
      gameCtx.globalAlpha = Math.min(r / 100, 1);
      fillCircle(
        gameCtx,
        Math.cos(c) * r + HALF_CANVAS_WIDTH,
        Math.sin(c * c) * r + HALF_CANVAS_HEIGHT,
        r / 200
      );
    }
  });

  gameCtx.fillStyle = "#fff";
  gameCtx.textBaseline = "middle";
  gameCtx.textAlign = "center";
  if (state === STATE_INTRO) {
    gameCtx.font =
      "italic small-caps 40px Futura-CondensedMedium,sans-serif-condensed,sans-serif";
    if (highscores.length) {
      gameCtx.fillText("High Scores", HALF_CANVAS_WIDTH, 100);

      gameCtxWrap(() => {
        gameCtx.textAlign = "start";
        gameCtx.textBaseline = "top";
        for (let c = 0; c < highscores.length; c++) {
          gameCtx.fillStyle = "#fff";
          if (c === highlightHighscore) {
            gameCtx.drawImage(
              newTag,
              90 - Math.floor(newTag.width / 2),
              185 + 80 * c - Math.floor(newTag.height / 2)
            );
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
      });
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
        generateEnemy(enemyDefinitions[enemyBlueprints.length])
      );
    } else {
      for (let c = 0; c < enemyBlueprints.length; c++) {
        if (!enemyBlueprints[c][1]) {
          generateEnemyAssets(enemyBlueprints[c]);
          // This is quite hacky and fragile, but efficient for size
          return;
        }
      }
      state = STATE_INTRO;
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
  // Implicitly returns undefined, which is falsy
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

function Powerup(x, y, powerupType, lastTime) {
  return function (time) {
    y += (5 * (time - lastTime)) / 32;

    const hitBox = [
      x,
      y,
      powerupCanvas.width,
      powerupCanvas.height,
      powerupMask,
    ];
    const textScale = 1.5 + Math.sin(time / 200) / 2;

    // Check powerup against ship
    if (!shipDestroyed && collide(shipHitBox, hitBox)) {
      powerupDefinitions[powerupType][2](time);
      // Returning undefined is falsy
      return;
    }

    if (y - Math.floor(powerupCanvas.height / 2) > CANVAS_HEIGHT) {
      // Returning undefined is falsy
      return;
    }
    lastTime = time;
    gameCtxWrap(() => {
      gameCtx.translate(x, y);
      gameCtx.drawImage(
        powerupCanvas,
        -powerupCanvas.width / 2,
        -powerupCanvas.height / 2
      );
      gameCtx.textAlign = "center";
      gameCtx.textBaseline = "top";
      gameCtx.font = "700 " + Math.floor(textScale * 25) + "px Helvetica";
      const measure = gameCtx.measureText(powerupDefinitions[powerupType][0]);
      const textHeight =
        measure.actualBoundingBoxDescent - measure.actualBoundingBoxAscent;
      gameCtx.fillStyle = powerupDefinitions[powerupType][1];
      gameCtx.fillText(
        powerupDefinitions[powerupType][0],
        0,
        -Math.floor(textHeight / 2)
      );
    });
    // Return 2 for always on top
    return 2;
  };
}

function Bullet(x, y, lastTime) {
  return function (time) {
    y -= (BULLET_SPEED * (time - lastTime)) / 32;

    const hitBox = [x, y, bullet.width, bullet.height, bulletMask];
    // Check collision with hitables
    for (let c = 0; c < hitables.length; c++) {
      if (hitables[c](hitBox, BULLET_POWER, time)) {
        // We're done, get rid of bullet
        // Returning undefined is falsy
        return;
      }
    }

    if (y + bullet.height / 2 < 0) {
      // Returning undefined is falsy
      return;
    }
    lastTime = time;
    gameCtx.drawImage(bullet, x - bullet.width / 2, y - bullet.height / 2);
    return true;
  };
}

function Shard(sprite, shipX, shipY, explosionDuration, creation) {
  return function (time) {
    const progress = (time - creation) / explosionDuration;
    if (progress > 1) {
      // Explosion is over
      // Returning undefined is falsy
      return;
    }
    gameCtxWrap(() => {
      gameCtx.globalAlpha = 1 - progress ** 2;
      gameCtx.translate(
        shipX + sprite[SPRITE_CENTER_X] + sprite[SPRITE_TRANSLATE_X] * progress,
        shipY + sprite[SPRITE_CENTER_Y] + sprite[SPRITE_TRANSLATE_Y] * progress
      );
      gameCtx.rotate(sprite[SPRITE_ANGLE] * progress);
      gameCtx.drawImage(
        sprite[SPRITE_CANVAS],
        sprite[SPRITE_OFFSET_X],
        sprite[SPRITE_OFFSET_Y]
      );
    });

    return true;
  };
}

function EnemyBullet(x, y, destinationX, destinationY, s, lastTime) {
  const w = enemyBulletFrames[0].width;
  const h = enemyBulletFrames[0].height;
  const magnitude = Math.hypot(destinationX - x, destinationY - y);
  const xFactor = (destinationX - x) / magnitude;
  const yFactor = (destinationY - y) / magnitude;

  return function (time) {
    // Destroy bullets if bomb time
    if (bombEffect > time) {
      // Returning undefined is falsy
      return;
    }
    const ellapsed = time - lastTime;
    y += ellapsed * s * yFactor;
    x += ellapsed * s * xFactor;

    // Check collision to ship
    if (collide(shipHitBox, [x, y, w, h, enemyBulletMask])) {
      hitShip();
      if (!shipDestroyed) {
        // Returning undefined is falsy
        return;
      }
    }

    // Make it disappear after it leaves the screen
    if (
      y - h / 2 > CANVAS_HEIGHT ||
      y + h / 2 < 0 ||
      x - w / 2 > CANVAS_WIDTH ||
      x + w / 2 < 0
    ) {
      // Returning undefined is falsy
      return;
    }

    lastTime = time;

    gameCtx.drawImage(
      enemyBulletFrames[time % enemyBulletFrames.length | 0],
      x - w / 2,
      y - h / 2
    );
    return 2;
  };
}

function fireBullets(amount, x, y, initialAngle, speed, time) {
  const bullets = [];
  for (let c = 0; c < amount; c++) {
    const angle = initialAngle + (2 * c * Math.PI) / amount;
    bullets.push(
      EnemyBullet(
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

function Enemy(
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
  x,
  killPoints,
  lastTime
) {
  const fireAngle = enemyRandomizer.sd(0, Math.PI * 2);
  const w = canvas.width;
  const h = canvas.height;
  let y = -canvas.height / 2;
  let hitTime = 0;
  let hitBox;

  function checkHit(otherHitBox, power, now) {
    if (collide(otherHitBox, hitBox)) {
      hitTime = now;
      health -= power;
      if (health > 0) {
        sounds.enemyHit();
      }
      return true;
    }
  }

  return function (time, newEntities) {
    const originalY = y;
    const ellapsed = time - lastTime;
    let isDead = false;
    // Destroy enemies if no health or bomb time
    if (health <= 0 || bombEffect > time) {
      isDead = true;
    } else {
      y += ellapsed * speed;
      // Update hit box
      hitBox = [x, y, w, h, mask];

      // Check collision to ship
      if (collide(shipHitBox, hitBox)) {
        hitShip();
        if (!shipDestroyed) {
          isDead = true;
        }
      }
    }

    if (isDead) {
      sounds.explosion(w / 275);
      // Add score
      addScore(killPoints);
      // Return array with pieces
      if (deathBullets > 0) {
        newEntities.push(
          ...fireBullets(deathBullets, x, y + 17 * speed, fireAngle, 0.45, time)
        );
      }

      destroyedSprites.map((sprite) =>
        newEntities.push(
          Shard(
            generateSpriteFinalState(sprite, w, h),
            x - w / 2,
            y - h / 2,
            ENEMY_EXPLOSION_DURATION,
            time
          )
        )
      );
      // Returning undefined is falsy
      return;
    }

    // Make it disappear after it leaves the screen
    if (y - h / 2 > CANVAS_HEIGHT) {
      // Returning undefined is falsy
      return;
    }

    lastTime = time;

    gameCtx.drawImage(canvas, x - w / 2, y - h / 2);
    const hitTint = 400 - time + hitTime;
    if (hitTint > 0) {
      gameCtxWrap(() => {
        gameCtx.globalAlpha = hitTint / 400;
        gameCtx.drawImage(hitCanvas, x - w / 2, y - h / 2);
      });
    }

    if (!shipDestroyed) {
      for (let c = 0; c < fireSequences.length; c++) {
        const fireY = fireSequences[c][0];
        if (originalY < fireY && y > fireY) {
          sounds.enemyFire();
          const bulletAmount = fireSequences[c][1];
          const fromY = y + 17 * speed;
          if (bulletAmount) {
            // Fire bullet spread, a bit forward as it looks better
            newEntities.push(
              ...fireBullets(bulletAmount, x, fromY, fireAngle, 0.3, time)
            );
          } else {
            // Fire single bullet targeted to the user
            newEntities.push(EnemyBullet(x, fromY, shipX, shipY, 0.3, time));
          }
        }
      }
    }

    return checkHit;
  };
}

const BOSS_WAITING = 0;
const BOSS_COMING = 1;
const BOSS_FIGHT = 2;
const DIRECTION_RIGHT = 0;
const DIRECTION_LEFT = 1;

function Boss(difficulty, time) {
  const w = bossShip.width;
  const h = bossShip.height;
  let phase = BOSS_WAITING;
  let nextPhase = time + 2000;
  // We want to be basically immortal until we start the fight
  let health = 1e9;
  let lastTime = time;
  let x = HALF_CANVAS_WIDTH;
  let y = -h / 2;
  let moveDirection = DIRECTION_RIGHT;
  let hitTime = 0;
  let hitBox;
  let bulletCount = 0;
  let nextBullet;

  function checkHit(otherHitBox, power, now) {
    if (collide(otherHitBox, hitBox)) {
      hitTime = now;
      health -= power;
      if (health > 0) {
        sounds.enemyHit();
      }
      return true;
    }
  }

  return function (time, newEntities) {
    let isDead = false;
    // Destroy enemies if no health or bomb time
    if (health <= 0) {
      isDead = true;
    } else {
      const ellapsed = time - lastTime;
      if (phase === BOSS_WAITING) {
        if (time > nextPhase) {
          phase = BOSS_COMING;
        }
      } else if (phase === BOSS_COMING) {
        y += ellapsed * 0.15;
        if (y > 150) {
          y = 150;
          // Give it normal health
          health = 100 + 250 * difficulty;
          phase = BOSS_FIGHT;
          nextBullet = time;
        }
      } else {
        // Update X
        if (moveDirection === DIRECTION_RIGHT) {
          x += ellapsed * 0.1;
          if (x + w / 2 > CANVAS_WIDTH) {
            x = CANVAS_WIDTH - w / 2;
            moveDirection = DIRECTION_LEFT;
          }
        } else {
          x -= ellapsed * 0.1;
          if (x - w / 2 < 0) {
            x = w / 2;
            moveDirection = DIRECTION_RIGHT;
          }
        }
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

      destroyedBossSprites.map((sprite) =>
        newEntities.push(
          Shard(
            generateSpriteFinalState(sprite, w, h),
            x - w / 2,
            y - h / 2,
            BOSS_EXPLOSION_DURATION,
            time
          )
        )
      );
      // Returning undefined is falsy
      return;
    }

    // Update hit box
    hitBox = [x, y, w, h, bossMask];

    // Check collision to ship
    if (collide(shipHitBox, hitBox)) {
      shipDestroyed = true;
    }

    lastTime = time;

    gameCtx.drawImage(bossShip, x - w / 2, y - h / 2);
    const hitTint = 400 - time + hitTime;
    if (hitTint > 0) {
      gameCtxWrap(() => {
        gameCtx.globalAlpha = hitTint / 400;
        gameCtx.drawImage(bossHit, x - w / 2, y - h / 2);
      });
    }

    if (!shipDestroyed && phase === BOSS_FIGHT) {
      // Fire bullets if needed
      if (nextBullet < time) {
        sounds.enemyFire();
        if (bulletCount < 5 * difficulty) {
          const [offsetX, offsetY] = [
            [28, 119],
            [42, 123],
            [108, 94],
            [121, 80],
            [143, 50],
            [28, 119],
          ][Math.floor(bulletCount / difficulty)];

          // Side bullets
          newEntities.push(
            EnemyBullet(
              x - offsetX,
              y + offsetY,
              x - offsetX,
              y + offsetY + 100,
              0.5,
              time
            ),
            EnemyBullet(
              x + offsetX,
              y + offsetY,
              x + offsetX,
              y + offsetY + 100,
              0.5,
              time
            )
          );
        } else {
          // Targeted bullets
          newEntities.push(EnemyBullet(x, y + 125, shipX, shipY, 0.3, time));
        }
        bulletCount++;
        if (bulletCount >= 10 * difficulty) {
          bulletCount = 0;
          nextBullet = time + 800;
        } else if (bulletCount > 5 * difficulty) {
          nextBullet = time + 200;
        } else if (bulletCount === 5 * difficulty) {
          nextBullet = time + 800;
        } else {
          // this.bulletCount < 5 * this.level
          if (bulletCount % difficulty) {
            nextBullet = time + 180;
          } else {
            nextBullet = time + 500;
          }
        }
      }
    }

    return checkHit;
  };
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
  const tickEllapsed = now - lastTime;
  lastTime = now;
  if (tickEllapsed > 160) {
    // First frame or detecting a pause
    initialTime += tickEllapsed;
    // We don't want the controls to get stuck
    keysPressed = [];
  }
  const gameEllapsed = now - initialTime;

  if (!shipDestroyed) {
    // Check pressed keys
    const toTravel = SHIP_SPEED * tickEllapsed,
      keyUp = keysPressed[38] || keysPressed[90],
      keyDown = keysPressed[40] || keysPressed[83],
      keyLeft = keysPressed[37] || keysPressed[65],
      keyRight = keysPressed[39] || keysPressed[68];

    // Digital input
    if (keyUp || keyDown || keyLeft || keyRight) {
      const distance =
        toTravel / ((keyUp || keyDown) && (keyLeft || keyRight) ? 2 ** 0.5 : 1);
      if (keyUp) {
        shipY -= distance;
      }
      if (keyDown) {
        shipY += distance;
      }
      if (keyLeft) {
        shipX -= distance;
      }
      if (keyRight) {
        shipX += distance;
      }
      // We don't want to move to the pointer position unless it's updated
      move_x = shipX;
      move_y = shipY;
    } else {
      // Move ship with pointer
      const vx = move_x - shipX,
        vy = move_y - shipY;
      const distance = Math.hypot(vx, vy);

      if (distance < toTravel) {
        shipX = move_x;
        shipY = move_y;
      } else {
        shipX += (vx / distance) * toTravel;
        shipY += (vy / distance) * toTravel;
      }
    }
    if (shipX < halfShipWidth) {
      shipX = halfShipWidth;
    } else if (shipX > CANVAS_WIDTH - halfShipWidth) {
      shipX = CANVAS_WIDTH - halfShipWidth;
    }
    if (shipY < halfShipHeight) {
      shipY = halfShipHeight;
    } else if (shipY > CANVAS_HEIGHT - halfShipHeight) {
      shipY = CANVAS_HEIGHT - halfShipHeight;
    }
    shipHitBox = [shipX, shipY, shipWidth, shipHeight, shipMask];
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
          ((100 - i) * (CANVAS_WIDTH - STARS_WIDTH) * (shipX - halfShipWidth)) /
            (100 * (CANVAS_WIDTH - shipWidth))
        ) +
          ((102797 * (1 + Math.sin(s)) * i) % STARS_WIDTH),
        (CANVAS_HEIGHT * (Math.tan(i / 9) + (s * gameEllapsed) / 3000)) %
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
    const newEntities = [];
    const result = entity(gameEllapsed, newEntities);
    if (result) {
      if (result - 2) {
        nextEntities.push(entity);
      } else {
        alwaysOnTop.push(entity);
      }
      if (result.call) {
        nextHitables.push(result);
      }
    }
    newEntities.map(runEntity);
  }
  entities.map(runEntity);

  if (!previousShipDestroyed && shipDestroyed) {
    // Record time
    gameOverTime = gameEllapsed;
    // add shards
    destroyedShipSprites
      .map((sprite) =>
        Shard(
          generateSpriteFinalState(sprite, shipWidth, shipHeight),
          shipX - halfShipWidth,
          shipY - halfShipHeight,
          PLAYER_EXPLOSION_DURATION,
          gameEllapsed
        )
      )
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
        shipX - shieldCanvas.width / 2,
        shipY - shieldCanvas.height / 2
      );
    }
    // Paint ship
    gameCtx.drawImage(ship, shipX - halfShipWidth, shipY - halfShipHeight);
  } else {
    // Paint game over
    gameCtxWrap(() => {
      gameCtx.globalAlpha = Math.min(1, (gameEllapsed - gameOverTime) / 2000);
      gameCtx.textBaseline = "middle";
      gameCtx.font = "40px Helvetica";
      gameCtx.fillText("Game Over", HALF_CANVAS_WIDTH, HALF_CANVAS_HEIGHT);
    });
  }

  // Paint bomb
  if (bombEffect > gameEllapsed) {
    gameCtxWrap(() => {
      // Fill style is already white
      gameCtx.globalAlpha = (bombEffect - gameEllapsed) / BOMB_DURATION;
      gameCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });
  }

  // Paint HUD
  gameCtx.textBaseline = "top";
  gameCtx.font = "16px Helvetica";
  gameCtx.fillText(scoreText, HALF_CANVAS_WIDTH, 5);

  const isFastFire = fastFire > gameEllapsed;
  // Should we fire?
  if (!shipDestroyed && lastBullet + (isFastFire ? 100 : 200) < gameEllapsed) {
    bulletOffset = -bulletOffset;
    entities.push(
      Bullet(
        shipX + (isFastFire ? bulletOffset : 0),
        shipY - Math.floor(shipHeight / 2),
        gameEllapsed
      )
    );
    lastBullet = Math.max(gameEllapsed);
    sounds.bullet();
  }
  if (nextDifficulty < gameEllapsed && !bossTime) {
    // Increase difficulty and check
    if (++difficulty % 5) {
      nextDifficulty = gameEllapsed + 10000;
    } else {
      bossTime = true;
      entities.push(Boss(Math.floor(difficulty / 5), gameEllapsed));
    }
  }

  // Should we spawn powerup
  if (nextPowerup < gameEllapsed && !bossTime) {
    entities.push(
      Powerup(
        powerupRandomizer.si(30, CANVAS_WIDTH - 30),
        Math.floor(-powerupCanvas.height / 2),
        // Increasing it here to optimize for size
        powerupIndex++,
        gameEllapsed
      )
    );
    powerupIndex %= powerupDefinitions.length;
    nextPowerup = gameEllapsed + POWERUP_INTERVAL;
  }

  // Should we spawn enemy
  if (nextEnemy < gameEllapsed && !bossTime) {
    const enemyDifficulty = enemyRandomizer.si(
      Math.min(Math.max(difficulty - 2, 0), enemyBlueprints.length - 3),
      Math.min(difficulty, enemyBlueprints.length - 1)
    );

    entities.push(
      Enemy(
        enemyBlueprints[enemyDifficulty],
        enemyRandomizer.si(30, CANVAS_WIDTH - 30),
        (enemyDifficulty + 1) * 50,
        gameEllapsed
      )
    );
    updateNextEnemy();
  }

  if (shipDestroyed && gameOverTime + 3500 < gameEllapsed) {
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

// Self isn't needed for the keys and mouse events, but it's necessary for touch
// Keeping it all the same helps with zipping
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

render(initialTime);
