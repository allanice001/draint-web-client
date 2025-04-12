import React, { useEffect, useState } from 'react';

import Activity from './activity';
import Pickup from './pickup';
import { connect } from 'react-redux';
import { isoCountries as countries } from 'components/countries/list';
import moment from 'moment';
import styles from './track-package-info.module.scss';

function TrackerInfo({ trackPackage }) {
  const [activityInfo, setActivityInfo] = useState(undefined);
  const [pickupInfo, setPickupInfo] = useState(undefined);

  useEffect(() => {
    if (Object.keys(trackPackage).length) {
      if (trackPackage.statusResponse) {
        setActivityInfo(trackPackage.statusResponse.activityInfo);
        setPickupInfo(trackPackage.statusResponse.setPickupInfo);
      }
    }
  }, [trackPackage]);

  function convertCountry(code) {
    if (code) {
      const [country] = countries.filter(iso => iso.ccode === code);
      return country.cname;
    }
    return null;
  }

  function getDate(date) {
    return moment(date).format('MMM Do YYYY');
  }

  function getTime(date, time) {
    return moment(`${date} ${time}`).format('h:mm a');
  }

  return (
    <div className={styles.package_wrapper}>
      {activityInfo && (
        <>
          {activityInfo.map((activity, key) => {
            const { address } = activity;
            return (
              <Activity
                key={key}
                activity={activity}
                address={address}
                pickupInfo={pickupInfo}
                getDate={getDate}
                getTime={getTime}
                convertCountry={convertCountry}
              />
            );
          })}
        </>
      )}

      {pickupInfo && (
        <>
          {pickupInfo.map((pickup, key) => {
            return (
              <Pickup
                key={key}
                pickup={pickup}
                getDate={getDate}
                getTime={getTime}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    trackPackage: store.dashboard.orders.trackPackage,
  };
}

export default connect(mapStateToProps)(TrackerInfo);
