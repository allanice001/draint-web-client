import {
  ARTWORK_ROOT,
  SEARCH_ARTWORKS,
} from 'constants/routes/publicModule/artwork';
import { Field, reduxForm } from 'redux-form';
import React, { useEffect, useRef, useState } from 'react';
import { any, bool, func, number, objectOf, shape, string } from 'prop-types';
import {
  clearSearchURLS,
  setShowResultFor,
} from 'redux/search/action-creators';
import { connect, useDispatch } from 'react-redux';
import {
  getSearchResults,
  resetSearch,
  setProvedData,
  setSearchArtworksFilter,
} from 'redux/global/filters/filtersActions';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { TabType } from 'constants/search.constants';
import { bindActionCreators } from 'redux';
import { getCountryCodeByName } from 'services/global';
import { initialRequest as getPublicArtwork } from 'redux/artwork/actions/artworkActions';
import styles from './desktop-search-bar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';
import { viewSearchResults } from 'services/search-bar-service';
import { withRouter } from 'react-router-dom';

function DesktopSearchBarForm({
  loading,
  searchResults,
  actions,
  history,
  total,
  query,
}) {
  const [initialTimeoutId, setInitialTimeoutId] = useState(0);
  const [view, setView] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setView(viewSearchResults(searchResults));
  }, [searchResults]);

  const handleChange = e => {
    const str = e.target.value.trim();

    if (initialTimeoutId) {
      clearTimeout(initialTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      actions.getSearchResults(str);
      !!str && setOpen(true);
    }, 1000);

    setInitialTimeoutId(timeoutId);
  };

  const dispatch = useDispatch();

  const handleClick = ({ data, type, to, param, id }) => {
    if (to) {
      history.push(to);
      if (history.location.pathname.indexOf(ARTWORK_ROOT) !== -1) {
        actions.getPublicArtwork({
          id: param,
          cartHash: localStorage.cartId,
        });
      }
    } else {
      let queryValue;

      if (type === TabType.Countries) {
        const countryCode = getCountryCodeByName(data);

        dispatch(setSearchArtworksFilter(type, countryCode));
        queryValue = countryCode;
      } else {
        dispatch(setSearchArtworksFilter(type, id || data));
        queryValue = typeof data === 'string' ? data : data[0];
      }

      dispatch(setShowResultFor({ for: TabType.Artwork }));
      history.push(`${SEARCH_ARTWORKS}?${type}=${queryValue}`);
    }
    setOpen(false);
  };

  const redirectToSearch = () => {
    setOpen(false);

    dispatch(setShowResultFor({ for: 'all' }));
    dispatch(clearSearchURLS());
    dispatch(setProvedData());

    history.push(SEARCH_ARTWORKS);
  };

  const inputRef = useRef();
  useCollectorTheme(inputRef);

  return (
    <div onMouseLeave={() => setOpen(false)} className={styles.wrapper}>
      <form
        className={styles.wrapper__form}
        onClick={() => setOpen(true)}
        onSubmit={e => e.preventDefault()}
        ref={inputRef}
      >
        <Field
          name="search"
          placeholder="Search for artist, style, country, tag..."
          inputClassName={styles.input}
          labelClassName={styles.label}
          className={styles.input__wrapper}
          component={Input}
          onChange={handleChange}
          onKeyDown={key => {
            if (key === 'Enter') {
              redirectToSearch();
            }
          }}
          endpoint={
            loading ? (
              <Spinner className={styles.icon__spinner} />
            ) : (
              <Icons.SearchSmall
                size="sm"
                className={styles.search__icon}
                onClick={() => redirectToSearch()}
              />
            )
          }
        />
      </form>

      <div className={`${styles.wrapper__results} ${!open && styles.hide}`}>
        {view.map((el, i) => (
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
          <div className={styles.result} onClick={() => redirectToSearch()}>
            <div className={styles.data}>
              Show all {total} results for “{query}”
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    filters: { searchLoading, searchResults, countData, search },
  } = state;
  return {
    loading: searchLoading,
    searchResults,
    total: countData.total || 0,
    query: search || '',
    initialValues: { search },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { getSearchResults, getPublicArtwork, resetSearch },
      dispatch
    ),
  };
}

DesktopSearchBarForm.propTypes = {
  handleSearch: func.isRequired,
  loading: bool.isRequired,
  searchResults: objectOf(objectOf(any)).isRequired,
  actions: objectOf(func).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  total: number.isRequired,
  query: string.isRequired,
};

const DesktopSearchBar = reduxForm({
  form: 'navBarSearchForm',
  enableReinitialize: true,
})(DesktopSearchBarForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DesktopSearchBar));
