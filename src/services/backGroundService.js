export function checkBackground(image) {
  if (!image) return false;
  const extensionsClause =
    image.includes('.jpg') || image.includes('.jpeg') || image.includes('.png');
  const bucketsClause = image.includes('theme') || image.includes('background');
  return extensionsClause || bucketsClause;
}
