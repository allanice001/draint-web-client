/***
 *
 *   ICON
 *   UI icon element using feather icons.
 *
 *   PROPS
 *   color: dark/light or hex code
 *   image: image to use (see: https://feathericons.com)
 *   className: apply a custom css class (optional)
 *
 **********/

import FeatherIcon from 'feather-icons-react';
import React from 'react';

export class Icon extends React.Component {
  render() {
    let color;
    let cssClass = this.props.className ? 'ico' + this.props.className : 'ico';

    switch (this.props.color) {
      case 'light':
        color = '#FFFFFF';
        break;

      case 'dark':
        color = '#758197';
        break;

      default:
        color = this.props.color;
        break;
    }

    return (
      <FeatherIcon
        color={color}
        icon={this.props.image}
        size={this.props.size}
        className={cssClass}
      />
    );
  }
}
