import * as Button from 'components/shared/button';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import {
  confirmCertificate,
  isCreatedStatus,
} from 'redux/dashboard/actions/settingsActions';
import { useDispatch, useSelector } from 'react-redux';
import ArtworkCertificate from './artwork-certificate';
import DefaultModal from 'components/basic-modal/basic-modal';
import downloadImageFromS3 from 'redux/master/thunks/download-image-from-s3';
import { getBase64ImageURL } from 'services/images/imageService';
import { getName } from 'services/global';
import { saveAs } from 'file-saver';
import staticUrls from 'constants/images/static-urls';
import styles from './order-modal-certificate.module.scss';
import { toPng } from 'html-to-image';

function OrderModalCertificate({
  order,
  isOpen,
  setOpen,
  signature,
  orderPagination,
  resale = false,
}) {
  function getData() {
    if (order) {
      const { id, artwork, buyer, price } = order;
      return {
        buyerName: getName(
          buyer.first_name,
          buyer.last_name,
          'anonymous buyer'
        ),
        buyerCountry: buyer.location?.country,
        orderId: id,
        title: artwork.title,
        authorName: getName(
          artwork.artist.first_name,
          artwork.artist.last_name,
          'anonymous artist'
        ),
        date: new Date(Date.now()).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        price: price,
      };
    }
  }

  const data = getData();
  const componentRef = useRef(null);
  const [backgroundURL, setBackgroundURL] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [artworkURL, setArtworkURL] = useState(null);
  const [signatureURL, setSignatureURL] = useState(null);

  const { isCreated } = useSelector(store => store.dashboard.settings);
  const dispatch = useDispatch();

  const downloadCertificate = useCallback(() => {
    const certificate = componentRef.current;

    toPng(certificate)
      .then(dataUrl => {
        saveAs(dataUrl, `${data.title}.png`);
      })
      .then(() => {
        dispatch(isCreatedStatus(true));
      });
  }, [componentRef, dispatch, data]);

  useEffect(() => {
    if (isOpen && order && !logoURL) {
      dispatch(
        downloadImageFromS3(
          { url: staticUrls.image.logoCertificate },
          setLogoURL
        )
      );
    }
  }, [dispatch, isOpen, order, setLogoURL, logoURL]);

  useEffect(() => {
    if (isOpen && order && !backgroundURL) {
      dispatch(
        downloadImageFromS3(
          { url: staticUrls.screen.certificate },
          setBackgroundURL
        )
      );
    }
  }, [dispatch, isOpen, order, setLogoURL, backgroundURL]);

  useEffect(() => {
    if (isOpen && order && !artworkURL) {
      dispatch(
        downloadImageFromS3({ url: order.artwork.primary_image }, setArtworkURL)
      );
    }
  }, [dispatch, isOpen, order, artworkURL]);

  useEffect(() => {
    if (isOpen && signature?.Body) {
      const url = getBase64ImageURL(signature);
      setSignatureURL(url);
    }
  }, [dispatch, signature, isOpen, order]);

  function onExitModal() {
    setOpen();
    dispatch(isCreatedStatus(false));
  }

  function onCreate(data) {
    dispatch(confirmCertificate(data, orderPagination, resale));
    setOpen();
    dispatch(isCreatedStatus(false));
  }

  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Certificate preview'}
      handleClose={onExitModal}
      footerClassName={styles.footer}
      className={styles.body}
      customWidth={styles.modal_width}
      footer={
        <>
          <Button.Secondary className={styles.button} onClick={onExitModal}>
            Exit
          </Button.Secondary>

          {!isCreated ? (
            <Button.Primary
              className={styles.button}
              onClick={downloadCertificate}
              disabled={!signatureURL || !artworkURL}
            >
              Download
            </Button.Primary>
          ) : (
            <Button.Primary
              className={styles.button}
              onClick={() =>
                onCreate({
                  accountId: order.artwork.artist.accountId,
                  orderId: data.orderId,
                })
              }
            >
              Create
            </Button.Primary>
          )}
        </>
      }
    >
      <ArtworkCertificate
        ref={componentRef}
        data={data}
        order={order}
        artworkURL={artworkURL}
        signatureURL={signatureURL}
        logoURL={logoURL}
        backgroundURL={backgroundURL}
      />
    </DefaultModal>
  );
}

OrderModalCertificate.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
  data: shape({
    buyerName: string.isRequired,
    buyerCountry: string.isRequired,
    signature: string.isRequired,
    title: string.isRequired,
    authorName: string.isRequired,
    image: string.isRequired,
    date: string.isRequired,
    price: number.isRequired,
  }),
};

export default OrderModalCertificate;
