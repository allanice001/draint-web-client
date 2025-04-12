export const RealCropSaver = async (
  image,
  crop,
  fileName = 'file',
  blobFlag = false
) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY
  );

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  ctx.putImageData(data, 0, 0);

  if (!blobFlag) return canvas.toDataURL('image/jpeg');

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) {
        // reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      resolve(window.URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

export async function getRotatedImage(image, rotation = 0, blob = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const orientationChanged =
    rotation === 90 ||
    rotation === -90 ||
    rotation === 270 ||
    rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  if (!blob) return canvas.toDataURL('image/jpeg');

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}
