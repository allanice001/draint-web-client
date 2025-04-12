import './profile-overlay-edit.scss';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@material-ui/core';
import { ProfileOverlay, Spinner } from '../lib';

import BuildIcon from '@material-ui/icons/Build';
import ModalGeneral from '../layout/modal/modal';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
  root: {
    color: '#73B0F4',
    height: 8,
  },

  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,

    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },

  active: {},

  valueLabel: {
    left: 'calc(-50% + 4px)',
  },

  track: {
    height: 8,
    borderRadius: 4,
  },

  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: props.scale,
      active: props.artworkUrl,
      top: props.top,
      left: props.left,
      artworkUrl: props.artworkUrl,
      hideTool: false,
      minValue: 0,
    };
    this.setArtwork = this.setArtwork.bind(this);
    this.setScale = this.setScale.bind(this);
    this.setTop = this.setTop.bind(this);
    this.setLeft = this.setLeft.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  setArtwork(event) {
    this.setState({
      active: event.target.value,
      artworkUrl: event.target.value,
      scale: 20,
      top: 10,
      left: 10,
    });
  }

  setScale(event, newValue) {
    this.setState({ scale: parseInt(newValue, 10) });
  }

  setTop(event, newValue) {
    this.setState({ top: parseInt(newValue, 10) });
  }

  setLeft(event, newValue) {
    this.setState({ left: parseInt(newValue, 10) });
  }

  handleSave = async () => {
    this.props.updateUserAvatar(this.state);
  };

  handleImageTool = () => {
    this.setState(prevState => ({
      scale: prevState.minValue,
      top: prevState.minValue,
      left: prevState.minValue,
    }));
  };

  render() {
    const {
      onClickHandler,
      backgroundUrl,
      loading,
      title,
      artworkOptions,
    } = this.props;
    const { minValue, scale, top, left, active } = this.state;

    return (
      <>
        <ProfileOverlay
          {...this.state}
          backgroundUrl={backgroundUrl}
          onClickHandler={onClickHandler}
          loading={loading}
          title={title}
        />
        <div className="info-icon">
          <ModalGeneral type="Profile Background" />
        </div>
        <div className="adjust-container">
          <div className="button-tool">
            {scale > 0 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleImageTool}
              >
                <BuildIcon />
                <div className="title">Reset Background</div>
              </Button>
            ) : (
              <div className="button-tool" />
            )}
          </div>
          <>
            <div className="adjust-block">
              <span>Size</span>
              <PrettoSlider
                disabled={!artworkOptions.length}
                min={minValue}
                max={100}
                value={scale}
                onChange={this.setScale}
                defaultValue={minValue}
              />
            </div>
            <div className="adjust-block">
              <span>Horizontal Position</span>
              <PrettoSlider
                disabled={!artworkOptions.length}
                min={minValue}
                max={100}
                value={left}
                onChange={this.setLeft}
                defaultValue={minValue}
              />
            </div>
            <div className="adjust-block">
              <span>Vertical Position</span>
              <PrettoSlider
                disabled={!artworkOptions.length}
                min={minValue}
                max={100}
                value={top}
                onChange={this.setTop}
                defaultValue={minValue}
              />
            </div>
            <div className="adjust-block-form">
              <FormControl variant="outlined">
                <InputLabel id="artwork-label">
                  {artworkOptions.length
                    ? 'Featured Artwork'
                    : 'There is no suitable artworks'}
                </InputLabel>
                <Select
                  disabled={!artworkOptions.length}
                  labelId="artwork-label"
                  className="artwork-select"
                  id="artwork"
                  value={active}
                  onChange={this.setArtwork}
                  labelWidth={100}
                >
                  {!artworkOptions ? (
                    <Spinner />
                  ) : (
                    artworkOptions.map(({ title, url }) => (
                      <MenuItem value={url} key={`${title}-${url}`}>
                        {title}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>
            <Button
              disabled={!artworkOptions.length}
              style={{ marginBottom: '20px' }}
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              size="large"
              fullWidth
            >
              Save
            </Button>
          </>
        </div>
      </>
    );
  }
}
