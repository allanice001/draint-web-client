import {
  Field,
  change,
  formValueSelector,
  reduxForm,
  submit,
  touch,
} from 'redux-form';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import Icons from 'components/icons';
import Input from '../../reduxForm/input/input';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { TabType } from 'constants/search.constants';
import { hashtagRegExp } from 'components/reduxForm/validators';
import { setSearchArtworksFilter } from 'redux/global/filters/filtersActions';
import { setShowResultFor } from 'redux/search/action-creators';
import styles from './artwork-page-details.module.scss';
import { useHistory } from 'react-router';

const FORM_NAME = 'hashtagForm';
const FORM_FIELD = 'hashtag';

let ArtworkPageHashtag = props => {
  const {
    valid,
    anyTouched,
    hashtags,
    editMode,
    removeHashtag,
    isArtistOwner,
    handleSubmit,
    currentValue,
  } = props;
  const dispatch = useDispatch();
  const [isHashtagInputFocused, setIsHashtagInputFocused] = useState(true);

  const hashtagRef = useRef();
  const history = useHistory();

  const handleHashTagInputFocused = useCallback(() => {
    setIsHashtagInputFocused(true);
  }, [setIsHashtagInputFocused]);

  const handleHashTagInputBlur = useCallback(() => {
    setIsHashtagInputFocused(false);
  }, [setIsHashtagInputFocused]);

  const handleHashTagInputClick = useCallback(() => {
    dispatch(touch(FORM_NAME, [FORM_FIELD]));
  }, [dispatch]);

  useEffect(() => {
    if (!hashtagRef.current || !isHashtagInputFocused || !anyTouched) return;
    hashtagRef.current.focus();
  }, [hashtagRef, isHashtagInputFocused, anyTouched]);

  const onEnter = event => {
    if (event.key === 'Enter' && valid && currentValue) {
      onAddHashtag();
    }
  };

  const onAddHashtag = () => {
    const isNotExist = hashtags.every(
      h => h.name.toLowerCase() !== currentValue.toLowerCase()
    );

    isNotExist && dispatch(submit(FORM_NAME));
    dispatch(change(FORM_NAME, FORM_FIELD, ''));
  };

  const handleRemoveHashtag = (e, id, hashtagId) => {
    e.stopPropagation();
    removeHashtag(id, hashtagId);
  };

  const handleHashTagClick = hashtagName => {
    const type = 'hashtag';

    dispatch(setSearchArtworksFilter(type, hashtagName));
    dispatch(setShowResultFor({ for: TabType.Artwork }));
    history.push(`${SEARCH_ARTWORKS}?${type}=${hashtagName}`);
  };

  return (
    <>
      {hashtags.length ? (
        <div className={styles.hashtags}>
          {hashtags.map(h => (
            <div
              className={styles.hashtag}
              key={h.id}
              onClick={() => handleHashTagClick(h.name)}
            >
              #{h.name}
              {editMode && (isArtistOwner ? isArtistOwner() : true) && (
                <span onClick={e => handleRemoveHashtag(e, h.id, h.hashtag_id)}>
                  <Icons.Delete className={styles.icon} />
                </span>
              )}
            </div>
          ))}
        </div>
      ) : null}
      {editMode && (
        <div
          onSubmit={handleSubmit}
          className={styles.hashtags__form}
          onKeyPress={onEnter}
        >
          <Field
            flat
            label="Add new hashtag"
            name={FORM_FIELD}
            placeholder="#new"
            className={styles.form_input}
            labelClassName={styles.form_label}
            component={Input}
            isHashtag
            maxLength={currentValue && currentValue.startsWith('#') ? 31 : 30}
            handleRef={hashtagRef}
            isOnFocus={isHashtagInputFocused}
            handleOnFocus={handleHashTagInputFocused}
            handleOnBlur={handleHashTagInputBlur}
            handleOnClick={handleHashTagInputClick}
            validate={[hashtagRegExp]}
            disabled={
              (isArtistOwner ? !isArtistOwner() : false) ||
              hashtags.length === 10
            }
            endpoint={
              <button
                type="button"
                onClick={() => onAddHashtag()}
                disabled={!valid || !currentValue}
                className={styles.icon}
              >
                <Icons.Check />
              </button>
            }
          />
          <div className={styles.form_counter}>{hashtags.length}/10</div>
        </div>
      )}
    </>
  );
};

ArtworkPageHashtag = reduxForm({
  form: FORM_NAME,
})(ArtworkPageHashtag);

const selector = formValueSelector(FORM_NAME);

ArtworkPageHashtag = connect(state => ({
  currentValue: selector(state, FORM_FIELD),
}))(ArtworkPageHashtag);

export default ArtworkPageHashtag;
