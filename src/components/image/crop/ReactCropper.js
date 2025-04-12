import 'react-image-crop/dist/ReactCrop.css';

import React from 'react';
import ReactCrop from 'react-image-crop';

export default function ReactCropper({
  image,
  onCropChange,
  onImageLoaded,
  crop,
  className,
  handleCompleteChange,
}) {
  return (
    <>
      <ReactCrop
        className={className}
        src={image}
        crop={crop}
        ruleOfThirds
        onChange={onCropChange}
        onImageLoaded={onImageLoaded}
        onComplete={handleCompleteChange}
      />
    </>
  );
}
