import React from 'react'
import styles from './track-package-info.module.scss';

function Activity({ activity, address, getDate, getTime, convertCountry }) {

  return (
    <div className={styles.info_wrapper}>
      <div className={styles.title}>Activity info</div>
      <div className={styles.rows_wrapper}>
        <div className={styles.rows}>
          <div className={styles.sub_title}>Address</div>
          <span>City: { address.city }</span>
          <span>Country: { convertCountry(address.countryCode) }</span>
          <span>ZIP: { address.postalCode }</span>
        </div>
        <div className={styles.rows}>
          <div className={styles.sub_title}>Activity</div>
          <span>Description: { activity.description }</span>
          <span>Date: { getDate(activity.date) }</span>
          <span>Time: { getTime(activity.date, activity.time) }</span>
        </div>
      </div>
    </div>
  )
}

export default Activity
