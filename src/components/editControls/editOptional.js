import Edit from '@material-ui/icons/Edit';
import React from 'react';

export default function EditOptionalControl(props) {
  const { condition, callback } = props;
  return (
    <>
      {condition && <Edit className="edit-icon" onClick={() => callback()} />}
    </>
  );
}
