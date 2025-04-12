import React, { useEffect } from 'react';

import Icons from 'components/icons';
import { ItemsList } from 'components/inputs/search-input/items-list';
import { List } from 'components/shared/list';
import cx from 'classnames';
import { findKeywords } from 'dataLayer/keywords/find-keywords';
import styles from './input-list.module.scss';
import { useState } from 'react';

const LATIN_NUMBERS_REGEX = /[\w]+/;
const ENTER_KEY_CODE = 13;
const ITEMS_LIMIT = 5;
const INITIAL_INPUT_VALUE = [];

export const InputList = ({
  label,
  placeholder,
  listItem: ListItem,
  edit,
  required = false,
  input: { onChange, value = [] },
}) => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  // In case component used in Field (redux-form)
  if (value === '') {
    value = INITIAL_INPUT_VALUE;
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
      findKeywords(keyword)
        .then(res => {
          setSuggestions(res.map(k => k.name));
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, 800);

    return () => clearTimeout(id);
  }, [keyword]);

  const toggleShowList = () => {
    setShowList(!showList);
  };

  const resetCurrentKeywords = () => {
    setKeyword('');
    setSuggestions([]);
  };

  const addTag = keyword => {
    if (value.some(tag => tag === keyword) || keyword === '') {
      resetCurrentKeywords();
      return;
    }

    onChange([...value, keyword.toLowerCase()]);
    resetCurrentKeywords();
  };

  const handleAddTag = () => {
    addTag(keyword);
  };

  const handleAddTagFromSuggestions = keyword => {
    addTag(keyword);
  };

  const handleKeyPress = e => {
    e.stopPropagation();

    if (e.charCode === ENTER_KEY_CODE) {
      handleAddTag();
    }
  };

  const handleTagDelete = deletedTag => {
    onChange(value.filter(tag => tag !== deletedTag));
  };

  const handleCurrentTagChange = e => {
    const value = e.target.value.match(LATIN_NUMBERS_REGEX);

    setKeyword(value ? value[0] : '');
  };

  return (
    <div className={styles.root}>
      <label className={cx({ [styles.required]: required }, styles.label)}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={cx(styles.input, styles.atelier)}
          name=""
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          maxLength={30}
          value={keyword}
          onChange={handleCurrentTagChange}
          disabled={value?.length >= ITEMS_LIMIT}
          onFocus={toggleShowList}
          onBlur={toggleShowList}
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={value?.length >= ITEMS_LIMIT}
          className={styles.icon}
        >
          <Icons.Check />
        </button>

        {showList && (
          <ItemsList
            align="top"
            loading={loading}
            itemsList={suggestions}
            onItemClick={handleAddTagFromSuggestions}
          />
        )}
      </div>

      {!!value?.length && (
        <List className={styles.list} horizontal>
          {value.map(value => (
            <ListItem
              edit={edit}
              onDelete={() => handleTagDelete(value)}
              key={value}
            >
              {value}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
