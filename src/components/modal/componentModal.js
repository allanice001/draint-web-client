import './modal.scss';

import React from 'react';

export class ComponentModal extends React.Component {
  render() {
    const { isVisible } = this.props;
    return (
      <>
        <div
          className={`modal ${
            isVisible ? 'show animateIn' : 'hide animateOut'
          }`}
        >
          <div className="modal-content modal-checkout card">
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}
