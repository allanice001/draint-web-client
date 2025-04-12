import React, { useState } from 'react';
import { addHashtag, removeHashtag } from 'services/hashtagService';
import {
  date,
  length,
  length3,
  maxWeight,
  numberOfDimensions,
  price,
  required,
  requiredList,
  weight30,
} from 'components/reduxForm/validators';
import { ARTWORK_UPLOAD_FORM } from 'constants/components/forms';
import {
  MAX_DESCRIPTION,
  MAX_TITLE,
} from 'constants/components/artwork-upload';
import ArtworkPageHashtags from 'components/artwork/artwork-page-details/artwork-page-hashtags';
import CheckBox from 'components/reduxForm/checkbox/checkbox';
import Datepicker from 'components/reduxForm/datepicker/datepicker';
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import NumberInput from 'components/reduxForm/input/number-input';
import PropTypes from 'prop-types';
import Textarea from 'components/reduxForm/textarea/textarea';
import styles from 'components/artwork/artwork-upload/artwork-upload.module.scss';
import { useEarningsFee } from 'hooks/use-earnings-fee';

const UploadStepTwo = function({
  images = [],
  artworkData,
  onEdit,
  hashtags,
  setHashtags,
  planId,
}) {
  const [total, setTotal] = useState();

  const sliceTotal = total => {
    let sliced = total.slice(0, 15);
    if (sliced.length < total.length) {
      sliced += '';
    }
    return sliced;
  };

  const processingFee = useEarningsFee();

  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <h3 className={`group-title ${styles.title}`}>Artwork details</h3>

        <div className={styles.row}>
          <Field
            component={Input}
            label="Artwork title"
            maxLength={MAX_TITLE}
            lengthCounter
            name="title"
            required
            validate={required}
          />
        </div>

        <div className={styles.row}>
          <Field
            className={styles.textarea}
            name="description"
            validate={required}
            component={Textarea}
            label="Artwork description"
            maxLength={MAX_DESCRIPTION}
            required
          />
        </div>

        <div className={`${styles.row} ${styles.row__inline}`}>
          <Field
            adornment="h"
            component={Input}
            endpoint="cm"
            label="Height"
            name="height"
            required
            validate={[required, numberOfDimensions, length3]}
          />

          <Field
            name="width"
            component={Input}
            validate={[required, numberOfDimensions, length3]}
            label="Width"
            adornment="w"
            endpoint="cm"
            required
          />

          <Field
            adornment="t"
            component={Input}
            endpoint="cm"
            label="Thickness"
            name="thickness"
            validate={[required, numberOfDimensions, length3]}
            required
          />

          <Field
            name="weight"
            component={Input}
            validate={[
              required,
              numberOfDimensions,
              length,
              weight30,
              maxWeight,
            ]}
            label="Weight"
            endpoint="g"
            required
          />
        </div>

        <div className={styles.row}>
          <Field
            name="completed"
            component={Datepicker}
            validate={[required, date]}
            label="Completed"
            formName={ARTWORK_UPLOAD_FORM}
            required
          />
          <Field
            name="style"
            component={Dropdown}
            multi
            max="3"
            validate={requiredList}
            label="Style"
            formName={ARTWORK_UPLOAD_FORM}
            required
            list={[
              ...artworkData.stylesList.map(data => ({
                label: data.key,
                key: data.id,
                id: data.id,
              })),
            ]}
          />
        </div>

        <div className={styles.row}>
          <Field
            name="medium"
            component={Dropdown}
            multi
            max="3"
            formName={ARTWORK_UPLOAD_FORM}
            label="Medium"
            validate={requiredList}
            required
            list={[
              ...artworkData.mediumsList.map(data => ({
                label: data.key,
                key: data.id,
                id: data.id,
              })),
            ]}
          />

          <Field
            name="surface"
            component={Dropdown}
            formName={ARTWORK_UPLOAD_FORM}
            multi
            max="2"
            label="Surface"
            validate={requiredList}
            required
            list={[
              ...artworkData.surfacesList.map(data => ({
                label: data.key,
                key: data.id,
                id: data.id,
              })),
            ]}
          />
        </div>
        <ArtworkPageHashtags
          editMode
          hashtags={hashtags}
          removeHashtag={id => removeHashtag(id, null, hashtags, setHashtags)}
          onSubmit={data => addHashtag(data, hashtags, setHashtags)}
        />
      </div>

      <div className={styles.aside}>
        <div className={styles.images}>
          <h4 className={styles.subtitle}>Uploaded images</h4>

          <div className={styles.gallery}>
            {images.map((source, index) => (
              <img
                key={index}
                alt=""
                className={styles.gallery__item}
                src={source.imgPath}
              />
            ))}
          </div>

          {!!images.length && (
            <button
              className={`secondary-button ${styles.gallery__edit}`}
              onClick={onEdit}
              type="button"
            >
              Edit images
            </button>
          )}
        </div>

        <div className={styles.sales}>
          <h4 className={styles.subtitle}>Sales</h4>

          <Field
            box
            className={styles.checkbox}
            component={CheckBox}
            label="Artwork for sale"
            name="for_sale"
          />

          <Field
            className={styles.field}
            component={NumberInput}
            endpoint={<span>&euro;</span>}
            label="Set price"
            name="price"
            required
            onChange={e => {
              setTotal(e.target.value);
            }}
            validate={[required, price]}
            setTotal={setTotal}
            formName={ARTWORK_UPLOAD_FORM}
          />

          <div className={`${styles.sales__row} ${styles.field}`}>
            <span className={styles.cost_title}>Total price with tax</span>{' '}
            {total && <b className={styles.cost}>&euro; {sliceTotal(total)}</b>}
          </div>
          <div className={`${styles.sales__row} ${styles.field}`}>
            <span className={styles.cost_title}>Your earnings after fee</span>{' '}
            {total && (
              <b className={styles.cost}>
                &euro; {processingFee(sliceTotal(total), planId)}
              </b>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

UploadStepTwo.propTypes = {
  images: PropTypes.array,
  artworkData: PropTypes.object,
  onEdit: PropTypes.func,
  hashtags: PropTypes.array,
  setHashtags: PropTypes.func,
};

export default UploadStepTwo;
