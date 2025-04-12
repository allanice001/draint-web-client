import './account.scss';

import {
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import React, { Component } from 'react';

import Edit from '@material-ui/icons/Edit';
import ModalGeneral from 'components/layout/modal/modal';
import { PHONE_REGEXP } from 'constants/index';
import SaveIcon from '@material-ui/icons/Save';
import { Uploader } from 'components/lib';
import { resizeImageService } from 'services/imageResizeService';

const SIZE_LIMIT_WIDTH = 1000000;
const SIZE_LIMIT_HEIGHT = 1000000;

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data && props.data.id,

      profile: {
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        username: props.data.username,
        phone: props.data.phone,
        instagram: props.data.instagram,
      },

      formData: {
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        username: props.data.username,
        phone: props.data.phone,
        instagram: props.data.instagram,
      },

      labels: {
        first_name: 'First name',
        last_name: 'Last name',
        username: 'Username',
        phone: 'Phone',
        instagram: 'Instagram link',
      },

      errorEmptyFormData: {
        first_name: props.data.first_name === '',
        last_name: props.data.last_name === '',
        username: props.data.username === '',
        phone: props.data.phone === '',
      },

      editMode: false,
      disabled: true,
      fileName: false,
      selectedFile: '',
    };
  }

  handleEmptyFields = field => {
    const { formData } = this.state;
    formData[field] = this.state.profile[field];
    this.setState(formData);
    this.toggleEditMode(field);
  };

  changeField = async (e, field) => {
    const { formData } = this.state;
    this.handleErrors(e.target.value, field);
    formData[field] = e.target.value;
    this.setState({ formData });
  };

  handleErrors = (value, field) => {
    this.emptyError(value, field);
  };

  emptyError = (value, field) => {
    const isFieldValid =
      field === 'phone'
        ? value !== '' && PHONE_REGEXP.test(value)
        : value !== '';
    const { errorEmptyFormData } = this.state;
    errorEmptyFormData[field] = !isFieldValid;
    const isDisabled = Object.values(errorEmptyFormData).some(error => error);
    this.setState({
      errorEmptyFormData,
      disabled: isDisabled,
    });
  };

  uploadImage = async selectedFile => {
    if (selectedFile) {
      const { id } = this.props.data;
      const file = selectedFile[0];
      const fileName = selectedFile[0].name;
      const fileSize = selectedFile[0].size;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = async () => {
          const resizeBigFullWidth = resizeImageService(img, 1920);
          const resizeBigFullHeight = resizeImageService(img, 1024);
          const resizeSmall = resizeImageService(img, 600);
          if (
            img.width > img.height &&
            fileSize >= SIZE_LIMIT_WIDTH &&
            !img.src.includes('data:image/gif')
          ) {
            resizeBigFullWidth
              .then(blob => {
                const data = new FormData();
                data.append(
                  'file',
                  new File([blob], fileName, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  })
                );
                data.append('type', 'artist-theme');
                data.append('id', id);
                this.setUploadedAvatarBig(data);
              })
              .then(
                resizeSmall.then(blob => {
                  const data = new FormData();
                  data.append(
                    'file',
                    new File([blob], fileName, {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    })
                  );
                  data.append('type', 'artist-theme-sm');
                  data.append('id', id);
                  this.setUploadedAvatarSmall(data);
                })
              );
          } else if (
            img.width < img.height &&
            fileSize >= SIZE_LIMIT_HEIGHT &&
            !img.src.includes('data:image/gif')
          ) {
            resizeBigFullHeight
              .then(blob => {
                const data = new FormData();
                data.append(
                  'file',
                  new File([blob], fileName, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  })
                );
                data.append('type', 'artist-theme');
                data.append('id', id);
                this.setUploadedAvatarBig(data);
              })
              .then(
                resizeSmall.then(blob => {
                  const data = new FormData();
                  data.append(
                    'file',
                    new File([blob], fileName, {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    })
                  );
                  data.append('type', 'artist-theme-sm');
                  data.append('id', id);
                  this.setUploadedAvatarSmall(data);
                })
              );
          } else if (!img.src.includes('data:image/gif')) {
            const data = new FormData();
            data.append('file', selectedFile[0]);
            data.append('type', 'artist-theme');
            data.append('id', id);
            await this.setUploadedAvatarBig(data);
            resizeSmall.then(blob => {
              const data = new FormData();
              data.append(
                'file',
                new File([blob], fileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                })
              );
              data.append('type', 'artist-theme-sm');
              data.append('id', id);
              this.setUploadedAvatarSmall(data);
            });
          } else {
            const data = new FormData();
            data.append('file', selectedFile[0]);
            data.append('type', 'artist-theme');
            data.append('id', id);
            await this.setUploadedAvatarBig(data);
            const dataSmall = new FormData();
            dataSmall.append('file', selectedFile[0]);
            dataSmall.append('type', 'artist-theme');
            dataSmall.append('id', id);
            await this.setUploadedAvatarSmall(dataSmall);
          }
        };
        reader.onerror = error => console.log(error);
      };
    }
  };

  onSaveHandler = event => {
    const {
      target: { value, files },
    } = event;
    this.setState({ selectedFile: files, fileName: value.split('\\').pop() });
  };

  setUploadedAvatarBig = async data => {
    this.props.changeAccountAvatar(data, 'big');
  };

  setUploadedAvatarSmall = async data => {
    this.props.changeAccountAvatar(data, 'small');
  };

  sendRequest = async () => {
    const { id } = this.props.data;
    const { formData, profile } = this.state;
    this.props.changeAccount(formData, id);
    const { state } = this;
    state.profile = { ...profile, ...formData };
    this.setState(state);
    this.toggleEditMode();
  };

  toggleEditMode = () =>
    this.setState(state => ({ editMode: !state.editMode }));

  verify(e, data, status) {
    this.props.changeAccountStatus(data, status);
  }

  render() {
    const {
      profile,
      formData,
      editMode,
      labels,
      id,
      errorEmptyFormData,
      fileName,
      loading,
      selectedFile,
      disabled,
    } = this.state;
    const {
      isOwner,
      isMaster,
      data: { artistVerification },
    } = this.props;

    return (
      <div className="artist-profile-info">
        {isMaster && (
          <div className="artist-verification">
            <div
              className={`artist-status ${
                !artistVerification || artistVerification === 'legacy'
                  ? 'pending'
                  : artistVerification
              }`}
            >
              {!artistVerification ? 'Pending' : artistVerification}
            </div>
            <CardActions>
              <Button
                variant="contained"
                className="status-btn verified"
                onClick={e => this.verify(e, id, 'verified')}
              >
                Verify
              </Button>
              <Button
                variant="contained"
                className="status-btn unverified"
                onClick={e => this.verify(e, id, 'unverified')}
              >
                Unverify
              </Button>
              <Button
                variant="contained"
                className="status-btn pending"
                onClick={e => this.verify(e, id, 'pending')}
              >
                Pending
              </Button>
            </CardActions>
          </div>
        )}

        <div className="edit-wrapper">
          <table className="info-block">
            <tr>
              <td align="center" colSpan="2">
                {(isOwner || isMaster) && (
                  <Button
                    variant="contained"
                    className="edit-btn"
                    onClick={() => this.toggleEditMode()}
                  >
                    Edit <Edit className="edit-icon" />
                  </Button>
                )}
              </td>
            </tr>
            {Object.keys(profile).map(field => {
              if (field !== 'phone') {
                return (
                  <tr className="info-box">
                    <td width="50%" className="label">
                      {labels[field]}:
                    </td>
                    <td width="50%" className="info-value">
                      {!editMode ? (
                        profile[field]
                      ) : (
                        <div className="multiply-select-form-wrapper">
                          <FormControl
                            variant="outlined"
                            error={errorEmptyFormData[field]}
                          >
                            <InputLabel htmlFor={`"artwork_edit_${field}"`}>
                              {field}
                            </InputLabel>
                            <OutlinedInput
                              id={`"artwork_edit_${field}"`}
                              aria-describedby={`"artwork_edit_helper_${field}"`}
                              labelWidth={65}
                              autoFocus
                              value={formData[field]}
                              onChange={e => this.changeField(e, field)}
                            />
                            <FormHelperText
                              id={`"artwork_edit_helper_${field}"`}
                            >
                              {errorEmptyFormData[field] &&
                                'This field cannot be empty'}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
            <tr>
              <td align="center" colSpan="2">
                {editMode && (
                  <Button
                    disabled={disabled}
                    variant="contained"
                    color="primary"
                    className="edit-btn"
                    onClick={() => this.sendRequest()}
                  >
                    Save <SaveIcon className="save-icon" />
                  </Button>
                )}
              </td>
            </tr>
          </table>

          {(isOwner || isMaster) && (
            <div className="upload-button-wrapper">
              <div className="upload-button">
                <Uploader
                  onClickHandler={this.uploadImage}
                  onChangeHandler={this.onSaveHandler}
                  fileName={fileName}
                  loading={loading}
                  selectedFile={selectedFile}
                  title="Theme Upload"
                />
              </div>
              <div className="modal-info-wrapper">
                <span className="modal-content">
                  <ModalGeneral btn_size={20} type="Profile Background" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
