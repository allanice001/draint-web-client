import { FEATURES_FORM } from 'constants/components/forms';
import { Field, reduxForm } from 'redux-form';
import { required, username } from 'components/reduxForm/validators';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import Textarea from '../../components/reduxForm/textarea/textarea';
import styles from './artists-features.module.scss';
import { useSelector } from 'react-redux';

const ArtistFeaturesForm = reduxForm({
  form: FEATURES_FORM,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const { values } = useSelector(store => store.form[FEATURES_FORM]);

  return (
    <form className={styles.form} onSubmit={props.handleCreate}>
      <div>
        <Field
          name="name"
          component={Input}
          validate={[username, required]}
          placeholder={'username'}
          className={styles.input}
          maxLength={20}
        />
        <Field
          rows={1}
          name="title"
          component={Textarea}
          validate={[required]}
          placeholder={'title'}
          maxLength={50}
          className={styles.input}
        />
        <Field
          rows={5}
          name="description"
          component={Textarea}
          validate={[required]}
          placeholder={'description'}
          maxLength={200}
        />
      </div>
      <div>
        <button
          type="button"
          className="primary-button"
          disabled={props.invalid}
          onClick={() => {
            !props.current
              ? props.handleCreate(
                  values?.name,
                  values?.title,
                  values?.description
                )
              : props.handleUpdate(
                  props.current.id,
                  values?.name,
                  values?.title,
                  values?.description
                );
          }}
        >
          {`${props.current ? 'Update' : 'Create'} card`}
        </button>
      </div>
    </form>
  );
});

export default ArtistFeaturesForm;
