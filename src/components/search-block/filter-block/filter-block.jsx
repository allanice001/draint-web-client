import { Field, reduxForm } from 'redux-form';

import Countries from '../countries';
import Icons from '../../icons';
import OnSwipeDownWrapper from '../on-swipe-down-wrapper/on-swipe-down-wrapper';
import React from 'react';
import { TabType } from 'constants/search.constants';
import classnames from 'classnames';
import { debounce } from 'lodash/function';
import { getIndexOfTabType } from 'helpers/search/getIndexOfTabType';
import styles from '../search-block.module.scss';

const FilterBlock = ({
  filters,
  handleSubmit,
  onClose,
  isOpen,
  matchesMd,
  isCountryFilter,
  options,
  type,
  setActiveTab,
  activeTab,
  setOpenCountryFilter,
  hasTabs,
}) => {
  const formClasses = classnames(styles.form, {
    [styles.open]: isOpen && matchesMd,
  });
  const backdropClasses = classnames(styles.backdrop, {
    [styles.show]: isOpen,
  });

  const artistTabIdx = getIndexOfTabType(TabType.Artist);
  const artworkTabIdx = getIndexOfTabType(TabType.Artwork);

  return (
    <OnSwipeDownWrapper action={onClose}>
      <form className={formClasses} id="search-form" onSubmit={handleSubmit}>
        <div className={styles.header} id="search-header">
          <span />
          <button onClick={onClose} type="button">
            <Icons.Cancel className={styles.close} width={14} />
          </button>
        </div>
        {!isCountryFilter ? (
          <>
            {matchesMd && hasTabs && (
              <div className={styles.toggle__container}>
                <div className={styles.wrapper}>
                  <div
                    className={classnames(
                      styles.artists__toggle,
                      activeTab === artistTabIdx
                        ? styles.enabled__toggle
                        : styles.disabled__toggle
                    )}
                    onClick={() => setActiveTab(artistTabIdx)}
                  >
                    Artists
                  </div>
                  <div
                    className={classnames(
                      styles.artworks__toggle,
                      activeTab === artworkTabIdx
                        ? styles.enabled__toggle
                        : styles.disabled__toggle
                    )}
                    onClick={() => setActiveTab(artworkTabIdx)}
                  >
                    Paintings
                  </div>
                </div>
              </div>
            )}
            <div className={styles.filters}>
              {filters.map((filter, i) => (
                <div key={i} className={styles.filter}>
                  {filter}
                </div>
              ))}
              {matchesMd && (
                <div className={styles.search__button}>
                  <button className="primary-button" type="submit">
                    Search
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Field
            component={Countries}
            countries={options.country}
            handleSubmit={handleSubmit}
            isCountryFilter={isCountryFilter}
            isOpen={isOpen}
            name="country"
            onClose={onClose}
            setOpenCountryFilter={setOpenCountryFilter}
            type={type}
          />
        )}
      </form>

      <div className={backdropClasses} onClick={onClose} />
    </OnSwipeDownWrapper>
  );
};

export default reduxForm({
  form: 'largeSearchForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  onChange: debounce((values, dispatch, props) => {
    !props.matchesMd && (props.anyTouched || props.dirty) && props.submit();
  }, 400),
})(FilterBlock);
