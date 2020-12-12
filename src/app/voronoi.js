import { trimCanvas } from "./utils";

const MAX_ANGLE = 360;

function createSplitPoints(width, height, targetSize, noise) {
  const xPoints = Math.floor(width / targetSize);
  const yPoints = Math.floor(height / targetSize);
  const result = [];
  const yOffset = Math.floor(height / (2 * yPoints));
  for (let currentY = 0; currentY < yPoints; currentY++) {
    const iterationXPoints = currentY % 2 === 0 ? xPoints : xPoints - 1;
    const xOffset =
      currentY % 2 === 0
        ? Math.floor(width / (2 * xPoints))
        : Math.floor(width / xPoints);
    for (let currentX = 0; currentX < iterationXPoints; currentX++) {
      result.push([
        xOffset +
          Math.round(
            ((currentX + (Math.random() - 0.5) * 2 * noise) * width) / xPoints
          ),
        yOffset +
          Math.round(
            ((currentY + (Math.random() - 0.5) * 2 * noise) * height) / yPoints
          ),
      ]);
    }
  }
  return result;
}

export function createSprites(targetCanvas) {
  const splitPoints = createSplitPoints(
    targetCanvas.width,
    targetCanvas.height,
    Math.max(
      12,
      Math.floor(Math.min(targetCanvas.width, targetCanvas.height) / 12)
    ),
    0.5
  );
  const targetCtx = targetCanvas.getContext("2d");
  const width = targetCanvas.width,
    height = targetCanvas.height;
  const imageData = targetCtx.getImageData(0, 0, width, height);
  const sprites = splitPoints.map(() => ({
    minX: -1,
    minY: -1,
    maxX: -1,
    maxY: -1,
    points: [],
  }));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = (y * width + x) * 4;
      if (imageData.data[pos + 3] === 0) {
        // Transparent pixel, nothing to do
        continue;
      }
      let minDistance = Math.hypot(
        splitPoints[0][0] - x,
        splitPoints[0][1] - y
      );
      let minIndex = 0;
      for (let i = 1; i < splitPoints.length; i++) {
        const distance = Math.hypot(
          splitPoints[i][0] - x,
          splitPoints[i][1] - y
        );
        if (distance < minDistance) {
          minDistance = distance;
          minIndex = i;
        }
      }

      const targetSprite = sprites[minIndex];
      if (targetSprite.minX < 0) {
        targetSprite.minX = x;
        targetSprite.minY = y;
        targetSprite.maxX = x;
        targetSprite.maxY = y;
      } else {
        if (x < targetSprite.minX) {
          targetSprite.minX = x;
        }
        if (x > targetSprite.maxX) {
          targetSprite.maxX = x;
        }
        if (y < targetSprite.minY) {
          targetSprite.minY = y;
        }
        if (y > targetSprite.maxY) {
          targetSprite.maxY = y;
        }
      }
      targetSprite.points.push([
        x,
        y,
        imageData.data[pos],
        imageData.data[pos + 1],
        imageData.data[pos + 2],
        imageData.data[pos + 3],
      ]);
    }
  }
  const result = [];
  for (let i = 0; i < sprites.length; i++) {
    const sprite = sprites[i];
    if (sprite.minX > -1) {
      const shardWidth = sprite.maxX - sprite.minX + 1;
      const shardHeight = sprite.maxY - sprite.minY + 1;
      const shardCanvas = document.createElement("canvas");
      shardCanvas.width = shardWidth;
      shardCanvas.height = shardHeight;
      const shardCtx = shardCanvas.getContext("2d");
      const imgData = shardCtx.createImageData(
        shardCanvas.width,
        shardCanvas.height
      );
      sprite.points.forEach((point) => {
        const pos =
          4 *
          ((point[1] - sprite.minY) * shardWidth + (point[0] - sprite.minX));
        imgData.data[pos] = point[2];
        imgData.data[pos + 1] = point[3];
        imgData.data[pos + 2] = point[4];
        imgData.data[pos + 3] = point[5];
      });
      shardCtx.putImageData(imgData, 0, 0);
      const resultShard = {
        center: splitPoints[i],
        canvas: shardCanvas,
        corner: [sprite.minX, sprite.minY],
      };
      result.push(resultShard);
    }
  }
  return result;
}

export function calculateSpriteFinalState(sprite, width, height) {
  const radius = Math.round((width + height) / 2);
  const radiusFactor = 1.5 + 1.5 * Math.random();
  const cx = sprite.center[0] - width / 2;
  const cy = sprite.center[1] - height / 2;
  const distance = Math.sqrt(cx * cx + cy * cy);
  const distanceSquare = distance * distance;
  const finalDistance = distance * radiusFactor;

  sprite.translateX =
    (finalDistance - distance) *
    Math.sqrt((distanceSquare - cy * cy) / distanceSquare) *
    (cx > 0 ? 1 : -1);
  sprite.translateY =
    (finalDistance - distance) *
    Math.sqrt((distanceSquare - cx * cx) / distanceSquare) *
    (cy > 0 ? 1 : -1);
  sprite.angle =
    ((Math.random() * MAX_ANGLE * 2 - MAX_ANGLE) /
      ((Math.random() + 2) * sprite.canvas.width)) *
    10 *
    (Math.PI / 180);
}
