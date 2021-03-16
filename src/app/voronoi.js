import { createCanvas, obtainImageData } from "./utils";

const MAX_ANGLE = 360;

function createSplitPoints(width, height, targetSize) {
  const xPoints = Math.floor(width / targetSize);
  const yPoints = Math.floor(height / targetSize);
  const result = [];
  const yOffset = Math.floor(height / (2 * yPoints));
  for (let currentY = 0; currentY < yPoints; currentY++) {
    const iterationXPoints = currentY % 2 == 0 ? xPoints : xPoints - 1;
    // We calculate the initial offset so the center points are in a displaced pattern
    const xOffset = Math.floor(width / ((2 - (currentY % 2)) * xPoints));
    for (let currentX = 0; currentX < iterationXPoints; currentX++) {
      // We add some noise so all pieces look different
      result.push([
        xOffset + ((currentX + (Math.random() - 0.5)) * width) / xPoints,
        yOffset + ((currentY + (Math.random() - 0.5)) * height) / yPoints,
      ]);
    }
  }
  return result;
}

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
  const splitPoints = createSplitPoints(
    targetCanvas.width,
    targetCanvas.height,
    Math.max(
      12,
      Math.floor(Math.min(targetCanvas.width, targetCanvas.height) / 12)
    )
  );
  const width = targetCanvas.width,
    height = targetCanvas.height;
  const imageData = obtainImageData(targetCanvas);
  // Assigning extreme values so we know they'll be overriden
  const collectors = splitPoints.map((p) => [1e9, 1e9, 0, 0, ...p, []]);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = (y * width + x) * 4;
      if (imageData.data[pos + 3]) {
        // Non transparent pixel
        // With the size of the images we are working, 1,000,000,000 behaves the same as infinity
        let minDistance = 1e9;
        let minCollector;
        for (let i = 0; i < splitPoints.length; i++) {
          const distance = Math.hypot(
            splitPoints[i][0] - x,
            splitPoints[i][1] - y
          );
          if (distance < minDistance) {
            minDistance = distance;
            minCollector = collectors[i];
          }
        }

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
          imageData.data[pos + 0],
          imageData.data[pos + 1],
          imageData.data[pos + 2],
          imageData.data[pos + 3],
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
      const shardCanvas = createCanvas(shardWidth, shardHeight);
      const imgData = obtainImageData(shardCanvas);
      collector[COLLECTOR_NEAREST].map((point) => {
        const pos =
          4 *
          ((point[1] - collector[COLLECTOR_MIN_Y]) * shardWidth +
            (point[0] - collector[COLLECTOR_MIN_X]));
        imgData.data[pos + 0] = point[2];
        imgData.data[pos + 1] = point[3];
        imgData.data[pos + 2] = point[4];
        imgData.data[pos + 3] = point[5];
      });
      shardCanvas.getContext("2d").putImageData(imgData, 0, 0);
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
    (Math.random() * MAX_ANGLE * 2 - MAX_ANGLE * Math.PI) /
      ((Math.random() + 2) * sprite[SPRITE_CANVAS].width * 18),
  ];
}
