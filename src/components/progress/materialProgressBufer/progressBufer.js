import './progressBufer.scss';

import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

export class ProgressBuffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: props.points,
    };
    this.progress = React.createRef();
    this.timer = {};
  }

  tick = () => {
    this.progress();
  };

  render() {
    const { completed } = this.state;
    return (
      <>
        <div className={`class-root`} ref={this.progress}>
          <LinearProgress
            variant="determinate"
            value={completed}
            color="secondary"
          />
        </div>
      </>
    );
  }
}
