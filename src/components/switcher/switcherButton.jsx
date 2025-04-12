import './switcher.scss';

import Checkbox from '../reduxForm/checkbox/checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ModalForSale from 'components/layout/modal/modal-for-sale';
import React from 'react';

function SwitcherButton({
  title,
  handleChange,
  changeData,
  checked,
  subscriptionChecked,
  disabled = false,
}) {
  return (
    <>
      <FormGroup className="switcher-with-modal">
        <FormControlLabel
          className="switcher-wrapper"
          control={
            <Checkbox
              disabled={disabled}
              checked={checked}
              color="default"
              onChange={() => handleChange(changeData)}
              toggle
            />
          }
          label={title}
        />
        <ModalForSale subscriptionChecked={subscriptionChecked} />
      </FormGroup>
    </>
  );
}

export default SwitcherButton;
