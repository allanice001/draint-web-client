import {
  date,
  numberOfDimensions,
  required,
  requiredList,
  weight30,
} from 'components/reduxForm/validators';

import ArtworkDetailsSkeleton from 'components/skeletons/artwork-page-details/artwork-page-details-sk';
import ArtworkPageHashtags from './artwork-page-hashtags';
import Datepicker from 'components/reduxForm/datepicker/datepicker';
import Dropdown from 'components/reduxForm/dropdown/dropdown';
import { Field } from 'redux-form';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import Textarea from 'components/reduxForm/textarea/textarea';
import cx from 'classnames';
import styles from './artwork-page-details.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';
import { MAX_DESCRIPTION } from 'constants/components/artwork-upload';

const toDate = date =>
  date ? new Date(Number(date)).toLocaleDateString('en-GB') : '';

function ArtworkPageDetails({ hashtags, removeHashtag, addHashtag }) {
  const {
    isArtistOwner,
    mediumsList,
    stylesList,
    surfacesList,
    loading,
    editMode,
    description,
    style,
    surface,
    medium,
    width,
    height,
    thickness,
    weight,
    completed,
  } = useArtworkPage();

  return loading ? (
    <ArtworkDetailsSkeleton />
  ) : (
    <div>
      <div className={styles.description}>
        {editMode ? (
          <>
            <Field
              flat
              name="description"
              placeholder="Description"
              disabled={!isArtistOwner()}
              box
              maxLength={MAX_DESCRIPTION}
              validate={required}
              component={Textarea}
            />
          </>
        ) : (
          <div className={styles.description_content}>
            <p>{description}</p>
          </div>
        )}
      </div>

      <ArtworkPageHashtags
        hashtags={hashtags}
        editMode={editMode}
        isArtistOwner={isArtistOwner}
        removeHashtag={removeHashtag}
        onSubmit={addHashtag}
      />

      <div className={styles.details}>
        <div className={cx(styles.row, { [styles.editing]: editMode })}>
          <div className={styles.field}>
            {!editMode && <label>Size</label>}
            {editMode ? (
              <>
                <Field
                  flat
                  label="Size"
                  name="width"
                  placeholder="0"
                  required
                  component={Input}
                  validate={[required, numberOfDimensions]}
                  disabled={!isArtistOwner()}
                  endpoint="W"
                />
                <Field
                  flat
                  name="height"
                  placeholder="0"
                  required
                  component={Input}
                  validate={[required, numberOfDimensions]}
                  disabled={!isArtistOwner()}
                  endpoint="H"
                />
                <Field
                  flat
                  name="thickness"
                  placeholder="0"
                  required
                  component={Input}
                  validate={[required, numberOfDimensions]}
                  disabled={!isArtistOwner()}
                  endpoint="cm"
                />
              </>
            ) : (
              <span>
                {width || '0'} W x {height || '0'} H x {thickness || '0'} Th
                (cm)
              </span>
            )}
          </div>

          <div className={styles.field}>
            {!editMode && <label>Weight</label>}
            {editMode ? (
              <Field
                className={styles.weight}
                label="Weight"
                name="weight"
                flat
                placeholder="0"
                required
                component={Input}
                validate={[required, numberOfDimensions, weight30]}
                disabled={!isArtistOwner()}
                endpoint="g"
              />
            ) : (
              <span>{weight || '-'} g</span>
            )}
          </div>

          <div className={styles.field}>
            {!editMode && <label>Completed</label>}
            {editMode ? (
              <Field
                className={styles.completed}
                label="Completed"
                flat
                validate={[required, date]}
                required
                name="completed"
                disabled={!isArtistOwner()}
                component={Datepicker}
              />
            ) : (
              <span>{toDate(completed) || '-'}</span>
            )}
          </div>
        </div>

        <div
          className={cx(styles.details, {
            [styles.select_field]: editMode,
            [styles.row]: !editMode,
          })}
        >
          <div className={styles.field}>
            {!editMode && <label>Style</label>}
            {editMode ? (
              <Field
                className={styles.style}
                name="style"
                flat
                label="Style"
                multi
                max="3"
                required
                component={Dropdown}
                disabled={!isArtistOwner()}
                list={stylesList}
                validate={requiredList}
              />
            ) : (
              <span>{style.join(', ') || '-'}</span>
            )}
          </div>

          <div className={styles.field}>
            {!editMode && <label>Medium</label>}
            {editMode ? (
              <Field
                className={styles.medium}
                name="medium"
                flat
                multi
                max="3"
                required
                label="Medium"
                component={Dropdown}
                disabled={!isArtistOwner()}
                list={mediumsList}
                validate={requiredList}
              />
            ) : (
              <span>{medium.join(', ') || '-'}</span>
            )}
          </div>

          <div className={styles.field}>
            {!editMode && <label>Surface</label>}
            {editMode ? (
              <Field
                className={styles.surface}
                name="surface"
                flat
                multi
                max="2"
                required
                label="Surface"
                component={Dropdown}
                disabled={!isArtistOwner()}
                list={surfacesList}
                validate={requiredList}
              />
            ) : (
              <span>{surface.join(', ') || '-'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkPageDetails;
