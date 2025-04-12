import {
  changeOfferPrice,
  setAuctionModal,
  updateSellerOfferPrice,
} from 'redux/dashboard/actions/ordersActions';
import { formValueSelector, getFormSyncErrors } from 'redux-form';
import { AUCTION_FORM } from 'constants/components/forms';
import { AUCTION_MODAL_CONTENT } from 'constants/components/modals';
import AuctionFormContent from './auction-form-content';
import BasicModal from 'components/basic-modal/basic-modal';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './auction-modal.module.scss';

function AuctionModalForm({
  actions,
  amount,
  isOpen,
  title,
  initPrice,
  offerPrice,
  src,
  isSeller,
  offerId,
  isValidOfferForm,
  sellerOfferPrice,
}) {
  function handleSubmit() {
    if (isSeller) {
      actions.updateSellerOfferPrice(amount);

      return actions.setAuctionModal();
    }

    actions.changeOfferPrice({ price: amount, offerId });

    return actions.setAuctionModal();
  }

  function getOfferPrice() {
    if (isSeller) {
      return offerPrice;
    }

    return sellerOfferPrice ? sellerOfferPrice : offerPrice;
  }

  return (
    <BasicModal
      title={AUCTION_MODAL_CONTENT.title}
      isOpen={isOpen}
      handleClose={actions.setAuctionModal}
      footerClassName={styles.footer}
      footer={
        <button
          className="primary-button"
          disabled={isValidOfferForm}
          onClick={() => handleSubmit()}
          type="button"
        >
          {AUCTION_MODAL_CONTENT.submitButton}
        </button>
      }
    >
      <div className={styles.info}>
        <img alt={title} className={styles.img} src={src} title={title} />
        <div className={styles.text}>
          {AUCTION_MODAL_CONTENT.content1}
          <span className={styles.text__title}> {title}</span>
          {AUCTION_MODAL_CONTENT.content2}
          <span className={styles.text__price}> &euro; {getOfferPrice()}</span>.
          {AUCTION_MODAL_CONTENT.content3}
          <span className={styles.text__price}> &euro; {initPrice}</span>.
        </div>
        <AuctionFormContent
          initialValues={{
            price: getOfferPrice(),
          }}
        />
      </div>
    </BasicModal>
  );
}

const mapStateToProps = state => {
  const amount = formValueSelector(AUCTION_FORM)(state, 'price');
  const offerFormSyncErrors = getFormSyncErrors(AUCTION_FORM)(state);
  const offer = state.dashboard.orders.currentOffer;
  const currentUserId = state.user.account.id;
  const isValidOfferForm = !!Object.keys(offerFormSyncErrors).length;

  if (!offer) return { amount };

  const isSeller = offer.to_account.id === currentUserId;

  return {
    amount,
    isSeller,
    offerId: offer.id,
    offerPrice: offer.price,
    sellerOfferPrice: offer.sellerOfferPrice,
    initPrice: offer.artwork.price,
    isOpen: state.dashboard.orders.auctionModal,
    title: offer.artwork.title,
    src: offer.artwork.primary_image,
    isValidOfferForm,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setAuctionModal,
      updateSellerOfferPrice,
      changeOfferPrice,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuctionModalForm);
