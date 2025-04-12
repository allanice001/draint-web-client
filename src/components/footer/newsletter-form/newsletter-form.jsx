import {
  FOOTER_NEWSLETTER_FORM,
  HOME_NEWSLETTER_FORM,
} from 'constants/components/weekly-newsletter';
import React, { useState } from 'react';
import { getFormValues, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { FooterFormContent } from './footer-form-content';
import { HomepageFormContent } from './homepage-form-content';
import NewsletterSwitchRoleModal from 'components/basic-modal/weekly-newsletter-modal/newsletter-switch-role-modal';
import { saveNewsLetter } from 'redux/global/footer/footer-actions';

export const NewsletterSubscribeForm = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
  initialValues: {
    email: '',
  },
})(props => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { reset, form, invalid, mobile } = props;
  const state = useSelector(store => store);
  const {
    profile_id: profileId,
    roleChangedTo,
    is_artist: isArtist,
  } = state.user.account;

  const value = getFormValues(form)(state);

  const handleClick = () => {
    if (isArtist && !roleChangedTo) {
      setOpen(true);
    } else {
      dispatch(saveNewsLetter(value.email, profileId));
      reset(form);
    }
  };

  return (
    <>
      {form === FOOTER_NEWSLETTER_FORM.name ? (
        <>
          <NewsletterSwitchRoleModal
            isOpen={isOpen}
            handleClose={() => setOpen(false)}
            form={FOOTER_NEWSLETTER_FORM.name}
          />

          <FooterFormContent
            onClick={() => handleClick()}
            invalid={invalid}
            mobile={mobile}
          />
        </>
      ) : (
        <>
          <NewsletterSwitchRoleModal
            isOpen={isOpen}
            handleClose={() => setOpen(false)}
            form={HOME_NEWSLETTER_FORM.name}
          />

          <HomepageFormContent
            isOpen={isOpen}
            onClick={() => handleClick()}
            handleClose={() => setOpen(false)}
            invalid={invalid}
          />
        </>
      )}
    </>
  );
});
