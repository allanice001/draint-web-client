import { ARTWORKS, SHOPPING_CART } from 'constants/singin-up';
import {
  CREATE_ACCOUNT,
  SIGN_UP_FORM_STEP,
} from 'constants/components/auth/sign-up';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_FORM } from 'constants/components/forms';
import SignUpActiveStep from 'components/signup/signup-active-step';
import SignUpFooter from 'components/signup/signup-footer';
import SignUpStepper from 'components/signup/signup-stepper';
import { activateUserAccount } from 'redux/user/account/actions/setUserData';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { getStepsProps } from 'helpers/signup-halper/getDataByRoll';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import isEqual from 'lodash/isEqual';
import setUserDataOnSignUp from 'redux/user/account/actions/setUserDataOnSignUp';
import staticUrls from 'constants/images/static-urls';
import styles from 'components/signup/signup-stepper.module.scss';
import { submit } from 'redux-form';
import { useHistory } from 'react-router';

const getState = ({ user }) => ({
  initialStep: 0,
  isActivated: user.account.is_activated,
  token: user.account.token,
});

export function CollectorArtistSignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { initialStep, token } = useSelector(getState, isEqual);
  const artwork =
    localStorage.getItem('artwork') &&
    JSON.parse(localStorage.getItem('artwork'));

  useEffect(() => {
    if (token) dispatch(getUserDataFromStorage());
  }, [dispatch, token]);

  const [isProfileValidate, setProfileValidate] = useState(false);
  const [cartCounter, setCartCounter] = useState();
  const steps = getStepsProps(false);
  const isLastStep = initialStep === steps.length - 2;
  const validationChecks = {
    profileCheck: valid => setProfileValidate(valid),
  };

  function signUpFinishing(isArtist) {
    if (isArtist) return dispatch(activateUserAccount());

    if (artwork) {
      return history.push(
        getArtworkUrl(artwork.id, artwork.title, artwork.username)
      );
    }

    return window.location.replace(cartCounter ? SHOPPING_CART : ARTWORKS);
  }

  function firstStepSubmit(data) {
    completeSignUp(true, data);
  }

  function completeSignUp(isArtist, data) {
    function callback(counter) {
      setCartCounter(counter);
      signUpFinishing(isArtist);
    }

    return setUserDataOnSignUp(dispatch, data, isArtist, callback);
  }

  function handleOnNextDisabled() {
    if (initialStep === SIGN_UP_FORM_STEP) return !isProfileValidate;

    return false;
  }

  function handleOnNext() {
    if (initialStep === SIGN_UP_FORM_STEP) {
      dispatch(submit(SIGN_UP_FORM));
    }
  }

  return (
    <div className="signup-stepper">
      <div className="container">
        <SignUpStepper
          activeStep={initialStep}
          isArtist={true}
          onClick={handleOnNextDisabled() ? () => {} : handleOnNext}
          steps={steps}
        />

        {initialStep === SIGN_UP_FORM_STEP && (
          <h2 className={styles.header}>{CREATE_ACCOUNT}</h2>
        )}

        <SignUpActiveStep
          activeStep={initialStep}
          background={staticUrls.image.collector}
          firstStepSubmit={firstStepSubmit}
          isArtist={true}
          signUpFinishCallback={handleOnNext}
          validationChecks={validationChecks}
        />

        {initialStep === SIGN_UP_FORM_STEP && (
          <SignUpFooter
            isArtist={true}
            isLastStep={isLastStep}
            onClick={handleOnNext}
            onDisabled={handleOnNextDisabled}
          />
        )}
      </div>
    </div>
  );
}
