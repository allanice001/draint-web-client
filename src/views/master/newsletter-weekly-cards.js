import { Card, Switch } from '@material-ui/core';
/* eslint-disable no-restricted-syntax */
import React, { useCallback } from 'react';

import { Image } from '../../components/image/image';
import { imageSizes } from 'constants/media-query/image-sizes';
import moment from 'moment';
import staticUrls from 'constants/images/static-urls';
import styles from './newsletter-weekly.module.scss';

export function MasterNewsLetterWeeklyCard({
  type,
  content,
  arrayChecked,
  handleChecked,
}) {
  const [checked, checking] = React.useState(false);

  const isChecked = useCallback(() => {
    checking(false);
    for (const id of arrayChecked) {
      if (id === content.id) checking(true);
    }
  }, [arrayChecked, checking, content.id]);

  React.useEffect(() => {
    isChecked();
  }, [isChecked]);

  const check = async () => {
    handleChecked(type, content, !checked);
    checking(!checked);
  };

  const isEmptyField = field => {
    if (!field) return 'EMPTY';
    if (field === 'null null') return 'Noname';
    return field;
  };

  const dateFormat = date => {
    return moment(date)
      .utc()
      .format('MMM DD YYYY');
  };

  return (
    <>
      {type === 'checkedArtists' && (
        <Card className={styles.custom_card_wrapper}>
          <div className={styles.image_content_wrapper}>
            <Image
              className={styles.image_content}
              srcSet={content.small_avatar}
              sizes={imageSizes.SM}
              alt={content.username}
              title={content.username}
              defaultSrc={staticUrls.image.defaultArtist}
            />
          </div>
          <div className={styles.text_content_wrapper}>
            <div>
              {isEmptyField(`${content.first_name} ${content.last_name}`)}
            </div>
            <div>
              <i>{dateFormat(content.created_at)}</i>
            </div>
            <Switch
              checked={checked}
              onChange={() => check()}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        </Card>
      )}

      {type === 'checkedArtworks' && (
        <Card className={styles.custom_card_wrapper}>
          <div className={styles.image_content_wrapper}>
            <img
              className={styles.image_content}
              srcSet={content.small_image}
              sizes={imageSizes.SM}
              alt={content.id}
              title={content.id}
            />
          </div>
          <div className={styles.text_content_wrapper}>
            <div>
              <b>Author:</b>{' '}
              {isEmptyField(`${content.first_name} ${content.last_name}`)}
            </div>
            <div>
              <i>{dateFormat(content.created_at)}</i>
            </div>
            <Switch
              checked={checked}
              onChange={() => check()}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        </Card>
      )}
    </>
  );
}
