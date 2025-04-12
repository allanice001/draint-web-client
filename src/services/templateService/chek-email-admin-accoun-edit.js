import { isUserEmailFree } from 'dataLayer/user/userData';

export default async function userEmailChecked (value, setValue) {
  if (value) {
    return isUserEmailFree(value)
      .then(({ data: { isFree } }) => setValue(!isFree))
      .catch(error => console.log(error))
  }
  return null;
}
