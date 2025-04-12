import { Field, reduxForm } from 'redux-form';

import Dropdown from '../../reduxForm/dropdown/dropdown';
import Input from '../../reduxForm/input/input';
import React from 'react';
import { isoCountries as options } from '../../countries/list';
import styles from './artwork-search-form.module.scss';

function ArtworkSearchForm(props) {
  const {
    loading,
    handleSubmit,
    styleOptions,
    mediumOptions,
    surfaceOptions,
    className,
    onShowMap,
  } = props;

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Field
          disabled={loading}
          component={Input}
          shadow
          label="Title"
          name="title"
          placeholder="Search by title"
        />
      </div>
      <div className={styles.row}>
        <Field
          disabled={loading}
          component={Dropdown}
          multi
          shadow
          name="country"
          label="Country"
          placeholder="Search by country"
          list={[
            ...options.map(({ cname, ccode }, index) => ({
              label: cname,
              key: cname,
              id: `${ccode}-${index}`,
            })),
          ]}
        />
      </div>
      <div className={styles.row}>
        <Field
          disabled={loading}
          component={Input}
          shadow
          label="Hashtag"
          name="hashtag"
          placeholder="Search by hashtag"
        />
      </div>
      <div className={styles.row}>
        <Field
          disabled={loading}
          component={Dropdown}
          multi
          shadow
          label="Style"
          name="style"
          placeholder="Search by style"
          list={[
            ...styleOptions.map(({ value }, index) => ({
              label: value,
              key: value,
              id: index,
            })),
          ]}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Field
            disabled={loading}
            component={Dropdown}
            multi
            shadow
            label="Medium"
            name="medium"
            placeholder="Search by medium"
            list={[
              ...mediumOptions.map(({ value }, index) => ({
                label: value,
                key: value,
                id: index,
              })),
            ]}
          />
        </div>
        <div className={styles.column}>
          <Field
            disabled={loading}
            component={Dropdown}
            multi
            shadow
            label="Surface"
            name="surface"
            placeholder="Search by surface"
            list={[
              ...surfaceOptions.map(({ value }, index) => ({
                label: value,
                key: value,
                id: index,
              })),
            ]}
          />
        </div>
      </div>
      <div className={styles.form__footer}>
        <button
          disabled={loading}
          type="submit"
          className={`primary-button ${styles.button}`}
        >
          Search
        </button>

        <button
          disabled={loading}
          type="button"
          className={`secondary-button ${styles.button} ${styles.map}`}
          onClick={onShowMap}
        >
          Show Map
        </button>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'artworkSearchForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(ArtworkSearchForm);
