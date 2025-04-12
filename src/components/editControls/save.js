import React from 'react';
import SaveIcon from '@material-ui/icons/Save';

export default function SaveControl(props) {
  const {
    callback, callbackData, errorEmpty, errorNumber, errorLength, errorDecimal, errorDate,
  } = props;
  const disabled = errorEmpty || errorNumber || errorLength || errorDecimal || errorDate;
  return (
    <SaveIcon
      className={
              !disabled ? 'save-icon' : 'save-icon-error'
}
      onClick={e => callback(e, callbackData.field)}
    />
  );
}
