import * as Button from 'components/shared/button/button';

import { Field } from 'redux-form';
import { Image } from 'components/reduxForm/image/image';
import { InputList } from 'components/reduxForm/input-list/input-list';
import React from 'react';
import { Tag } from 'components/shared/tag/tag';
import Textarea from 'components/reduxForm/textarea/textarea';
import { required } from 'components/reduxForm/validators';
import styles from './atelier-post-form.module.scss';
import { validationValues } from 'constants/components/atelier';

export const AtelierPostForm = ({ onSubmit, form, invalid, onClick }) => {
  return (
    <form className={styles.root} id={form} action="" onSubmit={onSubmit}>
      <div className={styles.dropzone}>
        <Field component={Image} name="image" validate={required} isAtelier />
      </div>

      <Field
        component={Textarea}
        name="description"
        label="Type description"
        placeholder="Start typing to add description..."
        maxLength={validationValues.postMaxLength}
        validate={required}
      />
      <div className={styles.tags_field}>
        <Field
          edit
          component={InputList}
          name="tags"
          label="Add tags"
          listItem={Tag}
          placeholder="Add your tags..."
          isAtelier={true}
          validate={required}
        />
      </div>
      <Button.Primary
        sm
        className={styles.button}
        type={Button.Type.Submit}
        disabled={invalid}
        onClick={onClick}
      >
        Upload post
      </Button.Primary>
    </form>
  );
};
