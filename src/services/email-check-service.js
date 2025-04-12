import { SIGN_UP_FORM_EMAIL_ERROR } from 'constants/components/signup-page';
import { isUserEmailFree } from 'dataLayer/user/userData';

const userEmailCheck = ({ email, token }) => {
  return isUserEmailFree(email, token).then(({ data: { isFree } }) => {
    // eslint-disable-next-line no-throw-literal
    if (!isFree) throw { email: SIGN_UP_FORM_EMAIL_ERROR };
  });
};

export default userEmailCheck;
