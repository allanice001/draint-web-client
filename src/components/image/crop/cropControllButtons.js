import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { IconButton } from '@material-ui/core';
import React from 'react';

export default function ControllButtons({ handleSaveCrop, handleCrop }) {
  return (
    <div className="image-tools">
      <div className="buttons-wrap">
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleSaveCrop}
        >
          <CheckCircleOutlineIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleCrop}
        >
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
}
