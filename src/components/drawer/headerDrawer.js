import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';

export default class HeaderDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  }

  toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    const { state } = this;
    state[side] = open;
    this.setState({ ...state });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        />
      </div>
    );
  }
}
