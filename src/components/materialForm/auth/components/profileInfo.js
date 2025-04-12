import {
  Checkbox,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import React, { useState } from 'react';

import Icons from '../../../icons/index';
import Parse from 'react-html-parser';
import styles from './profile-info.module.scss';
import { userNameAntiPattern } from '../../../reduxForm/validators';

function GetTextError({ username }) {
  const errorText = username.is_user_name_occupied
    ? 'username has been already occupied'
    : username.invalid_username
    ? 'You should only use Latin characters and special characters like dot or underscore'
    : 'This field cannot be empty';
  return <span>{errorText}</span>;
}

const UserNameErrorMessage = ({ username, errors, value }) => {
  if (errors.draint_profile_name || username.is_user_name_occupied) {
    return <GetTextError username={username} />;
  }

  if (username.invalid_username) {
    const notValidCharacters = Parse(
      value.replace(userNameAntiPattern, `<b class=${styles.match}>$&</b>`)
    );
    return (
      <span className={styles.username_error_wrap}>
        <span className={styles.username_error_not_valid}>
          {notValidCharacters}
        </span>
        <br />
        <GetTextError username={username} />
      </span>
    );
  }

  return <span>&nbsp;</span>;
};

const IconsHandler = ({ success = false, show = true, error = false }) => {
  if (show) {
    return success ? (
      <Icons.CheckCircleGreen className={styles.check_icon} />
    ) : error ? (
      <Icons.CircleCross
        className={`${styles.check_icon} ${styles.check_icon__error}`}
      />
    ) : null;
  }
  return null;
};

export default function ProfileInfoForm(props) {
  const {
    handleInputChange,
    instaCheckBoxHandleChange,
    handleInstagramChange,
    handleInstagramName,
    displayInstagram,
    instagramChecked,
    instagramLink,
    errors,
    email,
    password,
    form,
    username,
    background,
  } = props;

  const isErrorInUserName = () =>
    errors.draint_profile_name ||
    username.invalid_username ||
    username.is_user_name_occupied;

  console.log('isErrorInUserName ', isErrorInUserName());

  const [userNameTouched, setUserNameTouched] = useState(false);

  const handleUserBaneBlur = () => {
    if (!isErrorInUserName() && !username.is_username_query_sent) {
      props.handleUserNameBlur();
    }
  };

  const handleUserNameChange = event => {
    handleInputChange(event);
    if (userNameTouched) {
      return setUserNameTouched(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.content_wrapper}>
        <div className={styles.form_wrapper}>
          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={isErrorInUserName()}
          >
            <div className={styles.input__label}>Draint profile name</div>

            <div className={styles.input_with_icon_wrap}>
              <OutlinedInput
                id="draint_profile_name"
                aria-describedby="draint_profile_name_helper"
                placeholder="Type profile name here..."
                value={form.draint_profile_name}
                onChange={handleUserNameChange}
                className={styles.input}
                onBlur={handleUserBaneBlur}
              />
              <IconsHandler
                show={username.is_username_query_sent}
                success={!isErrorInUserName()}
                error={isErrorInUserName()}
              />
            </div>

            <FormHelperText id="draint_profile_name_helper">
              <UserNameErrorMessage
                value={form.draint_profile_name}
                username={username}
                errors={errors}
              />
            </FormHelperText>
          </FormControl>

          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={errors.email || email.invalid_email}
          >
            <div className={styles.input__label}>Email address</div>
            <div className={styles.input_with_icon_wrap}>
              <OutlinedInput
                id="email"
                aria-describedby="email_helper"
                placeholder="Type email here..."
                value={form.email}
                onChange={handleInputChange}
                className={styles.input}
              />
              <IconsHandler error={email.invalid_email} />
            </div>
            <FormHelperText id="email_helper">
              {errors.email ? (
                'This field cannot be empty'
              ) : email.invalid_email ? (
                'You have entered an invalid email address!'
              ) : (
                <span>&nbsp;</span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl
            className={styles.input__wrapper}
            variant="outlined"
            error={errors.password || password.invalid_password}
          >
            <div className={styles.input__label}>Password</div>
            <div className={styles.input_with_icon_wrap}>
              <OutlinedInput
                id="password"
                aria-describedby="password_helper"
                type="password"
                placeholder="Type password here..."
                value={form.password}
                onChange={handleInputChange}
                className={styles.input}
              />
              <IconsHandler error={password.invalid_password} />
            </div>
            <FormHelperText id="password_helper">
              {errors.password ? (
                'This field cannot be empty'
              ) : password.invalid_password ? (
                `Password must be at least 6 characters long`
              ) : (
                <span>&nbsp;</span>
              )}
            </FormHelperText>
          </FormControl>

          {displayInstagram && (
            <FormControl
              className={styles.checkbox__wrapper}
              variant="outlined"
            >
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                checked={instagramChecked}
                onChange={instaCheckBoxHandleChange}
                className={styles.checkbox}
              />
              <div className={styles.checkbox__label}>Add instagram link</div>
            </FormControl>
          )}

          {instagramChecked && (
            <>
              <FormControl
                variant="outlined"
                className={styles.input__wrapper}
                error={errors.instagramLink}
              >
                <div className={styles.input__label}>Instagram Link</div>
                <OutlinedInput
                  id="instagramLink"
                  aria-describedby="artist_link_name_helper"
                  value={instagramLink}
                  placeholder="https://www.instagram.com/your-account/"
                  onChange={handleInstagramChange}
                  onBlur={handleInstagramName}
                  className={styles.input}
                />
                <FormHelperText id="confirm_password_helper">
                  {errors.instagramLink ? (
                    'Link should be like: https://www.instagram.com/your-account/'
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className="form-wrapper-input">
                <div id="instagram-feed2" />
              </FormControl>
            </>
          )}
        </div>
        {background && (
          <div className={styles.image_wrapper}>
            <img alt="background" className={styles.image} src={background} />
          </div>
        )}
      </div>
    </div>
  );
}
