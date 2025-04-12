import './uploader.scss';

import { Button, CircularProgress } from '@material-ui/core';

import React from 'react';

export class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onClickHandler,
      onChangeHandler,
      title,
      fileName,
      selectedFile,
      loading,
    } = this.props;
    return (
      <div className="container">
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
              {!loading && <span>{title}</span>}
              {loading && (
                <div className="progress-circular">
                  <CircularProgress size={22} />
                </div>
              )}
            </Button>
          </label>
        </div>
        {fileName && (
          <div className="save-button-wrapper">
            <span className="file-name">{fileName}</span>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => onClickHandler(selectedFile)}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    );
  }
}
