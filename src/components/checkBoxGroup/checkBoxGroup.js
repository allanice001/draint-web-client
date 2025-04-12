import './checkBoxGroup.scss';

import CheckBoxComponent from './checkBox';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';

export default class CheckBoxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleChecked, checked, checkBoxParams } = this.props;
    return (
      <div className="checkbox-wrapper">
        <FormGroup row>
          <CheckBoxComponent
            handleChecked={handleChecked}
            checked={checked}
            value={checkBoxParams.value}
            label={checkBoxParams.label}
          />
        </FormGroup>
      </div>
    );
  }
}
