import { required, price as validPrice } from 'components/reduxForm/validators';
import { ARTWORK_DETAIL_FORM } from 'constants/components/forms';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import NumberInput from 'components/reduxForm/input/number-input';
import React from 'react';
import convertIsoCountry from 'services/convert-iso-country';
import cx from 'classnames';
import styles from './artwork-title.module.scss';
import { MAX_TITLE } from 'constants/components/artwork-upload';

function ArtworkTitle({
  title,
  editMode,
  price = '0.00',
  name,
  country,
  isArtistOwner,
  isOwner,
}) {
  return (
    <div className={styles.title__wrapper}>
      <div>
        <h1 className={styles.title}>
          {editMode ? (
            <Field
              flat
              name="title"
              placeholder="Title"
              split
              validate={required}
              disabled={!isArtistOwner()}
              className={styles.input}
              component={Input}
              maxLength={MAX_TITLE}
              lengthCounter
              countClass={styles.count}
            />
          ) : (
            title
          )}
        </h1>
        <p className={styles.artist__info}>
          <b>{name()},</b>{' '}
          {country
            ? convertIsoCountry(country, true)
            : "Country isn't specified"}
        </p>
      </div>

      <div>
        {editMode ? (
          <Field
            flat
            name="price"
            formName={ARTWORK_DETAIL_FORM}
            className={cx(styles.input, styles.input__price)}
            isOwner={!isOwner()}
            validate={[required, validPrice]}
            component={NumberInput}
          />
        ) : (
          <div className={styles.price_container}>
            <b className={styles.price}>&euro;&nbsp;{Number(price)}&nbsp;</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtworkTitle;
