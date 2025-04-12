import { addHashtag, removeHashtag } from 'services/hashtagService';
import { ARTWORK_DETAIL_FORM } from 'constants/components/forms';
import { ARTWORK_GALLERY_LIMIT } from 'constants/components/artwork-page';
import ArtworkImage from 'components/artwork/artwork-page/artwork-image';
import ArtworkPageDetails from 'components/artwork/artwork-page-details/artwork-page-details';
import ArtworkPageGallery from 'components/artwork/artwork-page-gallery/artwork-page-gallery';
import ArtworkRateSection from 'components/artwork/artwork-rate-section/artwork-rate-section';
import ArtworkVerify from 'components/artwork/artwork-page/artwork-verify';
import ForSale from 'components/artwork/artwork-page/for-sale';
import PriceDetails from 'components/artwork/artwork-page/price-details';
import React from 'react';
import RequiredSaleInfoModal from 'components/artwork/artwork-upload/components/required-sale-info-modal/required-sale-info-modal';
import TradeButtons from 'components/artwork/artwork-page/trade-buttons';
import classnames from 'classnames';
import { cssClassWithModifier } from 'helpers/utils';
import { reduxForm } from 'redux-form';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

const PageDetails = reduxForm({
  form: ARTWORK_DETAIL_FORM,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(
  ({
    setCurrent,
    currentImg,
    setHashtags,
    hashtags,
    setDeletedHashtags,
    deletedHashtags,
  }) => {
    const {
      addToCart,
      setOfferOpenCheck,
      forSaleStatusChange,
      getShipmentRates,
      setGalleryModal,
      isUser,
      isArtist,
      IsArtworkParams,
      isSold,
      isArtworkArtist,
      isArtworkOwner,
      currentArtwork,
      inOffer,
      inCart,
      loading,
      artworkId,
      artworkName,
      artworkPrice,
      lowesRate,
      canEditRoles,
      galleryImages,
      ratesFetching,
    } = useArtworkPage();

    function handleGalleryModal(index) {
      if (
        index === ARTWORK_GALLERY_LIMIT - 1 &&
        galleryImages.length > ARTWORK_GALLERY_LIMIT
      ) {
        setGalleryModal(true);
      }
      setCurrent(index);
    }

    return (
      <section className={styles.artwork}>
        <div className="container">
          <RequiredSaleInfoModal
            requiredSaleInfo
            forSaleStatusChange={forSaleStatusChange}
          />

          <form
            className={classnames(styles.content, {
              [cssClassWithModifier(styles, 'content', 'empty')]:
                !loading && !artworkId,
            })}
            id="artwork_edit_form"
            onKeyPress={e => (e.key === 'Enter' ? e.preventDefault() : null)}
          >
            <ArtworkImage currentImg={currentImg} setCurrent={setCurrent} />

            {!loading && !artworkId && (
              <div className={styles.details}>
                <h1 className={styles['page-title']}>Artwork not found</h1>
              </div>
            )}

            {artworkId && (
              <div className={styles.details}>
                <div className={styles.details__part}>
                  <ArtworkPageDetails
                    hashtags={hashtags}
                    addHashtag={data => addHashtag(data, hashtags, setHashtags)}
                    removeHashtag={(id, hashtag_id) =>
                      removeHashtag(
                        id,
                        hashtag_id,
                        hashtags,
                        setHashtags,
                        deletedHashtags,
                        setDeletedHashtags
                      )
                    }
                  />
                </div>

                {!loading && (
                  <div
                    className={`${styles.details__part} ${styles.gallery__part}`}
                  >
                    <ArtworkPageGallery
                      currentImg={currentImg}
                      gallery={galleryImages}
                      galleryLimit={ARTWORK_GALLERY_LIMIT}
                      handleClick={index => handleGalleryModal(index)}
                      loading={loading}
                      title={artworkName}
                    />
                  </div>
                )}

                {!isArtworkArtist &&
                  !isArtworkOwner &&
                  !canEditRoles &&
                  !loading && (
                    <div className={`${styles.details__part}`}>
                      <ArtworkRateSection
                        getRates={getShipmentRates}
                        price={artworkPrice}
                        rate={lowesRate}
                        ratesFetching={ratesFetching}
                      />
                    </div>
                  )}

                {(canEditRoles || isArtworkArtist || isArtworkOwner) && (
                  <ArtworkVerify />
                )}

                {((isArtworkArtist && isArtworkOwner) || canEditRoles) && (
                  <ForSale />
                )}

                {(canEditRoles || isArtworkArtist || isArtworkOwner) && (
                  <PriceDetails />
                )}

                {!loading && !isArtworkArtist && !isArtworkOwner && (
                  <TradeButtons
                    addToCart={addToCart}
                    currentArtwork={currentArtwork}
                    inCart={inCart}
                    inOffer={inOffer}
                    isArtist={isArtist}
                    isArtworkOwner={isArtworkOwner}
                    IsArtworkParams={IsArtworkParams}
                    isSold={isSold}
                    isUser={isUser}
                    loading={loading}
                    setOfferOpenCheck={setOfferOpenCheck}
                    ratesFetching={ratesFetching}
                  />
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    );
  }
);

export default PageDetails;
