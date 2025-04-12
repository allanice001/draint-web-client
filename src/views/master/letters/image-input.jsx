import { FORM_FIELD, NAME } from 'constants/components/newsletter-mail-form';
import React from 'react';
import { TextField } from '@material-ui/core';

export function ImageInput({ selectedType, image, inputChange }) {
  function isDisabled() {
    switch (selectedType) {
      case NAME.ARTWORK_PRICE_CHANGED:
        return true;
      case NAME.NEWSLETTER_SIGN_UP_AS_COLLECTOR:
        return true;
      case NAME.NEWSLETTER_SIGN_IN_AS_COLLECTOR:
        return true;
      case NAME.NEWSLETTER_FORMULAR:
        return true;
      default:
        return false;
    }
  }

  return (
    <TextField
      label={FORM_FIELD.IMAGE_LABEL}
      placeholder={FORM_FIELD.IMAGE_PLACEHOLDER}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      value={image || ''}
      onChange={event => inputChange(event, FORM_FIELD.IMG_LINK)}
      disabled={isDisabled()}
    />
  );
}
