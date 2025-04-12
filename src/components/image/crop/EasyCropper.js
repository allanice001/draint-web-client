import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

export default function EasyCropper({
  image, onCropComplete,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect] = useState(4 / 3);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   console.log(croppedArea, croppedAreaPixels)
  // }, [])

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspect}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onZoomChange={onZoomChange}
    />
  );
}
