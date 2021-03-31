import { createCanvas, obtainImageData } from "game-utils";

// TODO: TS const enum
const COLLECTOR_MIN_X = 0;
const COLLECTOR_MIN_Y = 1;
const COLLECTOR_MAX_X = 2;
const COLLECTOR_MAX_Y = 3;
const COLLECTOR_CENTER_X = 4;
const COLLECTOR_CENTER_Y = 5;
const COLLECTOR_NEAREST = 6;

export const SPRITE_CENTER_X = 0;
export const SPRITE_CENTER_Y = 1;
export const SPRITE_OFFSET_X = 2;
export const SPRITE_OFFSET_Y = 3;
export const SPRITE_CANVAS = 4;
export const SPRITE_TRANSLATE_X = 5;
export const SPRITE_TRANSLATE_Y = 6;
export const SPRITE_ANGLE = 7;

export function createSprites(targetCanvas) {
  const width = targetCanvas.width;
  const height = targetCanvas.height;
  const targetSize = Math.max(12, Math.floor(Math.min(width, height) / 12));
  const imageData = obtainImageData(targetCanvas);
  const xPoints = Math.floor(width / targetSize);
  const yPoints = Math.floor(height / targetSize);
  const collectors = [];
  const yOffset = Math.floor(height / (2 * yPoints));

  // Gather collectors
  for (let currentY = 0; currentY < yPoints; currentY++) {
    // We calculate the initial offset so the center points are in a displaced pattern
    const xOffset = Math.floor(width / ((2 - (currentY % 2)) * xPoints));
    for (let currentX = 0; currentX < xPoints - (currentY % 2); currentX++) {
      // We add some noise so all pieces look different
      collectors.push([
        1e9,
        1e9,
        0,
        0,
        xOffset + ((currentX + (Math.random() - 0.5)) * width) / xPoints,
        yOffset + ((currentY + (Math.random() - 0.5)) * height) / yPoints,
        [],
      ]);
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = (y * width + x) * 4;
      if (imageData.data[pos + 3]) {
        // Non transparent pixel
        // With the size of the images we are working, 1,000,000,000 behaves the same as infinity
        let minDistance = 1e9;
        let minCollector;
        collectors.map((c) => {
          const distance = Math.hypot(
            c[COLLECTOR_CENTER_X] - x,
            c[COLLECTOR_CENTER_Y] - y
          );
          if (distance < minDistance) {
            minDistance = distance;
            minCollector = c;
          }
        });

        minCollector[COLLECTOR_MIN_X] = Math.min(
          x,
          minCollector[COLLECTOR_MIN_X]
        );
        minCollector[COLLECTOR_MAX_X] = Math.max(
          x,
          minCollector[COLLECTOR_MAX_X]
        );
        minCollector[COLLECTOR_MIN_Y] = Math.min(
          y,
          minCollector[COLLECTOR_MIN_Y]
        );
        minCollector[COLLECTOR_MAX_Y] = Math.max(
          y,
          minCollector[COLLECTOR_MAX_Y]
        );

        minCollector[COLLECTOR_NEAREST].push([
          x,
          y,
          imageData.data.slice(pos, pos + 4),
        ]);
      }
    }
  }
  const sprites = [];
  collectors.map((collector) => {
    if (collector[COLLECTOR_MIN_X] < 1e9) {
      const shardWidth =
        collector[COLLECTOR_MAX_X] - collector[COLLECTOR_MIN_X] + 1;
      const shardHeight =
        collector[COLLECTOR_MAX_Y] - collector[COLLECTOR_MIN_Y] + 1;
      const [shardCanvas, shardCtx] = createCanvas(shardWidth, shardHeight);
      const imgData = obtainImageData(shardCanvas);
      collector[COLLECTOR_NEAREST].map((point) => {
        const pos =
          4 *
          ((point[1] - collector[COLLECTOR_MIN_Y]) * shardWidth +
            (point[0] - collector[COLLECTOR_MIN_X]));
        imgData.data.set(point[2], pos);
      });
      shardCtx.putImageData(imgData, 0, 0);
      sprites.push([
        collector[COLLECTOR_CENTER_X],
        collector[COLLECTOR_CENTER_Y],
        collector[COLLECTOR_MIN_X] - collector[COLLECTOR_CENTER_X],
        collector[COLLECTOR_MIN_Y] - collector[COLLECTOR_CENTER_Y],
        shardCanvas,
      ]);
    }
  });
  return sprites;
}

export function generateSpriteFinalState(sprite, width, height) {
  const cx = sprite[SPRITE_CENTER_X] - width / 2;
  const cy = sprite[SPRITE_CENTER_Y] - height / 2;
  const distance = Math.hypot(cx, cy);
  const distanceSquare = distance * distance;
  const radiusFactor = 1.5 + 1.5 * Math.random();
  const finalDistance = distance * radiusFactor;

  return [
    ...sprite,
    (finalDistance - distance) *
      (1 - cy ** 2 / distanceSquare) ** 0.5 *
      (cx > 0 ? 1 : -1),
    (finalDistance - distance) *
      (1 - cx ** 2 / distanceSquare) ** 0.5 *
      (cy > 0 ? 1 : -1),
    (Math.random() - 0.5) * 3,
  ];
}
