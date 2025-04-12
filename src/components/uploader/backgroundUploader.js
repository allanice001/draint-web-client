import './backgroundUploader.scss';

import { Button, CircularProgress } from '@material-ui/core';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';

export class BackgroundUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      baseImage: null,
      loaded: 0,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  async onChangeHandler(event) {
    const filename = event.target.value.split('\\').pop();
    if (filename.length) {
      document.querySelector('label').classList.add('active');
    } else {
      document.querySelector('label').classList.remove('active');
    }
    await this.setState({
      selectedFile: event.target.files,
      loaded: 0,
    });
    await this.props.onClickHandler(this.state.selectedFile);
  }

  render() {
    const { loading, title } = this.props;
    return (
      <div id="background-uploader-container">
        <div className={'uploader-wrapper'}>
          <input
            className={`upload-input`}
            accept="image/*"
            id="uploader-button-label"
            multiple={false}
            disabled={loading}
            onChange={this.onChangeHandler}
            type="file"
          />
          <label htmlFor="uploader-button-label">
            <Button
              className={`upload-button`}
              variant="outlined"
              color="primary"
              disabled={loading}
              component="span"
            >
              {!loading ? (
                `${title}`
              ) : (
                <div className={'progress-circular'}>
                  <CircularProgress size={22} />
                </div>
              )}
              {!loading && (
                <div className={'photo-icon'}>
                  <PhotoCameraIcon fontSize="inherit" className="label-icon" />
                </div>
              )}
            </Button>
          </label>
        </div>
      </div>
    );
  }
}
