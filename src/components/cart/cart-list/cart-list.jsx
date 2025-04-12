import {
  ARTWORK_PRICE,
  CALCULATING,
  NOT_AVAILABLE,
  OFFER_PRICE,
  OLD_PRICE,
  SHIPPING_COST,
} from 'constants/components/cart/cart';
import { Artwork } from 'models/artwork';
import CartItemsInfo from 'components/cart/cart-items-info/cart-items-info';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import Icons from 'components/icons';
import React from 'react';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { VERIFIED } from 'constants/statuses';
import convertIsoCountry from 'services/convert-iso-country';
import styles from './cart-list.module.scss';
import { useHistory } from 'react-router';

const isOfferVerified = item => item.verification === VERIFIED;

const PriceItem = ({ item, label = '', plus }) => (
  <>
    <div className={styles.piece}>
      <span className={styles.piece__label}>{label}</span>
      <span className={styles.piece__amount}>
        {plus ? '+ ' : ' '} {'€ '}
        {isOfferVerified(item) ? item.offer_price : item.price}
      </span>
    </div>
    {label === ARTWORK_PRICE && !!item.prevPrice && (
      <div className={styles.piece}>
        <span className={styles.piece__label}>{OLD_PRICE}</span>
        <span className={styles.piece__amount_old}>
          {'€ '}
          {item.prevPrice}
        </span>
      </div>
    )}
  </>
);

const ShippingCost = ({ rate = {}, label = '', plus, loading, rateError }) => {
  const shipping = Object.keys(rate).length ? Number(rate).toFixed(2) : 0;
  return (
    <div className={styles.piece}>
      <span className={styles.piece__label}>{label}</span>
      {loading ? (
        <span className={styles.rate_text_blurred}>{CALCULATING}</span>
      ) : !loading && rateError ? (
        <span className={styles.rate_error_text_blurred}>{`${rateError}`}</span>
      ) : (
        <span className={styles.piece__amount}>
          {plus ? '+ ' : ' '} {shipping ? `€ ${shipping}` : NOT_AVAILABLE}
        </span>
      )}
    </div>
  );
};

export function CartList({
  items,
  removeItem,
  canRemoveItem = true,
  isEmptyCart,
  checkoutConfirm = false,
  loadCartItems,
}) {
  const history = useHistory();

  function handleShopping() {
    history.push(SEARCH_ARTWORKS);
  }

  if (isEmptyCart) {
    return (
      <div className={styles.empty}>
        {!loadCartItems && (
          <>
            <div className={styles.empty__icon}>
              <Icons.CartBag />
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={handleShopping}
            >
              <span>Continue Shopping</span>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {items.map((el, index) => {
        const artwork = Artwork.create(el);
        const { selectedAddress = {} } = el;

        function getItemsInfo() {
          if (Object.keys(selectedAddress).length) {
            return {
              firstName: selectedAddress.first_name,
              lastName: selectedAddress.last_name,
              email: selectedAddress.email,
              phone: selectedAddress.phone,
              country: convertIsoCountry(selectedAddress.country, true),
              state: selectedAddress.state,
              city: selectedAddress.city,
              zipcode: selectedAddress.zipcode,
              addressLine1: selectedAddress.addressLine1,
              addressLine2: selectedAddress.addressLine2,
            };
          }

          return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            state: '',
            city: '',
            zipcode: '',
            addressLine1: '',
            addressLine2: '',
          };
        }

        return (
          <section key={`${el.id}`}>
            {checkoutConfirm && (
              <div>
                <p className={styles.title_item}>Item {index + 1}</p>
                <CartItemsInfo itemsInfo={getItemsInfo()} />
              </div>
            )}
            <div className={styles.list_artwork}>
              <CollectorArtwork
                artwork={artwork}
                removeItem={removeItem}
                canRemoveItem={canRemoveItem}
                seller_profile_id={el.seller_profile_id}
                position={index + 1}
              >
                <div className={styles.footer}>
                  <div className={styles.shipping}>
                    <PriceItem
                      item={el}
                      label={isOfferVerified(el) ? OFFER_PRICE : ARTWORK_PRICE}
                    />

                    <ShippingCost
                      rate={el.selectedRate}
                      label={SHIPPING_COST}
                      loading={el.rateLoad}
                      rateError={el.rateError}
                    />
                  </div>
                  <div className={styles.price_wrapper}>
                    <span className={styles.price__label}>Total</span>
                    <span className={styles.price}>
                      {`€ ${el.totalCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </CollectorArtwork>
            </div>
          </section>
        );
      })}
    </div>
  );
}
