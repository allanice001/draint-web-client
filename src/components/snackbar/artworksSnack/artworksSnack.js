import './artworksSnack.scss';

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default class ArtworksSnack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      message,
      vertical,
      horizontal,
      open,
      handleClose,
      style,
      wrapper,
      autoHideDuration = 2500,
    } = this.props;
    return (
      <>
        <div>
          <div className={wrapper || 'snack-wrapper'}>
            <Snackbar
              className={style}
              anchorOrigin={{ vertical, horizontal }}
              key={`${vertical},${horizontal}`}
              open={open}
              autoHideDuration={autoHideDuration}
              onClose={handleClose}
              ContentProps={{
                'aria-describedby': 'successMessage',
              }}
              message={<span id="successMessage">{message}</span>}
            />
          </div>
        </div>
      </>
    );
  }
}
