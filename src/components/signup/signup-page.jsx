import {
  ARTIST,
  ARTWORKS,
  CHOOSE_SUBSCRIPTION,
  COLLECTOR,
  REGISTRATION_COMPLETED,
  SHOPPING_CART,
} from 'constants/singin-up';
import React, { useEffect, useState } from 'react';
import {
  getBackgroundProps,
  getMetaHelmetProps,
  getStepsProps,
} from 'helpers/signup-halper/getDataByRoll';
import { useDispatch, useSelector } from 'react-redux';

import MetaHelmet from 'components/helmet';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import PropTypes from 'prop-types';
import { SIGN_UP_FORM } from 'constants/components/forms';
import SignUpActiveStep from 'components/signup/signup-active-step';
import SignUpFooter from 'components/signup/signup-footer';
import SignUpStepper from 'components/signup/signup-stepper';
import { activateUserAccount } from 'redux/user/account/actions/setUserData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import isEqual from 'lodash/isEqual';
import { setInitialState } from 'redux/artwork/actions/artworkActions';
import setUserDataOnSignUp from 'redux/user/account/actions/setUserDataOnSignUp';
import styles from './signup-stepper.module.scss';
import { submit } from 'redux-form';
import { withRouter } from 'react-router';

const getState = ({ pricing, user }) => ({
  initialStep: !user.account.is_activated && user.account.token ? 1 : 0,
  isActivated: user.account.is_activated,
  token: user.account.token,
});

function SignUp({ history }) {
  const dispatch = useDispatch();
  const { initialStep, isActivated, token } = useSelector(getState, isEqual);
  const artwork =
    localStorage.getItem('artwork') &&
    JSON.parse(localStorage.getItem('artwork'));

  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');

  const isArtistSignUp = window.location.pathname.includes('artist');

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    const email = parsedUrl.searchParams.get('email');

    if (email) {
      localStorage.clear();
      dispatch(setInitialState());
      setEmail(email);
    }
  }, [dispatch]);

  useEffect(() => {
    if (initialStep === 0 && isArtistSignUp) {
      setActiveStep(initialStep);
    }
  }, [initialStep, isArtistSignUp]);

  useEffect(() => {
    if (isActivated) history.push(isArtistSignUp ? PROFILE_GALLERY : ARTWORKS);
  }, [isActivated, history, isArtistSignUp]);

  useEffect(() => {
    if (token) dispatch(getUserDataFromStorage());
  }, [dispatch, token]);

  const [isProfileValidate, setProfileValidate] = useState(false);
  const [cartCounter, setCartCounter] = useState();

  const steps = getStepsProps(isArtistSignUp);

  const isLastStep = activeStep === steps.length - 2;

  const metaHelmetObject = getMetaHelmetProps(isArtistSignUp);

  const background = getBackgroundProps(isArtistSignUp);

  const validationChecks = {
    profileCheck: valid => setProfileValidate(valid),
  };

  const signUpFinishing = () => {
    if (isArtistSignUp) return dispatch(activateUserAccount());

    if (artwork) {
      return history.push(
        getArtworkUrl(artwork.id, artwork.title, artwork.username)
      );
    }

    return window.location.replace(cartCounter ? SHOPPING_CART : ARTWORKS);
  };

  function firstStepSubmit(data) {
    const callback = counter => {
      setCartCounter(counter);
      if (isArtistSignUp) {
        signUpFinishing();
        // setActiveStep(activeStep + 1);
      } else signUpFinishing();
    };

    return setUserDataOnSignUp(dispatch, data, isArtistSignUp, callback);
  }

  function handleOnNextDisabled() {
    if (activeStep === 0) return !isProfileValidate;

    return false;
  }

  const handleOnNext = () => {
    switch (activeStep) {
      case 0:
        dispatch(submit(SIGN_UP_FORM));
        break;
      case 1:
        dispatch(displayMessage(CHOOSE_SUBSCRIPTION));
        break;
      default:
        dispatch(displayMessage(REGISTRATION_COMPLETED));
    }
  };

  return (
    <div className="signup-stepper">
      <MetaHelmet
        description={metaHelmetObject.description}
        keywords={metaHelmetObject.keywords}
        title={metaHelmetObject.title}
      />
      <div className="container">
        <SignUpStepper
          activeStep={activeStep}
          isArtist={isArtistSignUp}
          onClick={handleOnNextDisabled() ? () => {} : handleOnNext}
          steps={steps}
        />

        {(activeStep === 0 || !isArtistSignUp) && (
          <h2 className={styles.header}>
            Create {isArtistSignUp ? ARTIST : COLLECTOR} account
          </h2>
        )}

        <SignUpActiveStep
          activeStep={activeStep}
          background={background}
          firstStepSubmit={firstStepSubmit}
          isArtist={isArtistSignUp}
          signUpFinishCallback={handleOnNext}
          validationChecks={validationChecks}
          email={email}
        />

        {activeStep === 0 && (
          <SignUpFooter
            isArtist={isArtistSignUp}
            isLastStep={isLastStep}
            onClick={handleOnNext}
            onDisabled={handleOnNextDisabled}
          />
        )}
      </div>
    </div>
  );
}

SignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};

export default withRouter(SignUp);
