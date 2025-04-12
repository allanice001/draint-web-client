import { INSTAGRAM_LINK } from 'constants/global';
import { getInstagramUsername } from '../instagram-url-checker';
import { testInstagramInputName } from 'components/reduxForm/validators';

export const handleInstagramUsername = username => {
  const checkedUsername = getInstagramUsername(username);

  if (!!checkedUsername && testInstagramInputName(checkedUsername)) {
    return `${INSTAGRAM_LINK}${checkedUsername}`;
  }

  return null;
};
