import './proceedModalInput.scss';

import React from 'react';
import TextField from '@material-ui/core/TextField';

export class ProceedModalInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label } = this.props;
    return (
      <>
        <form className={`form-wrapper`} noValidate autoComplete="off">
          <TextField
            label={label}
            variant="outlined"
            className={`text-field`}
          />
        </form>
      </>
    );
  }
}
