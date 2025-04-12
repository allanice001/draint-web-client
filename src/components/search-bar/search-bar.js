import './select.scss';

// import { isoCountries as options } from '../countries/list';
// import Icons from '../icons';
// import Select from '../reduxForm/select/select';
// import Input from '../reduxForm/input/input';
import {
  Carousel,
  SingleSlide,
} from '../artist/artist-feature-carousel/artist-feature-carousel';
import { formValueSelector, reduxForm } from 'redux-form';

// import DesktopSearchBar from 'components/nav/home/desktopSearchBar';
import HomeSearchBar from './homeSearchBar';
import React from 'react';
import { connect } from 'react-redux';
import styles from './search-bar.module.scss';

let SearchBar = props => (
  <section className={styles.wrapper}>
    <div className={`container ${styles.container}`}>
      <div className={styles.content}>
        <h1 className={`group-title ${styles.title}`}>
          The all New &amp; Single Place for Collectors and Artists to Come
          Together
        </h1>

        <p className={styles.description}>
          Find and buy original artwork from artists around the world
        </p>

        {/* <form onSubmit={props.handleSubmit} className={styles.form}>
          <div className={styles.form__row}>
            <Field
              name="type"
              className={styles.select__wrapper}
              selectClassName={styles.select}
              component={Select}
              onChange={() => props.dispatch(change('searchBar', 'search', ''))}
              list={[
                { label: 'Name', value: 'name' },
                { label: 'Country', value: 'country' },
                { label: 'Hashtag', value: 'hashtag' },
              ]}
            />

            {props.searchType !== 'country' ? (
              <Field
                name="search"
                label={false}
                inputClassName={styles.input}
                className={styles.input__wrapper}
                component={Input}
                // placeholder="Search by name, country or hashtag"
              />
            ) : (
              <Field
                name="search"
                label={false}
                // className={styles.input__wrapper}
                // selectClassName={styles.input}
                className="input_select"
                component={Select}
                multi
                list={[
                  ...options.map(({ cname }) => ({
                    label: cname,
                    value: cname,
                  })),
                ]}
              />
            )}
          </div>

          <button type="submit" className={styles.button}>
            <Icons.SearchLarge className={styles.button__icon} />

            <span className={styles.button__text}>Search</span>
          </button>
        </form> */}
        <HomeSearchBar handleSearch={props.handleSearch} />
      </div>

      <div className={styles.carousel}>
        <div className={styles.carousel__desktop}>
          <Carousel autoplay vertical />
        </div>
        <div className={styles.carousel__mobile}>
          <SingleSlide slide={1} />
        </div>
      </div>
    </div>
  </section>
);

SearchBar = reduxForm({
  form: 'searchBar',
  initialValues: { type: 'name' },
})(SearchBar);

const selector = formValueSelector('searchBar');
export default SearchBar = connect(state => {
  const searchType = selector(state, 'type');
  return {
    searchType,
  };
})(SearchBar);
