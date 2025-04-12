import { EMAIL_REGEXP_GLOBAL, PHONE_REGEXP_GLOBAL } from 'constants/global';

export const deleteEmailAndPhone = (input = '') => {
  return input
    .replace(EMAIL_REGEXP_GLOBAL, '')
    .replace(PHONE_REGEXP_GLOBAL, '');
};
