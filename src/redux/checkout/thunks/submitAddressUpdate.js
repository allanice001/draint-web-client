import { submit } from 'redux-form';

export default function addressSubmit() {
  return (dispatch) => {
    dispatch(submit('addressUpdateForm'));
  };
}
