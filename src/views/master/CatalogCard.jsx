import * as Button from 'components/shared/button';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from 'components/icons/editPencilIcon';
import React from 'react';
import cx from 'classnames';
import { roles } from 'helpers/get-role';
import styles from 'components/blog/singlePreviewPost/singlePreviewPost.module.scss';
import { useSelector } from 'react-redux';

const CatalogCard = props => {
  const { permission, new_permission } = useSelector(
    store => store.user.account
  );
  const role = roles({ permission, new_permission });
  const { catalog, handleOpenEditModal, removeFromList } = props;

  const CONDITION = 'not specified';
  const REQUIRED = ' (required)';
  const OPTIONAL = ' (optional)';

  const catalogList = [
    {
      title: 'Description:',
      displayed:
        catalog['description'] !== CONDITION
          ? catalog['description']
          : catalog['description'] + REQUIRED,
    },
    {
      title: 'Country:',
      displayed: catalog['country'] ? catalog['country'] : CONDITION,
    },
    {
      title: 'Availability:',
      displayed: catalog['availability'],
    },
    {
      title: 'Inventory:',
      displayed: catalog['inventory'],
    },
    {
      title: 'Condition:',
      displayed: catalog['condition'],
    },
    {
      title: 'Brand:',
      displayed: catalog['brand'],
    },
    {
      title: 'Width:',
      displayed:
        catalog['width'] !== CONDITION
          ? catalog['width'] + ' cm'
          : catalog['width'] + OPTIONAL,
    },
    {
      title: 'Height:',
      displayed:
        catalog['height'] !== CONDITION
          ? catalog['height'] + ' cm'
          : catalog['height'] + OPTIONAL,
    },
    {
      title: 'Thickness:',
      displayed:
        catalog['thickness'] !== CONDITION
          ? catalog['thickness'] + ' cm'
          : catalog['thickness'] + OPTIONAL,
    },
    {
      title: 'Weight:',
      displayed:
        catalog['weight'] !== CONDITION
          ? catalog['weight'] + ' g'
          : catalog['weight'] + OPTIONAL,
    },
  ];

  return (
    <div className={cx(styles.blog_single_post, 'catalog-card')}>
      {role.isEditorOrAdmin && (
        <div className={cx(styles.buttons_wrap, styles.actions)}>
          <Button.Warning
            xs
            onClick={() => handleOpenEditModal(catalog.id)}
            icon={<EditIcon />}
          />

          <Button.Danger
            xs
            onClick={() => removeFromList(catalog.id)}
            icon={<DeleteForeverIcon />}
          />
        </div>
      )}

      <div className={styles.blog_single_post_wrapper}>
        <div className={styles.content_wrapper}>
          <div className={styles.img_wrap}>
            <img
              srcSet={catalog.small_image || catalog.image_link}
              alt={catalog.title}
              title={catalog.title}
            />
          </div>

          <div className={styles.text_wrapper}>
            <div className={styles.post_title_wrapper}>
              <h2 className={styles.post_title}>{catalog.title}</h2>
            </div>

            <time className={styles.post_date}>{catalog.price} EUR</time>
            <div className="catalog-content">
              <ul>
                {catalogList.map((catalog, i) => (
                  <li key={i}>
                    <strong>{catalog.title}</strong>
                    <span>{catalog.displayed}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
