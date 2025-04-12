import * as CONSTANTS from 'constants/components/master/hashtags';
import { Field, reduxForm } from 'redux-form';
import {
  length30,
  masterHashtagRegExp,
  required,
  whitespace,
} from 'components/reduxForm/validators';
import Cancel from 'components/icons/cancel';
import CheckIcon from '@material-ui/icons/Check';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { Search } from 'components/icons/search';
import Textarea from 'components/reduxForm/textarea/textarea';
import classnames from 'classnames';
import styles from './hashtags.module.scss';

export const HashtagForm = reduxForm({
  form: CONSTANTS.HASHTAG_FORM_NAME,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const {
    handleAcceptEdit,
    handleCancelEdit,
    invalid,
    search,
    findHashtags,
  } = props;

  const onKeyPress = event => {
    if (event.key === CONSTANTS.ENTER_KEY) {
      search ? findHashtags() : handleAcceptEdit();
      event.preventDefault();
    }
  };

  return (
    <form onKeyPress={onKeyPress} className={styles.form}>
      {!search ? (
        <>
          <Field
            className={styles.input}
            component={Textarea}
            name={CONSTANTS.NAME_INPUT}
            maxLength={CONSTANTS.MAX_LENGTH}
            validate={[required, whitespace, length30, masterHashtagRegExp]}
          />

          <button
            type={CONSTANTS.BUTTON_TYPE}
            onClick={handleAcceptEdit}
            className={classnames(styles.button, styles.submitButton)}
            disabled={invalid}
          >
            <CheckIcon className={styles.icon} />
          </button>
          <button
            type={CONSTANTS.BUTTON_TYPE}
            onClick={handleCancelEdit}
            className={classnames(styles.button)}
          >
            <Cancel className={styles.icon} fill={'#806BFF'} />
          </button>
        </>
      ) : (
        <div className={styles.filter}>
          <Field
            label={CONSTANTS.SEARCH_LABEL}
            name={CONSTANTS.SEARCH_INPUT}
            component={Input}
            placeholder={CONSTANTS.SEARCH_PLACEHOLDER}
          />
          <button
            type={CONSTANTS.BUTTON_TYPE}
            onClick={findHashtags}
            className={styles.filterSubmit}
          >
            <Search
              className={styles.icon}
              fill={CONSTANTS.SEARCH_ICON_COLOR}
            />
          </button>
        </div>
      )}
    </form>
  );
});
