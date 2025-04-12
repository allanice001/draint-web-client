import React, { useEffect } from 'react';

import CollectorArtwork from '../collector-artwork/collector-artwork';
import ShippingMap from '../../shipping-map/shipping-map';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getArtistArtworks } from '../../../redux/artist/actions/artistProfileActions';
import styles from './collector-orders.module.scss';

const ShippingItem = ({ amount = 0, label = '', plus }) => (
  <div className={styles.piece}>
    <span className={styles.piece__label}>{label}</span>
    <b className={styles.piece__amount}>
      {plus ? '+' : ''} € {amount}
    </b>
  </div>
);

function CollectorOrders({ orders = [], username }) {
  const ordersView = orders.map(el => (
    <li className={styles.order} key={el.id}>
      <CollectorArtwork {...el}>
        <div className={styles.footer}>
          <div className={styles.shipping}>
            <ShippingItem amount={30} label="Artwork price" />
            <ShippingItem amount={30} label="17% tax" plus />
            <ShippingItem amount={30} label="Shipping cost" plus />
          </div>

          <b className={styles.price}>€ {el.price}</b>
        </div>
      </CollectorArtwork>

      <ShippingMap className={styles.shipping} />
    </li>
  ));
  const titleClasses = classnames('group-title', styles.title);

  useEffect(() => {
    if (username) {
      getArtistArtworks(username);
    }
  }, [username]);

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h3 className={titleClasses}>Active orders</h3>

        <ul className={styles.list}>{ordersView}</ul>
      </div>
    </section>
  );
}

const convertData = data => ({
  primary_image: data.artwork_img,
  title: data.artwork_title,
  width: data.artwork_width,
  weight: data.artwork_weight,
  height: data.artwork_height,
  thickness: data.artwork_thickness,
  style: [],
  medium: [],
  surface: [],
  created_at: data.artwork_created, // change it, used for testing
  name: data.artist_full_name,
  country: data.from_country,
  price: data.price,
});

const mapStateToProps = state => {
  const { account = {} } = state.user;
  const { orders = [] } = state.dashboard.sales.orders.data;

  return {
    username: account.username,
    orders: orders.length ? orders.map(convertData) : orders, // change with real data
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistArtworks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectorOrders);
