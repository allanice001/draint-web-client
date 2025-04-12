export const resizeImageService = (img, imgWidth) => {
  return new Promise((resolve, reject) => {
    const element = document.createElement('canvas');
    const context = element.getContext('2d');
    const width = imgWidth;
    const scaleFactor = width / img.width;
    element.width = width;
    element.height = img.height * scaleFactor;
    context.drawImage(img, 0, 0, width, img.height * scaleFactor);
    context.canvas.toBlob(
      blob => {
        resolve(blob);
      },
      'image/jpeg',
      0.95
    );
  });
};
