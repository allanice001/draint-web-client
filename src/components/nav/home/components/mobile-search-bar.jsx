import { Field, reduxForm } from 'redux-form';
import { bool, func, number, objectOf, shape, string } from 'prop-types';
import {
  getSearchResults,
  resetFilters,
} from 'redux/global/filters/filtersActions';

import { ARTWORK_ROOT } from 'constants/routes/publicModule/artwork';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialRequest as getPublicArtwork } from 'redux/artwork/actions/artworkActions';
import styles from './mobile-search-bar.module.scss';
import { viewSearchResults } from 'services/search-bar-service';
import { withRouter } from 'react-router-dom';

function MobileSearchBarForm({
  loading,
  handleSearch,
  searchResults,
  actions,
  onSearch,
  history,
  total,
  query,
}) {
  const [TimeoutId, setTimeoutId] = React.useState(null);
  const [view, setView] = React.useState([]);

  React.useEffect(() => {
    setView(viewSearchResults(searchResults));
  }, [searchResults]);

  const handleChange = e => {
    const str = e.target.value;
    if (TimeoutId) {
      clearTimeout(TimeoutId);
    }
    const timeoutId = setTimeout(() => {
      if (str) {
        actions.getSearchResults(str);
      } else {
        actions.resetFilters();
      }
    }, 1000);
    setTimeoutId(timeoutId);
  };

  const handleClick = ({ data, type, to, param }) => {
    if (to) {
      history.push(to);
      if (history.location.pathname.indexOf(ARTWORK_ROOT) !== -1) {
        actions.getPublicArtwork({
          id: param,
          cartHash: localStorage.cartId,
        });
      }
    } else {
      handleSearch({ type, search: data });
    }
    onSearch();
  };

  return (
    <div className={styles.mob_search}>
      <div className={styles.mob_search__header} onClick={onSearch}>
        <div className={styles.arrow}>
          <Icons.ArrowRight fill="#806BFF" width={12} height={22} />
        </div>
        <div className={styles.title}>Search</div>
      </div>
      <div className={styles.mob_search__results}>
        {!!view.length &&
          view.map((el, i) => (
            <div
              className={styles.result}
              onClick={() => handleClick(el)}
              key={i}
            >
              <div className={styles.data}>{el.data}</div>
              <div className={styles.type}>{el.type}</div>
            </div>
          ))}

        {!!total && (
          <div
            className={styles.result}
            onClick={() => history.push('/search')}
          >
            <div className={styles.data}>
              Show all {total} results for “{query}”
            </div>
          </div>
        )}
      </div>
      <form
        className={styles.mob_search__form}
        onSubmit={e => e.preventDefault()}
      >
        <Field
          name="search"
          label="Search for artist, style, country, tag..."
          inputClassName={styles.input}
          labelClassName={styles.label}
          className={styles.input__wrapper}
          component={Input}
          onChange={handleChange}
          endpoint={
            loading ? (
              <Spinner className={styles.icon__spinner} />
            ) : (
              <Icons.SearchSmall className={styles.icon} />
            )
          }
        />
      </form>
    </div>
  );
}

MobileSearchBarForm.propTypes = {
  loading: bool,
  handleSearch: func,
  actions: objectOf(func),
  history: shape({
    push: func,
  }),
  onSearch: func,
  total: number,
  query: string,
};

const MobileSearchBar = reduxForm({
  form: 'navBarSearchForm',
})(MobileSearchBarForm);

function mapStateToProps(state) {
  const { filters } = state;
  return {
    loading: filters.searchLoading,
    searchResults: filters.searchResults,
    query: filters.search,
    total: filters.countData.total,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { getSearchResults, getPublicArtwork, resetFilters },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MobileSearchBar));
