// import {Row} from 'components/lib';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import React from 'react';
const Settings = require('settings.json');

export class VerificationUploader extends React.Component {
  constructor(props) {
    super(props);
    this.api_server = Settings[process.env.NODE_ENV].api_server;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.axiosInstance = Axios.create({
      baseURL: this.api_server,
      timeout: 60000,

      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });
    this.state = {
      selectedFile: null,
      // baseImage: null,
      // loaded: 0
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({
      selectedFile: event.target.files,
      // loaded: 0
    });
    console.log(event.target.files[0]);
  }

  onClickHandler() {
    const data = new FormData();
    data.append('file', this.state.selectedFile[0]);
    data.append('type', 'artist-verification');

    this.axiosInstance
      .post('/api/artwork/upload/verification', data)
      .then(() => {
        alert('Image has been successfully uploaded');
        window.location = `${PROFILE_GALLERY}/profile-image`;
      });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-6">
          <div className="form-group files">
            <input
              id="verification-upload"
              type="file"
              className="form-control"
              multiple=""
              onChange={this.onChangeHandler}
            />
            <label htmlFor="verification-upload">
              Upload your verification image
            </label>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.onClickHandler}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}
