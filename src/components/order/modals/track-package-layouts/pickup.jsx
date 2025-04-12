import React from 'react'
import styles from './track-package-info.module.scss';

function Pickup({ pickup, getDate, getTime }) {
  return (
    <div className={styles.info_wrapper}>
      <div className={styles.title}>Pickup info</div>
      <div className={styles.rows}>
        <div className={styles.sub_title}>Pickup</div>
        <span>Description: { pickup.description }</span>
        <span>Date: { getDate(pickup.date) }</span>
        <span>Time: { getTime(pickup.date, pickup.time) }</span>
      </div>
    </div>
  )
}

export default Pickup
