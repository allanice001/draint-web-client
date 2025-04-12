import React, { useEffect, useState } from 'react';

import { DEFAULT_ALT } from 'constants/images/images';
import { getImageSizes } from 'helpers/image-sizes/get-image-sizes';

export const Image = ({
  srcSet,
  src,
  defaultSrc,
  alt,
  maxSize,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(srcSet);

  useEffect(() => {
    setImgSrc(srcSet);
  }, [srcSet]);

  const handleError = () => {
    setImgSrc(defaultSrc);
  };

  return (
    <img
      className={className}
      srcSet={imgSrc || src || defaultSrc}
      alt={alt || DEFAULT_ALT}
      sizes={getImageSizes(maxSize)}
      onError={handleError}
      {...props}
    />
  );
};
