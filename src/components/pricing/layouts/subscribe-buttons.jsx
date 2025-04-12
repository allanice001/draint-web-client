import {
  ALL_IN_PLAN_NAME,
  BASIC_PLAN_NAME,
  FREE_TRIAL,
  GO_DOWN,
  GO_UP,
  MONTH,
  SUBSCRIBE,
  TRIAL_NAME,
  YOUR_PLAN,
} from 'constants/components/pricing';
import { ARTIST_SIGN_UP } from 'constants/links';
import CheckBox from 'components/reduxForm/checkbox/checkbox';
import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';
import React from 'react';
import classnames from 'classnames';
import { cssClassWithModifier } from 'helpers/utils';
import styles from './plansList.module.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export const SubscribeButtons = ({
  position,
  handleOpenSubscribeModal,
  plan,
  activePosition,
  isArtist,
  load,
  isSignUp,
  isUser,
  pricing,
  handleMonthlyTrial,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isBasicTrial, isAllInTrial } = pricing;
  const buttonClassName = classnames('ui-button', 'ui-button--primary', {
    [cssClassWithModifier(styles, 'button', 'lower')]:
      position < activePosition,
    [cssClassWithModifier(styles, 'button', 'upper')]:
      position === activePosition && isArtist,
    [cssClassWithModifier(styles, 'button', 'lower')]: !isUser,
  });

  const getButtonLabel = (position, activePosition, isSignUp, isUser) => {
    if (!isUser || !isArtist) {
      return SUBSCRIBE;
    }

    if (position > activePosition && isSignUp) {
      return SUBSCRIBE;
    }

    if (position > activePosition) {
      return GO_UP;
    }

    if (position < activePosition) {
      return GO_DOWN;
    }

    return YOUR_PLAN;
  };

  const disableButton = () => {
    if (!isUser || !isArtist) {
      return false;
    }

    return position === activePosition || !isArtist || load;
  };

  const handleClick = () => {
    if (!isUser || !isArtist) {
      localStorage.clear();
      dispatch({ type: DELETE_USER_DATA_SUCCESS });

      return history.push(ARTIST_SIGN_UP);
    }

    return handleOpenSubscribeModal(plan);
  };

  return (
    <div>
      {isSignUp && plan.period === MONTH && plan.name === BASIC_PLAN_NAME && (
        <div className={styles.trial_button}>
          <CheckBox
            name={`${TRIAL_NAME}${BASIC_PLAN_NAME}`}
            label={FREE_TRIAL}
            checked={isBasicTrial}
            onChange={handleMonthlyTrial}
            disabled={position === activePosition}
          />
        </div>
      )}

      {isSignUp && plan.period === MONTH && plan.name === ALL_IN_PLAN_NAME && (
        <div className={styles.trial_button}>
          <CheckBox
            name={`${TRIAL_NAME}${ALL_IN_PLAN_NAME}`}
            label={FREE_TRIAL}
            checked={isAllInTrial}
            onChange={handleMonthlyTrial}
            disabled={position === activePosition}
          />
        </div>
      )}

      <button
        type="button"
        className={buttonClassName}
        onClick={() => handleClick()}
        disabled={disableButton()}
      >
        {getButtonLabel(position, activePosition, isSignUp, isUser)}
      </button>
    </div>
  );
};
