function findTopRow(imageData, width, height) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] > 0) {
        return y;
      }
    }
  }
  return -1;
}

function findBottomRow(imageData, width, height) {
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] > 0) {
        return y;
      }
    }
  }
  return -1;
}

function findLeftColumn(imageData, width, height) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] > 0) {
        return x;
      }
    }
  }
  return -1;
}

function findRightColumn(imageData, width, height) {
  for (let x = width - 1; x >= 0; x--) {
    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] > 0) {
        return x;
      }
    }
  }
  return -1;
}

export function trimCanvas(canvas) {
  const ctx = canvas.getContext("2d"),
    pix = { x: [], y: [] };
  let w = canvas.width,
    h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);

  const topRow = findTopRow(imageData, w, h),
    bottomRow = findBottomRow(imageData, w, h),
    leftColumn = findLeftColumn(imageData, w, h),
    rightColumn = findRightColumn(imageData, w, h);
  // No need to check all of them; if one is -1, all will be and viceversa
  if (topRow < 0) {
    canvas.width = 0;
    canvas.height = 0;
    return [0, 0];
  }
  w = 1 + rightColumn - leftColumn;
  h = 1 + bottomRow - topRow;
  const cut = ctx.getImageData(leftColumn, topRow, w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cut, 0, 0);
  return [leftColumn, topRow];
}
