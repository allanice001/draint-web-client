import { isUserNameFree } from 'dataLayer/user/userData';

export default async function userNameCheck(value, setValue) {
  if (value.trim()) {
    return isUserNameFree(value)
      .then(({ data: { isFree } }) => setValue(!isFree))
      .catch(error => console.log(error));
  }
  return setValue(false);
}
