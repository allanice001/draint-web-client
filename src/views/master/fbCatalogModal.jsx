import './fb-catalog-list.scss';

import DefaultModal from 'components/basic-modal/basic-modal';
import FBCatalogForm from './fb-catalog-form';
import React from 'react';
import { getCountryCodeByName } from 'services/global';
import { required } from 'components/reduxForm/validators';

export default function FbCatalogEdit(props) {
  const {
    open,
    handleClose,
    availabilities,
    productConditions,
    handleSelectChange,
    catalogItem,
    handleInputChange,
    saveItem,
    isDisabled,
  } = props;

  const form = {
    ...catalogItem,
    country: getCountryCodeByName(catalogItem.origin_country),
  };

  return (
    <DefaultModal
      isOpen={open}
      title={`Edit Mode`}
      maxWidth="xs"
      handleClose={handleClose}
      footer={
        <div className="button-wrapper">
          <button
            onClick={handleClose}
            type="button"
            className="secondary-button"
          >
            Cancel
          </button>

          <button
            onClick={saveItem}
            type="button"
            className="primary-button"
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      }
    >
      <FBCatalogForm
        initialValues={form}
        validate={required}
        catalogItem={catalogItem}
        availabilities={availabilities}
        productConditions={productConditions}
        handleSelectChange={handleSelectChange}
        handleInputChange={handleInputChange}
      />
    </DefaultModal>
  );
}
