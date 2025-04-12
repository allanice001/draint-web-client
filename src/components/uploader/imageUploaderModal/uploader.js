import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button } from '@material-ui/core';
import React from 'react';

export default function Uploader(props) {
  const { loading, onChangeHandler } = props;
  return (
    <>
      <div className="uploader-wrapper">
        <input
          className="upload-input"
          accept="image/*"
          id="uploader-button-label"
          multiple={false}
          disabled={loading}
          onChange={onChangeHandler}
          type="file"
        />
        <label htmlFor="uploader-button-label">
          <Button
            className="upload-button"
            variant="outlined"
            color="primary"
            disabled={loading}
            component="span"
          >
            <AddCircleIcon />
          </Button>
        </label>
      </div>
    </>
  );
}
