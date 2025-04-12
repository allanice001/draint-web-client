import { Field, reduxForm, touch } from 'redux-form';
import { price, required } from '../validators';

import { Button } from '@material-ui/core';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import React from 'react';
import { Spinner } from '../../loader/spinner-loader/spinner';
import artworkTextField from '../fields/artworkTextfield';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let ArtworkOfferForm = props => {
  const { handleSubmit, disabled = false, artworkData } = props;
  if (!artworkData) return <Spinner />;
  props.actions.touch('price');
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="price"
        component={artworkTextField}
        validate={[required, price]}
        label="Price"
        disabled={disabled}
        endpoint="€"
      />
      <Button
        fullWidth
        disabled={!props.valid}
        type="submit"
        variant="contained"
        color="primary"
      >
        <QuestionAnswerOutlinedIcon />
        Make an Offer
      </Button>
    </form>
  );
};

ArtworkOfferForm = reduxForm({
  form: 'artworkOfferForm',
  destroyOnUnmount: false,
})(ArtworkOfferForm);

function mapStateToProps(store) {
  if (store.artwork.artworkData.currentArtwork) {
    return {
      enableReinitialize: true,
      artworkData: store.artwork.artworkData,
      initialValues: { price: store.artwork.artworkData.currentArtwork.price },
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

export default ArtworkOfferForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkOfferForm);
