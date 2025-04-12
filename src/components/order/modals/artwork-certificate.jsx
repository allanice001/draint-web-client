import React, { forwardRef, useEffect } from 'react';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import cx from 'classnames';
import { getUserSignature } from 'redux/dashboard/actions/settingsActions';
import { sliceText } from 'services/global';
import styles from './artwork-certificate.module.scss';
import { useDispatch } from 'react-redux';

function ArtworkCertificate(
  { data, order, artworkURL, signatureURL, logoURL, backgroundURL },
  ref
) {
  const dispatch = useDispatch();
  const { accountId } = order.artwork.artist;

  useEffect(() => {
    dispatch(getUserSignature({ accountId }));
  }, [dispatch, accountId]);

  const title = sliceText(data.title, 25, '...');

  function getCertificateText({ buyerName, buyerCountry, authorName }) {
    return `
      This certificate is presented to ${buyerName}${
      buyerCountry ? ` from ${buyerCountry}` : ''
    },
      and confirms that artwork by name “${title}”
      has originally produced by ${authorName} and sold through Draint.art
    `;
  }

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.root__content}>
        <img src={logoURL} className={styles.logo} alt="logo" decoding="sync" />
        <div className={cx(styles.column, styles.left)}>
          <time className={styles.date}>{data.date}</time>
          <p className={styles.underline}>Selling date</p>
        </div>
        <div className={styles.artwork}>
          <h1 className={styles.header}>CERTIFICATE</h1>
          <h3 className={styles.subheader}>of authenticity</h3>
          <div>
            {!artworkURL ? (
              <>
                <div className={styles.image}>
                  <Spinner />
                </div>
              </>
            ) : (
              <img
                src={artworkURL}
                className={styles.image}
                alt=""
                decoding="sync"
              />
            )}
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>by {data.authorName}</p>
          <b className={styles.price}>&euro; {data.price}</b>
        </div>
        <div className={cx(styles.column, styles.right)}>
          <div className={styles.description}>{getCertificateText(data)}</div>
          {signatureURL && (
            <img width="140" src={signatureURL} alt="" decoding="sync" />
          )}
          <p className={styles.underline}>Artist signature</p>
        </div>
      </div>
      <img
        className={styles.background}
        src={backgroundURL}
        alt=""
        decoding="sync"
      />
    </div>
  );
}

export default forwardRef(ArtworkCertificate);
