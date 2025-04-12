import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import SearchPagination from 'components/search-pagination/search-pagination';
import { SearchService } from 'services/search-service';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { TabType } from 'constants/search.constants';
import { imageSizes } from 'constants/media-query/image-sizes';
import { resetSearch } from 'redux/global/filters/filtersActions';
import { setShowResultFor } from 'redux/search/action-creators';
import styles from 'components/search-page/search-page.module.scss';
import { updateQueryParams } from 'services/query-string.service';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import usePrevious from 'hooks/use-previous';

const searchService = new SearchService();

function FiltersListResult({ type = 0, query, onFilter, initialValues }) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const { query: prevQuery } = usePrevious({ query, type }) || {};

  const getData = page => {
    setLoading(true);

    updateQueryParams({
      path: `/search/${type}`,
      parsedParams: { page },
      history,
    });

    searchService
      .getListByType({
        type,
        query,
        page,
        preview: true,
      })
      .then(data => {
        setTotalPages(data.totalPages);
        setList(data.searchData);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if ((!!prevQuery || !!query) && prevQuery !== query) {
      return getData(1);
    }
    const page = initialValues.page || 1;
    getData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type, initialValues]);

  const handleSetFilter = (type, value) => {
    dispatch(resetSearch());
    dispatch(setShowResultFor({ for: TabType.Artwork }));
    onFilter({
      [type]: value,
    });
  };

  if (loading) {
    return <Spinner full />;
  }

  return (
    <div className={'container'}>
      <ul className={styles.list}>
        {!list.length && <h3>Sorry, no results found.</h3>}

        {list.map(el => (
          <li
            key={el.formValue}
            className={styles.list__item}
            onClick={() => handleSetFilter(type, el.formValue)}
          >
            <div className={styles.text}>
              <span className={styles.name}>
                {el[type] ? el[type] : el.name ? `#${el.name}` : ''}
              </span>
              <br />
              <span className={styles.description}>{type}</span>
            </div>
            <div className={styles.images}>
              {el.artworks_preview.length > 0 &&
                el.artworks_preview.map(art => (
                  <img
                    key={art.id}
                    alt="Artwork"
                    srcSet={art.small_image}
                    sizes={imageSizes.SM}
                    title="Artwork"
                  />
                ))}
            </div>
          </li>
        ))}
      </ul>
      <SearchPagination
        className={styles.pagination}
        currentPage={initialValues?.page || 1}
        pages={totalPages}
        setPage={page => getData(page)}
      />
    </div>
  );
}

FiltersListResult.defaultProps = {
  type: 0,
};

FiltersListResult.propTypes = {
  onFilter: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default FiltersListResult;
