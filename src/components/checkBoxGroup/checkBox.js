import './checkBoxGroup.scss';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

export default class CheckBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChecked, checked, label, value } = this.props;
    return (
      <div className="checkbox-wrapper">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => handleChecked(value)}
              value={value}
            />
          }
          label={label}
        />
      </div>
    );
  }
}
