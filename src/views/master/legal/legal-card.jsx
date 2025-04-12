import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './legal.module.scss';

const LegalCard = function({
  item,
  onDelete,
  handleEditLegal,
  isEditorOrAdmin,
}) {
  return (
    <div key={item.id} className={styles.legal__card}>
      {item.title !== 'Imprint' && isEditorOrAdmin && (
        <Close className={styles.close} onClick={onDelete} />
      )}
      <div
        className={styles.image__container}
        onClick={() => handleEditLegal(item)}
      >
        <img alt={item.title} className={styles.image} src={item.image_url} />
      </div>
      <div className={styles.title}>{item.title}</div>
    </div>
  );
};

LegalCard.propTypes = {
  handleEditLegal: PropTypes.func.isRequired,
  item: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
};

export default LegalCard;
