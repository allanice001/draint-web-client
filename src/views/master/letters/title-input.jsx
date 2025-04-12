import { FORM_FIELD } from 'constants/components/newsletter-mail-form';
import React from 'react';
import { TextField } from '@material-ui/core';

export function TitleInput({ title, inputChange }) {
  return (
    <TextField
      label={FORM_FIELD.TITLE_LABEL}
      placeholder={FORM_FIELD.TITLE_PLACEHOLDER}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      value={title || ''}
      onChange={event => inputChange(event, FORM_FIELD.TITLE)}
    />
  );
}
