import staticUrls from 'constants/images/static-urls';

/**
 * @param {string|undefined} imageSrc
 * @return {string}
 * @example
 * // returns "src1.jpg 360w,src2.jpg 640w"
 * getSrcValue('{"360": "src1.jpg", "640": "src2.jpg"}')
 */
export const getSrcValue = imageSrc => {
  if (!imageSrc) {
    return staticUrls.image.defaultPost;
  }

  try {
    const imageSrcObj = JSON.parse(imageSrc);
    const widths = Object.keys(imageSrcObj);

    const result = Object.values(imageSrcObj).map((item, idx) => {
      return item + ' ' + String(widths[idx]) + 'w';
    });

    return result.join(',');
  } catch (_) {
    return imageSrc;
  }
};
