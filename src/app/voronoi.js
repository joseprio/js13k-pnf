const MAX_ANGLE = 360;

function createSplitPoints(width, height, targetSize) {
  const xPoints = Math.floor(width / targetSize);
  const yPoints = Math.floor(height / targetSize);
  const result = [];
  const yOffset = Math.floor(height / (2 * yPoints));
  for (let currentY = 0; currentY < yPoints; currentY++) {
    const iterationXPoints = currentY % 2 === 0 ? xPoints : xPoints - 1;
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

export function createSprites(targetCanvas) {
  const splitPoints = createSplitPoints(
    targetCanvas.width,
    targetCanvas.height,
    Math.max(
      12,
      Math.floor(Math.min(targetCanvas.width, targetCanvas.height) / 12)
    )
  );
  const targetCtx = targetCanvas.getContext("2d");
  const width = targetCanvas.width,
    height = targetCanvas.height;
  const imageData = targetCtx.getImageData(0, 0, width, height);
  // Assigning extreme values so we know they'll be overriden
  const sprites = splitPoints.map((p) => ({
    minX: 1e9,
    minY: 1e9,
    maxX: 0,
    maxY: 0,
    center: p,
    nearest: [],
  }));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = (y * width + x) * 4;
      if (imageData.data[pos + 3] === 0) {
        // Transparent pixel, nothing to do
        continue;
      }
      // With the size of the images we are working, 1,000,000,000 behaves the same as infinity
      let minDistance = 1e9;
      let minIndex;
      for (let i = 0; i < splitPoints.length; i++) {
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

      targetSprite.nearest.push([
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
  sprites.forEach((sprite) => {
    if (sprite.minX < 1e9) {
      const shardWidth = sprite.maxX - sprite.minX + 1;
      const shardHeight = sprite.maxY - sprite.minY + 1;
      const shardCanvas = document.createElement("canvas");
      shardCanvas.width = shardWidth;
      shardCanvas.height = shardHeight;
      const shardCtx = shardCanvas.getContext("2d");
      const imgData = shardCtx.createImageData(shardWidth, shardHeight);
      sprite.nearest.forEach((point) => {
        const pos =
          4 *
          ((point[1] - sprite.minY) * shardWidth + (point[0] - sprite.minX));
        imgData.data[pos] = point[2];
        imgData.data[pos + 1] = point[3];
        imgData.data[pos + 2] = point[4];
        imgData.data[pos + 3] = point[5];
      });
      shardCtx.putImageData(imgData, 0, 0);
      result.push({
        center: sprite.center,
        canvas: shardCanvas,
        corner: [sprite.minX, sprite.minY],
      });
    }
  });
  return result;
}

export function calculateSpriteFinalState(sprite, width, height) {
  const radiusFactor = 1.5 + 1.5 * Math.random();
  const cx = sprite.center[0] - width / 2;
  const cy = sprite.center[1] - height / 2;
  const distance = Math.hypot(cx, cy);
  const distanceSquare = distance * distance;
  const finalDistance = distance * radiusFactor;

  sprite.translateX =
    (finalDistance - distance) *
    ((distanceSquare - cy * cy) / distanceSquare) ** 0.5 *
    (cx > 0 ? 1 : -1);
  sprite.translateY =
    (finalDistance - distance) *
    ((distanceSquare - cx * cx) / distanceSquare) ** 0.5 *
    (cy > 0 ? 1 : -1);
  sprite.angle =
    ((Math.random() * MAX_ANGLE * 2 - MAX_ANGLE) /
      ((Math.random() + 2) * sprite.canvas.width)) *
    10 *
    (Math.PI / 180);
}
