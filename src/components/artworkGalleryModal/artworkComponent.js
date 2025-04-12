import './artworkGalleryModal.scss';

import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import React from 'react';

export default class ArtworkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { src } = this.props;
    return (
      <div className="artwork-component-wrapper">
        <Card>
          <CardMedia>
            <img
              alt={src ? 'modal-image' : ''}
              className="modal-image"
              src={src}
              title={src ? 'modal-image' : ''}
            />
          </CardMedia>
        </Card>
      </div>
    );
  }
}
