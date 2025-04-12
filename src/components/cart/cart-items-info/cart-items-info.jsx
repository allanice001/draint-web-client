import React from 'react';
import styles from './cart-items-info.module.scss';

function CartItemsInfo({ itemsInfo }) {
  return (
    <div className={styles.form_wrapper}>
      <div className={styles.profile_data}>
        <div className={styles.title}>Personal info</div>
        <div className={styles.info_wrapper}>
          <div className={styles.info_block}>
            <div className={styles.label}>First Name</div>
            <div className={styles.value}>{itemsInfo.firstName}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Last Name</div>
            <div className={styles.value}>{itemsInfo.lastName}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Email</div>
            <div className={styles.value}>{itemsInfo.email}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Phone</div>
            <div className={styles.value}>{itemsInfo.phone}</div>
          </div>
        </div>
      </div>
      <div className={styles.address_data}>
        <div className={styles.title}>Address details</div>
        <div className={styles.info_wrapper}>
          <div className={styles.info_block}>
            <div className={styles.label}>Country</div>
            <div className={styles.value}>{itemsInfo.country}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>State</div>
            <div className={styles.value}>{itemsInfo.state}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>City</div>
            <div className={styles.value}>{itemsInfo.city}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Postal code</div>
            <div className={styles.value}>{itemsInfo.zipcode}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Address line 1</div>
            <div className={styles.value}>{itemsInfo.addressLine1}</div>
          </div>
          <div className={styles.info_block}>
            <div className={styles.label}>Address line 2</div>
            <div className={styles.value}>{itemsInfo.addressLine2}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemsInfo;
