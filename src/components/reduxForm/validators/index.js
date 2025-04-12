import {
  CYRILLIC_REGEXP,
  EMAIL_REGEXP,
  HASHTAG_REGEXP,
  INSTAGRAM_LINK_REGEX,
  INSTAGRAM_USERNAME_REGEX,
  MASTER_HASHTAG_REGEXP,
  MAX_POINTS_MESSAGES,
  NUMBER_OF_DIMENSIONS_REGEXP,
  NUMBER_REGEXP,
  NUM_LATIN_REGEXP,
  PHONE_REGEXP,
  POINTS_REGEXP,
  PRICE_REGEXP,
  UPDATE_PASSWORD_BY_ADMIN,
  WHITESPACE_REGEXP,
  YEAR_REGEXP,
} from 'constants/index';

export const required = input =>
  input !== undefined &&
  input !== null &&
  (typeof input === 'string' ? input.trim() !== '' : true)
    ? undefined
    : 'This field cannot be empty';

export const whitespace = input =>
  WHITESPACE_REGEXP.test(input)
    ? 'This field should not contain spaces'
    : undefined;

/**
 * Instagram link NOT required with this validator
 * @param input
 * @returns {string|undefined}
 */
export const instagramLinkValidator = input => {
  if (typeof input === 'undefined') {
    return undefined;
  }

  if (INSTAGRAM_LINK_REGEX.test(input)) {
    return undefined;
  }

  return 'Invalid instagram link';
};

/**
 * Instagram username NOT required with this validator
 * @param input
 * @returns {string|undefined}
 */
export const instagramUsernameValidator = input => {
  if (typeof input === 'undefined') {
    return undefined;
  }

  if (input === '') {
    return undefined;
  }

  if (testInstagramInputName(input)) {
    return undefined;
  }

  return 'Invalid username';
};

export const testInstagramInputName = input =>
  INSTAGRAM_USERNAME_REGEX.test(input);

export const email = input =>
  EMAIL_REGEXP.test(input) ? undefined : 'Invalid email address';

export const phone = input =>
  !input || PHONE_REGEXP.test(input) ? undefined : 'Invalid phone number';

export const phoneRedux = input =>
  input && input.length
    ? undefined
    : 'Invalid phone number. Note, that it should start with a country code.';

export const password = values => {
  const { password, confirm_password } = values;

  const errors = {};
  if (
    password &&
    confirm_password &&
    values.password !== values.confirm_password
  ) {
    errors.confirm_password = 'Passwords didn’t match';
  }
  return errors;
};

export const changePassword = values => {
  const { new_password, confirm_password } = values;

  const errors = {};
  if (
    new_password &&
    confirm_password &&
    values.new_password !== values.confirm_password
  ) {
    errors.confirm_password = 'Passwords didn’t match';
  }
  return errors;
};

export const updatePasswordByAdmin = value => {
  if (value) {
    return !UPDATE_PASSWORD_BY_ADMIN.test(value)
      ? 'Password must contain at least 8 symbols (1 upper case, number and special character)'
      : undefined;
  }
};

export const maxPoints = value =>
  !POINTS_REGEXP.test(value) ? MAX_POINTS_MESSAGES : undefined;

export const price = input =>
  !PRICE_REGEXP.test(input) ? 'Minimal price is 1.00 €' : undefined;

export const number = input =>
  NUMBER_REGEXP.test(input)
    ? undefined
    : 'There should be only numbers in this field';

export const numberOfDimensions = input =>
  NUMBER_OF_DIMENSIONS_REGEXP.test(input)
    ? undefined
    : 'There should be only numbers from 1 in this field';

export const weight30 = input =>
  +input < 30 ? 'Weight should be not less than 30 grams' : undefined;

export const maxWeight = input =>
  +input > 68000 ? 'Weight should be not more than 68 kg' : undefined;

export const length = input =>
  input && input.length > 7 ? 'Too many numbers' : undefined;

export const length3 = input =>
  input && input.length > 3 ? 'Too many numbers' : undefined;

export const length30 = input =>
  input && input.length > 30
    ? 'This field cannot be longer than 30 symbols'
    : undefined;

export const length40 = input =>
  input && input.length > 40
    ? 'This field cannot be longer than 40 symbols'
    : undefined;

export const length255 = input =>
  input && input.length > 255
    ? 'This field cannot be longer than 255 symbols'
    : undefined;

export const length50000 = input =>
  input && input.length > 50000
    ? 'This field cannot be longer than 50000 symbols'
    : undefined;

export const requiredList = input =>
  input && input.length ? undefined : 'You should pick at least one option';

export const date = input =>
  new Date(Number(input)) > Date.now()
    ? 'Enter date no later than current'
    : undefined;

export const latinic = input =>
  CYRILLIC_REGEXP.test(input)
    ? 'Address data should contain only latin letters'
    : undefined;

export const number_latin = input =>
  !NUM_LATIN_REGEXP.test(input)
    ? 'You should only use Latin characters and numbers'
    : undefined;

export const hashtagRegExp = input =>
  !HASHTAG_REGEXP.test(input)
    ? 'This field should contain only latin letters and numbers'
    : undefined;

export const masterHashtagRegExp = input =>
  !MASTER_HASHTAG_REGEXP.test(input)
    ? 'This field should contain only latin letters, numbers and symbol _'
    : undefined;

export const year = input =>
  !YEAR_REGEXP.test(input)
    ? '1950-2099'
    : undefined;

export const passwordLength = input =>
  input.length < 4 ? 'Password must be longer than 4 characters' : undefined;

export const passwordPattern = /^[a-zA-Z0-9_#?\-!@$%^&.].{6,}$/;

export const passwordRegExp = input =>
  input.length >= 6 ? undefined : `Minimum six characters`;

export const userNamePattern = /^[a-zA-Z0-9_.]+$/;

export const userNameAntiPattern = /[^a-zA-Z0-9_.]+/gimu;

export const username = input =>
  userNamePattern.test(input)
    ? undefined
    : 'You should only use Latin characters and special characters like dot or underscore';

export const noSpaceStartPattern = /^\s+/;

export const firstLetterNotSpace = input =>
  noSpaceStartPattern.test(input) ? 'Empty string can not be first' : undefined;

export const LETTERS_SPACES = /^[a-zA-Z\s]*$/;
