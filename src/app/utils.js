export function trimCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const xs = [];
  const ys = [];
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      if (imageData.data[(y * imageData.width + x) * 4 + 3]) {
        xs.push(x);
        ys.push(y);
      }
    }
  }
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const cut = ctx.getImageData(
    minX,
    minY,
    1 + Math.max(...xs) - minX,
    1 + Math.max(...ys) - minY
  );

  canvas.width = cut.width;
  canvas.height = cut.height;
  ctx.putImageData(cut, 0, 0);
}

export function createFavicon(img) {
  const favicon = document.createElement("canvas");
  favicon.width = 32;
  favicon.height = 32;
  const favCtx = favicon.getContext("2d");
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
