import { submit } from 'redux-form';

export default function submitProfile() {
  return (dispatch, getState) => {
    const { is_artist: isArtist } = getState().user.account;

    if (isArtist || isArtist === undefined) dispatch(submit('profileInfoForm'));
    else dispatch(submit('customerForm'));
  };
}
