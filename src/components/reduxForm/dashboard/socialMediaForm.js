import { Field, reduxForm } from 'redux-form';
import {
  INSTAGRAM_LINK_LABEL,
  INSTAGRAM_LINK_PLACEHOLDER,
} from 'constants/components/signup-page';
import { instagramUsernameValidator, required } from '../validators';

import { BIOGRAPHY_LENGTH } from 'constants/socialMedia';
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import { Dropzone } from '../fields/dropzone/Dropzone';
import { INSTAGRAM_LINK_DELIMITER } from 'constants/global';
import Input from '../input/input';
/* eslint-disable react/no-children-prop */
import React from 'react';
import SocialMediaAvatar from '../fields/socialMediaAvatar';
import { Spinner } from 'components/lib';
import Textarea from '../textarea/textarea';
import { connect } from 'react-redux';
import { getCountryNameByCode } from 'services/global';
import useCountryList from 'hooks/use-country-list';

let SocialMediaForm = ({
  selectedFiles,
  setSelectedFiles,
  socialMediaForm,
  handleSubmit,
  disabled = false,
}) => {
  const countries = useCountryList();

  if (!socialMediaForm) {
    return <Spinner />;
  }

  const { instagramLink } = socialMediaForm.values;
  const isError =
    socialMediaForm.syncErrors &&
    Object.keys(socialMediaForm.syncErrors).length;
  const handleBtnDisabled = !selectedFiles.length || isError;

  return (
    <form onSubmit={handleSubmit}>
      <Dropzone
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <br />
      <Field
        name="instagramLink"
        placeholder={INSTAGRAM_LINK_PLACEHOLDER}
        component={Input}
        validate={[required, instagramUsernameValidator]}
        required
        label={INSTAGRAM_LINK_LABEL}
        disabled={disabled}
      />
      <br />
      <SocialMediaAvatar instagramLink={instagramLink} />
      <Field
        name="country"
        component={Dropdown}
        single
        validate={required}
        required
        label="Your Country"
        disabled={disabled}
        list={countries}
        countries
      />
      <br />
      <Field
        name="description"
        component={Textarea}
        maxLength={BIOGRAPHY_LENGTH}
        label="Tell us more about yourself"
        placeholder="Start typing to add description..."
        disabled={disabled}
      />
      <br />
      <button
        disabled={handleBtnDisabled}
        type="submit"
        className="primary-button"
        style={{ width: '100%' }}
      >
        Submit
      </button>
    </form>
  );
};

SocialMediaForm = reduxForm({
  form: 'socialMediaForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(SocialMediaForm);

function mapStateToProps(store) {
  return {
    socialMediaForm: store.form.socialMediaForm,
    enableReinitialize: true,

    initialValues: {
      instagramLink: store.artist.currentArtist?.account?.instagram?.split(
        INSTAGRAM_LINK_DELIMITER
      )[1],
      country: getCountryNameByCode(
        store.artist.currentArtist?.account?.country
      ),
      description: store.artist.currentArtist?.account?.biography,
    },
  };
}

export default SocialMediaForm = connect(mapStateToProps)(SocialMediaForm);
