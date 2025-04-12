import { Field, reduxForm } from 'redux-form';
import React, { useState } from 'react';

import ClientMap from '../../clientMap/client-map';
import Dropdown from '../../reduxForm/dropdown/dropdown';
import Input from '../../reduxForm/input/input';
import { isoCountries as options } from '../../countries/list';
import styles from './artists-search.module.scss';

const Form = reduxForm({
  form: 'artistsSearchForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(props => {
  const { handleSubmit, onShowMap, loading } = props;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        shadow
        name="name"
        component={Input}
        label="Name"
        placeholder="Search by artist name"
      />
      <Field
        multi
        name="country"
        component={Dropdown}
        label="Country"
        placeholder="Search by country"
        shadow
        list={[
          ...options.map(country => ({
            label: country.cname,
            key: country.cname,
            id: country.cname,
          })),
        ]}
      />
      <Field
        shadow
        name="hashtag"
        component={Input}
        label="Hashtag"
        placeholder="Search by hashtag"
      />
      <div className={styles.form__footer}>
        <button
          disabled={loading}
          type="submit"
          className={`primary-button ${styles.button}`}
        >
          Search
        </button>

        <button
          type="button"
          className={`secondary-button ${styles.button} ${styles.button__map}`}
          onClick={onShowMap}
        >
          Show Map
        </button>
      </div>
    </form>
  );
});

const ArtistsSearch = ({
  loading,
  country,
  name,
  hashtag,
  handleSearch,
  countries,
  children,
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h3 className="group-title">
          {/* Draint is home of more than 30.000 artists */}
        </h3>
        <p className="group-subtitle">
          Use filters to search for the artist by name, hashtag or country
        </p>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Form
              loading={loading}
              initialValues={{ name, hashtag, country }}
              onSubmit={handleSearch}
              onShowMap={() => setShowMap(!showMap)}
            />
            <div className={`${styles.map} ${showMap ? styles.show : ''}`}>
              <ClientMap data={countries} loading={loading} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};
export { ArtistsSearch };
