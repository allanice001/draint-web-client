import { ARTWORK_ROOT, ID } from 'constants/routes/publicModule/artwork';
import { Field, reduxForm } from 'redux-form';
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { ARTWORKS } from 'constants/singin-up';
import Icons from '../icons';
import Input from '../reduxForm/input/input';
import { Spinner } from '../loader/spinner-loader/spinner';
import { bindActionCreators } from 'redux';
import { clearSearchURLS } from 'redux/search/action-creators';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getSearchResults } from 'redux/global/filters/filtersActions';
import styles from './homeSearchBar.module.scss';
import { withRouter } from 'react-router-dom';

const viewSearchResults = obj => {
  if (!obj || !Object.keys(obj).length) return [];
  const res = [];
  if (obj.country.length) {
    res.push({ type: 'country', data: obj.country });
  }
  if (obj.style.length) {
    res.push({ type: 'style', data: [obj.style[0].style] });
  }
  if (obj.medium.length) {
    res.push({ type: 'medium', data: [obj.medium[0].medium] });
  }
  if (obj.surface.length) {
    res.push({ type: 'surface', data: [obj.surface[0].surface] });
  }
  if (obj.hashtag.length) {
    res.push({ type: 'hashtag', data: obj.hashtag[0].name });
  }
  if (obj.artist.length) {
    obj.artist.map(el =>
      res.push({
        type: 'artist',
        data: el.name,
        to: getArtistGalleryURL(el.username),
      })
    );
  }
  if (obj.artwork.length) {
    obj.artwork.map(el =>
      res.push({
        type: 'artwork',
        data: el.title,
        to: `${ARTWORK_ROOT}${ID}/${el.id}`,
      })
    );
  }
  return res.sort((a, b) => {
    const nameA = a.type;
    const nameB = b.type;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

function useOutsideAlerter(ref, onSubMenuClose) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onSubMenuClose(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onSubMenuClose, ref]);
}

let HomeSearchBar = props => {
  const [TimeoutId, setTimeoutId] = useState(null);
  const [view, setView] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const {
    loading,
    handleSearch,
    searchResults,
    actions,
    history,
    total,
  } = props;

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  useEffect(() => {
    setView(viewSearchResults(searchResults));
  }, [searchResults]);

  const handleChange = e => {
    const str = e.target.value.trim();
    setSearchValue(str);
    if (TimeoutId) {
      clearTimeout(TimeoutId);
    }
    const timeoutId = setTimeout(() => {
      if (str) {
        actions.getSearchResults(str);
        setOpen(true);
      }
    }, 400);
    setTimeoutId(timeoutId);
  };

  const handleClick = (data, type, to) => {
    if (to) {
      history.push(to);
      // if (history.location.pathname.indexOf(ARTWORK_ROOT) !== -1) {
      //   actions.getPublicArtwork({
      //     id: param,
      //     cartHash: localStorage.cartId,
      //   });
      // }
    } else {
      handleSearch({ type, search: data });
    }
    setOpen(false);
  };

  const redirectToSearch = () => {
    dispatch(clearSearchURLS());
    history.push(ARTWORKS);
  };

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.wrapper__form}
        onClick={() => setOpen(true)}
        onSubmit={() => {}}
      >
        <Field
          name="search"
          placeholder="Search for artist, style, country, tag..."
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
      <div
        ref={wrapperRef}
        className={`${styles.wrapper__results} ${!open &&
          styles.hide} ${!view.length && styles.empty}`}
      >
        {view.map(({ data, type, to }, i) => (
          <div
            className={styles.result}
            onClick={() => handleClick(data, type, to)}
            key={i}
          >
            <div className={styles.data}>{data}</div>
            <div className={styles.type}>{type}</div>
          </div>
        ))}

        {!!total && (
          <div className={styles.result} onClick={redirectToSearch}>
            <div className={styles.data}>
              Show all {total} results for “{searchValue}”
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HomeSearchBar = reduxForm({
  form: 'homeSearchForm',
})(HomeSearchBar);

export default connect(
  state => {
    const {
      filters: { searchLoading, searchResults, countData },
    } = state;

    return {
      loading: searchLoading,
      searchResults,
      total: countData.total,
    };
  },
  dispatch => ({ actions: bindActionCreators({ getSearchResults }, dispatch) })
)(withRouter(HomeSearchBar));
