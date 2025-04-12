import CropIcon from '@material-ui/icons/Crop';
import { IconButton } from '@material-ui/core';
import React from 'react';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

export default function BeforeCropControllButtons({
  handleCrop,
  handleRotate,
}) {
  return (
    <>
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={handleCrop}
      >
        <CropIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={() => handleRotate(-90)}
      >
        <RotateLeftIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={() => handleRotate(90)}
      >
        <RotateRightIcon />
      </IconButton>
    </>
  );
}
