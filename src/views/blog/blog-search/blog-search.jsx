import { ARTIST, KEYWORD, PAGE } from 'constants/blog';
import { useCallback, useEffect, useState } from 'react';

import Icons from 'components/icons';
import { SearchInput } from 'components/inputs/search-input';
import { blogTabs } from 'constants/blog';
import { findKeywords } from 'dataLayer/keywords/find-keywords';
import styles from './styles.module.scss';
import { updateQueryParams } from 'services/query-string.service';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import useQueryParams from 'hooks/useQueryParams';

export const BlogSearch = ({ currentPage }) => {
  const history = useHistory();
  const { category } = useParams();
  const queryParams = useQueryParams();
  const initialKeyword = queryParams.get(KEYWORD);
  const initialArtist = queryParams.get(ARTIST);
  const [keyword, setKeyword] = useState(initialKeyword || '');
  const [artist, setArtist] = useState(initialArtist || '');
  const [keywordsList, setKeywordsList] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const updateQuery = useCallback(() => {
    const search = {
      [KEYWORD]: keyword || undefined,
      [ARTIST]: artist || undefined,
      [PAGE]: currentPage || 1,
    };
    updateQueryParams({ history, parsedParams: search });
  }, [artist, currentPage, history, keyword]);

  useEffect(() => {
    updateQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!initialKeyword) {
      setKeyword('');
    }
  }, [category, initialKeyword]);

  useEffect(() => {
    const postsTimeout = setTimeout(() => {
      updateQuery();
    }, 1200);

    const keywordsTimeout = setTimeout(() => {
      if (!keyword) {
        setKeywordsList([]);
        return;
      }

      setListLoading(true);
      findKeywords(keyword, category)
        .then(res => {
          const keywords = res.map(res => res.name);
          setKeywordsList(keywords);
        })
        .finally(() => setListLoading(false));
    }, 800);

    return () => {
      clearTimeout(postsTimeout);
      clearTimeout(keywordsTimeout);
    };
  }, [category, keyword, updateQuery]);

  return (
    <div className={styles.searchWrapper}>
      {category === blogTabs.COMMUNITY && (
        <SearchInput
          icon={Icons.ProfileInfo}
          placeholder="Search by artist"
          className={styles.input}
          value={artist}
          onChange={e => setArtist(e.target.value)}
        />
      )}

      <SearchInput
        listLoading={listLoading}
        itemsList={keywordsList}
        placeholder="Search by keyword"
        className={styles.input}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onItemClick={item => setKeyword(item)}
      />
    </div>
  );
};
