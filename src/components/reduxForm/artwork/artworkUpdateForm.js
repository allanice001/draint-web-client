import { Field, reduxForm, touch } from 'redux-form';
import {
  date,
  length,
  number,
  price,
  required,
  requiredList,
  weight30,
} from '../validators';

import { Button } from '@material-ui/core';
import DefaultSelect from '../fields/artworkSelector';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import artworkDate from '../fields/artworkDate';
import artworkTextArea from '../fields/artworkTextarea';
import artworkTextField from '../fields/artworkTextfield';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let ArtworkUpdateForm = props => {
  const { Form, handleSubmit, disabled = false, artworkData } = props;
  if (!Form || !artworkData) return <Spinner />;
  const { syncErrors, anyTouched } = Form;
  const isError = syncErrors && Object.keys(syncErrors).length;
  const handleBtnDisabled = !anyTouched || isError;
  props.actions.touch(
    'title',
    'price',
    'description',
    'width',
    'height',
    'thickness',
    'weight',
    'style',
    'medium',
    'surface',
    'completed'
  );
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={artworkTextField}
        validate={required}
        label="Title"
        disabled={disabled}
      />
      <Field
        name="price"
        component={artworkTextField}
        validate={[required, price]}
        label="Price"
        // disabled={disabled}
        endpoint="€"
      />
      <Field
        name="description"
        component={artworkTextArea}
        validate={required}
        label="Description"
        disabled={disabled}
      />
      <div className="title-bottom">ARTWORK RECORDED SIZE</div>
      <Field
        name="width"
        component={artworkTextField}
        validate={[required, number, length]}
        label="Width"
        disabled={disabled}
        endpoint="cm"
      />
      <Field
        name="height"
        component={artworkTextField}
        validate={[required, number, length]}
        label="Height"
        disabled={disabled}
        endpoint="cm"
      />
      <Field
        name="thickness"
        component={artworkTextField}
        validate={[required, number, length]}
        label="Thickness"
        disabled={disabled}
        endpoint="cm"
      />
      <Field
        name="weight"
        component={artworkTextField}
        validate={[required, number, length, weight30]}
        label="Weight"
        disabled={disabled}
        endpoint="g"
      />
      <Field
        name="style"
        component={DefaultSelect}
        validate={requiredList}
        labelWidth={30}
        label="Style"
        disabled={disabled}
        list={artworkData.stylesList}
      />
      <Field
        name="medium"
        component={DefaultSelect}
        validate={requiredList}
        labelWidth={40}
        label="Medium"
        disabled={disabled}
        list={artworkData.mediumsList}
      />
      <Field
        name="surface"
        component={DefaultSelect}
        validate={requiredList}
        labelWidth={45}
        label="Surface"
        disabled={disabled}
        list={artworkData.surfacesList}
      />
      <Field
        name="completed"
        component={artworkDate}
        validate={[required, date]}
        label="Completed"
        disabled={disabled}
      />
      <Button
        fullWidth
        disabled={handleBtnDisabled}
        type="submit"
        variant="contained"
        color="primary"
      >
        Save Artwork Data
        <SaveIcon />
      </Button>
    </form>
  );
};

ArtworkUpdateForm = reduxForm({
  form: 'artworkUpdateForm',
  destroyOnUnmount: false,
})(ArtworkUpdateForm);

function mapStateToProps(store) {
  if (store.artwork.artworkData.currentArtwork) {
    return {
      Form: store.form.artworkUpdateForm,
      enableReinitialize: true,
      artworkData: store.artwork.artworkData,

      initialValues: {
        ...store.artwork.artworkData.currentArtwork,
      },
    };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        touch,
      },
      dispatch
    ),
  };
}

export default ArtworkUpdateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkUpdateForm);
