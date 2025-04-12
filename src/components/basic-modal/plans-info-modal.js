import DefaultModal from './basic-modal';
import React from 'react';
import styles from './plans-info-modal.module.scss';
import { usePricing } from 'hooks/use-pricing';

const PlansInfoModal = () => {
  const {
    infoModalOpen,
    modalTitle,
    modalDescription,
    modalInfoImg,
    closeInfoModal,
  } = usePricing();

  return (
    <DefaultModal
      isOpen={infoModalOpen}
      title={modalTitle}
      handleClose={closeInfoModal}
      footer
      customWidth={styles.custom_width}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p>{modalDescription}</p>
          {modalInfoImg && (
            <div className={styles.img}>
              <img src={modalInfoImg} alt="modal-info" />
            </div>
          )}
        </div>
      </div>
    </DefaultModal>
  );
};

export default PlansInfoModal;
