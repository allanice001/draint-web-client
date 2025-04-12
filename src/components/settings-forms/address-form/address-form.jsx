import { bool, func, objectOf, string } from 'prop-types';

import AddressFormWrapper from './address-form-wrapper';
import React from 'react';
import classnames from 'classnames';
import styles from './address-form-default.module.scss';
import { useSelector } from 'react-redux';

function AddressForm({
  formName,
  title,
  withFooter,
  className,
  isDisabled,
  onSubmit,
  values,
}) {
  const classNames = classnames(styles.section, className);
  const ownerAddress = useSelector(
    store => store.artwork.artworkData?.currentArtwork?.ownerAddress
  );
  const artistAddress = useSelector(
    store => store.artist.currentArtist.account.location
  );
  const artworkUpload = useSelector(store => store.form.artworkUpload);
  const { addressForm } = useSelector(
    store => store.artwork.artworkData.requiredSaleInfoModalForms
  );
  const location = useSelector(store => store.dashboard.settings.location);

  function getInitialValues() {
    if (addressForm && !artworkUpload) {
      return ownerAddress;
    }

    if (addressForm && artworkUpload) {
      return artistAddress;
    }

    return location;
  }

  return (
    <section className={classNames}>
      <h3 className={`group-title ${styles.title}`}>{title}</h3>
      <AddressFormWrapper
        formName={formName}
        isDisabled={isDisabled}
        withFooter={withFooter}
        initialValues={getInitialValues() || values || {}}
        submitCallback={onSubmit}
        addressFormContent
      />
    </section>
  );
}

AddressForm.defaultProps = {
  title: 'Address settings',
  values: null,
  withFooter: true,
  className: null,
  formName: null,
};

AddressForm.propsTypes = {
  onSubmit: func.isRequired,
  formName: string,
  isDisabled: bool,
  withFooter: bool,
  className: string,
  title: string,
  values: objectOf(string),
};

export default AddressForm;
