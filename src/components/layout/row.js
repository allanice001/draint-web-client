import './layout.scss';

import React from 'react';

export class Row extends React.Component {
  render() {
    let cssClass = 'panel-row';
    if (this.props.align) cssClass += ' align-' + this.props.align;
    if (this.props.color) cssClass += ' ' + this.props.color;
    if (this.props.className) cssClass += ' ' + this.props.className;

    if (this.props.header) {
      return (
        <header className={cssClass}>
          <div className="content">{this.props.children}</div>
        </header>
      );
    }

    return (
      <section className={cssClass}>
        <div className="content">{this.props.children}</div>
      </section>
    );
  }
}
