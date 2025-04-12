import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';

import Input from '../../reduxForm/input/input';
import React from 'react';
import { required } from '../../reduxForm/validators';
import styles from './artwork-series-modal.module.scss';

const ArtworkCreateSeriesModal = props => {
  const { open, handleSubmit, handleClose, valid } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent id="series-modal">
          <Field
            component={Input}
            validate={[required]}
            className={styles.input__wrapper}
            label="New series label"
            inputClassName={styles.input}
            name="name"
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <button
            type="button"
            onClick={handleClose}
            disabled={props.loading}
            className="secondary-button"
          >
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={!valid}>
            Save
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default reduxForm({
  form: 'newSeries',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(ArtworkCreateSeriesModal);
