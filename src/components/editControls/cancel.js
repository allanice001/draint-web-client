import Backspace from '@material-ui/icons/Backspace';
import React from 'react';

export default function CancelControl(props) {
  const { callback, callbackData } = props;
  return (
    <Backspace
      className="cancel-icon"
      onClick={() => callback(callbackData.field, callbackData.value)}
    />
  );
}
