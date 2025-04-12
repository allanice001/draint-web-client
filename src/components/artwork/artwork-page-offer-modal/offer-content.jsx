import { Image } from 'components/image/image';
import { OFFER_MODAL_CONTENT } from 'constants/components/modals';
import OfferFormContent from './offer-form-content';
import React from 'react';
import styles from './artwork-page-offer-modal.module.scss';

function OfferContent({ title, src, artist, initPrice, lowesRate }) {
  return (
    <div className={styles.info}>
      <Image alt={title} className={styles.img} src={src} title={title} />
      <div className={styles.text}>
        {OFFER_MODAL_CONTENT.content1}
        <span className={styles.text__artist}> {artist}</span>
        {OFFER_MODAL_CONTENT.content2}
        <span className={styles.text__title}> {title}.</span>
        {OFFER_MODAL_CONTENT.content3}
        <span className={styles.text__price}> {initPrice} &euro;</span>.
        {OFFER_MODAL_CONTENT.content4}
        <span className={styles.text__price}> {lowesRate} &euro;</span>.
      </div>
      <OfferFormContent initialValues={{ price: initPrice }} />
    </div>
  );
}

export default OfferContent;
