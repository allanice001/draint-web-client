import Edit from '@material-ui/icons/Edit';
import React from 'react';

export default function EditControl(props) {
  const { condition, callback, callbackData } = props;
  return (
    <>
      {condition && (
        <Edit
          className="edit-icon"
          onClick={() => callback(callbackData.field)}
        />
      )}
    </>
  );
}
