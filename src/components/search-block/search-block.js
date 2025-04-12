import React, { useContext, useEffect, useState } from 'react';
import { TabList, TabType } from 'constants/search.constants';
import {
  clearSearchResult,
  fetchSearchResult,
  setShowResultFor,
} from 'redux/search/action-creators';
import { getCountryCodeByName, parseParams } from 'services/global';
import {
  getPageType,
  getSavedResult,
  getSearchLoading,
  getSearchResult,
  getShowResultFor,
} from 'redux/search/selectors';
import { useDispatch, useSelector } from 'react-redux';

import FilterBlock from './filter-block/filter-block';
import Icons from '../icons';
import PropTypes from 'prop-types';
import { SearchContext } from '../search-page/search-page';
import SearchPagination from '../search-pagination/search-pagination';
import clsx from 'classnames';
import { isEqual } from 'lodash';
import { mergeArraysInTwo } from 'helpers/search/mergeArraysInTwo';
import { pageScroll } from 'services/pageScroller';
import styles from './search-block.module.scss';
import { updateClassList } from 'helpers/utils';
import { updateQueryParams } from 'services/query-string.service';
import { useHistory } from 'react-router-dom';

function SkeletonView({ Skeleton, row, matchesMd }) {
  const data = matchesMd
    ? [Array.from(Array(15)), Array.from(Array(15))]
    : [Array.from(Array(15)), Array.from(Array(15)), Array.from(Array(15))];

  return (
    <div className={styles.content}>
      {data.map((column, i) => (
        <div className={clsx(styles.column, { [styles.wrap]: row })} key={i}>
          {column.map((el, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}

SkeletonView.propTypes = {
  count: PropTypes.number,
  Skeleton: PropTypes.func.isRequired,
  row: PropTypes.bool.isRequired,
};

function SearchBlock({
  filters,
  options,
  Item,
  Skeleton,
  create,
  action,
  row,
  count,
  query,
  isOpen,
  setOpen,
  initialValues = {},
  matchesMd,
  headerRender,
  cleanPage,
  setCleanPage,
}) {
  const history = useHistory();
  const savedResult = useSelector(getSavedResult);
  const searchResult = useSelector(getSearchResult);
  const pageType = useSelector(getPageType);
  const loading = useSelector(getSearchLoading);
  const [params, setParams] = useState(initialValues);
  const showResultFor = useSelector(getShowResultFor);
  const {
    isOpenCountryFilter,
    setOpenCountryFilter,
    setActiveTab,
    activeTab,
  } = useContext(SearchContext);
  const currentTab = TabList[activeTab]?.type;
  let { result, pages = 1, total = 0 } =
    savedResult && currentTab === pageType ? savedResult : searchResult;

  if (matchesMd && result) {
    result = mergeArraysInTwo(result);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      updateClassList('remove', { el: document.body, className: 'overlay' });
    };
  }, []);

  useEffect(() => {
    const parsedParams = {
      ...parseParams(params, options),
      query,
    };
    if (Object.keys(parsedParams).length) {
      updateQueryParams({
        history,
        parsedParams,
      });
    }

    if (showResultFor === '' && currentTab === TabType.Artwork) {
      dispatch(setShowResultFor({ for: currentTab }));
    }

    dispatch(
      fetchSearchResult({
        action,
        params: parsedParams,
        query,
        withQuery: Object.keys(parsedParams).length > 1,
      })
    );

    return () => dispatch(clearSearchResult());
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const isEqualLocationAndParams = !!query
      ? isEqual({ ...initialValues, query }, params)
      : isEqual(initialValues, params);

    if (!isEqualLocationAndParams) {
      if (!!query) {
        setParams({ ...initialValues, query });
      } else {
        setParams(initialValues);
      }
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggleFilters = isOpen => {
    if (isOpen) {
      updateClassList('add', { el: document.body, className: 'overlay' });
    } else {
      updateClassList('remove', { el: document.body, className: 'overlay' });
    }
    setOpen(isOpen);
  };

  const scrollToTop = () => {
    pageScroll();
  };

  const onSubmit = params => {
    // Reset pagination on filter changing
    if (cleanPage) {
      params.page = 1;
      setCleanPage(false);
    }
    if (params?.country) {
      params.country = getCountryCodeByName(params.country);
    }
    setParams(params);
    toggleFilters(false);
  };

  return (
    <>
      {headerRender && headerRender(total)}
      <div className={styles.wrapper}>
        <FilterBlock
          activeTab={activeTab}
          filters={filters}
          isCountryFilter={isOpenCountryFilter}
          isOpen={isOpen || isOpenCountryFilter}
          matchesMd={matchesMd}
          onClose={() =>
            (isOpenCountryFilter ? setOpenCountryFilter : toggleFilters)(false)
          }
          onSubmit={params => onSubmit(params)}
          options={options}
          setActiveTab={setActiveTab}
          setOpenCountryFilter={setOpenCountryFilter}
          type={
            isOpen && isOpenCountryFilter ? 'filter_form' : 'select_country'
          }
          initialValues={initialValues}
          hasTabs={!!currentTab}
        />

        {!loading && total === 0 && (
          <h1 className={styles.no__results}>Sorry, no results found.</h1>
        )}
        {!loading && result && (
          <div className={styles.content}>
            {result.map((column, i) => (
              <div
                className={`${styles.column} ${row ? styles.wrap : ''}`}
                key={i}
              >
                {column.map(el =>
                  el ? <Item {...create(el)} key={el.id} /> : null
                )}
              </div>
            ))}
          </div>
        )}

        {loading && (
          <SkeletonView Skeleton={Skeleton} row={row} matchesMd={matchesMd} />
        )}

        <div className={styles.footer}>
          <button
            type="button"
            onClick={scrollToTop}
            className={`${styles.button} ${styles.circle}`}
          >
            <Icons.DropdownArrow className={styles.icon} />
          </button>

          {!isOpenCountryFilter && (
            <button
              type="button"
              onClick={() => {
                toggleFilters(true);
              }}
              className={styles.button}
            >
              <Icons.Filter className={styles.icon} />
              Filters
            </button>
          )}
        </div>
      </div>

      <SearchPagination
        className={styles.pagination}
        pages={pages}
        currentPage={+params.page || 1}
        setPage={page => {
          setParams({ ...params, page });
        }}
      />
    </>
  );
}

SearchBlock.defaultProps = {
  action: () => {},
  create: () => {},
  Item: () => {},
  onCountries: () => {},
  options: {},
  row: false,
  setRange: () => {},
  Skeleton: () => {},
  type: null,
};

SearchBlock.propTypes = {
  action: PropTypes.func,
  count: PropTypes.number,
  create: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  Item: PropTypes.func,
  onCountries: PropTypes.func,
  options: PropTypes.objectOf(PropTypes.any),
  row: PropTypes.bool,
  setRange: PropTypes.func,
  Skeleton: PropTypes.func,
  type: PropTypes.string,
};

export default SearchBlock;
