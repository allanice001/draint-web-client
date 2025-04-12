import * as Button from 'components/shared/button';

import { Field, reduxForm } from 'redux-form';
import { List, Record } from 'components/shared/list';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import classnames from 'classnames';
import { firstLetterNotSpace } from 'components/reduxForm/validators';
import styles from './masterAtelierForm.module.scss';

export const MasterAtelierForm = reduxForm({
  form: 'atelierTitles',
  enableReinitialize: false,
  destroyOnUnmount: true,
})(props => {
  const {
    onSubmitClick,
    titles,
    editField,
    setEditField,
    invalid,
    handleSubmit,
    fields,
  } = props;

  return (
    <form className={classnames(styles.form)} onSubmit={handleSubmit}>
      <List>
        {fields.map(field => {
          let content = null;

          if (editField !== field.key) {
            content = (
              <>
                <span className={styles.title}>{titles[field.key]}</span>
                <Button.Warning
                  xs
                  onClick={() => setEditField(field.key)}
                  icon={<EditIcon />}
                />
              </>
            );
          } else {
            content = (
              <>
                <Field
                  label=" "
                  component={Input}
                  name={field.name}
                  placeholder={titles[field.key]}
                  maxLength={50}
                  validate={firstLetterNotSpace}
                />

                <Button.Primary
                  type={Button.Type.Submit}
                  xs
                  icon={<CheckIcon />}
                  onClick={onSubmitClick}
                  disabled={invalid}
                />

                <Button.Danger
                  xs
                  icon={<ClearIcon />}
                  onClick={() => setEditField(null)}
                />
              </>
            );
          }

          return (
            <Record className={styles.row} key={field.key}>
              {content}
            </Record>
          );
        })}
      </List>
    </form>
  );
});
