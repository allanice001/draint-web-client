import './modal.scss';
import DefaultModal from 'components/basic-modal/basic-modal';
import { MODAL_CONTENT } from 'constants/components/artwork-upload';
import Parse from 'react-html-parser';
import React from 'react';
import styles from './modal.module.scss';

export function ModalWindow({ isOpen, setOpen, multi, maxWidth }) {
  const displayNone = value => (!value ? { display: 'none' } : null);

  const body = (
    <div className={styles.content}>
      <img
        alt="modal-card-pict"
        className={styles.image}
        src={MODAL_CONTENT.image}
        style={displayNone(MODAL_CONTENT.image)}
        title="modal-image"
      />
      <div
        className={styles.text}
        style={displayNone(MODAL_CONTENT.description)}
      >
        {MODAL_CONTENT.description}
      </div>
    </div>
  );

  return (
    <>
      <DefaultModal
        isOpen={isOpen}
        title={MODAL_CONTENT.name}
        handleClose={setOpen}
        multi={multi}
        maxWidth={maxWidth}
      >
        {body}
      </DefaultModal>
    </>
  );
}

export const LegalModal = ({ isOpen, data = {}, setOpen }) => {
  const body = () => (
    <div className={styles.content}>
      <img
        alt="modal-card-pict"
        className={styles.image}
        src={data.image_url}
        title="modal-image"
      />
      <div className={styles.legal__text}>{Parse(data.html_content)}</div>
      <div className={styles.blur__text} />
    </div>
  );

  return (
    <>
      <DefaultModal
        handleClose={() => setOpen(!isOpen)}
        isOpen={isOpen}
        title={data.title}
      >
        {body()}
      </DefaultModal>
    </>
  );
};
