import React, { useCallback, useEffect, useState } from 'react';

import { Chart } from 'react-google-charts';
import { Skeleton } from '@material-ui/lab';
import { getCountryList } from 'redux/master/selectors';
import { getCountryNameByCode } from 'services/global';
import styles from './client-map.module.scss';
import { useSelector } from 'react-redux';
const Settings = require('settings.json');

const { mapsAPIKey } = Settings[process.env.NODE_ENV];

const ClientMap = ({ filtersValues }) => {
  const artistsCountryList = useSelector(getCountryList);
  const [countries, setCountries] = useState([]);
  const [resize, setResize] = useState();
  const [timeoutId, setTimeoutId] = useState();

  useEffect(() => {
    if (filtersValues?.country) {
      let result = [];
      const countryData = getCountryNameByCode(filtersValues.country);
      const selectedCountry = artistsCountryList.find(
        item => item.country === countryData
      );

      if (selectedCountry) {
        result = [[countryData, selectedCountry.count]];
      } else {
        result = [];
      }

      setCountries(result);
    } else {
      setCountries([]);
    }
  }, [artistsCountryList, filtersValues]);

  const resizeHandler = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    } else {
      setResize(true);
    }

    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(undefined);
        setResize(false);
      }, 400)
    );
  }, [timeoutId]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [resizeHandler, timeoutId]);

  if (resize) {
    return <Skeleton variant="rect" width="100%" height="100%" />;
  }

  return (
    <Chart
      style={{ flex: 1 }}
      className={styles.map}
      chartType="GeoChart"
      loader={<Skeleton variant="rect" width="100%" height="100%" />}
      data={[['Country', 'artists']].concat(countries)}
      options={{
        colorAxis: { colors: ['#a090ff', '#806BFF'] },
        defaultColor: '#ccc4ff',
        datalessRegionColor: '#ccc4ff',
        displayMode: 'none',
        legend: 'none',

        tooltip: {
          isHtml: true,

          textStyle: {
            color: '#3F4041',
            fontName: 'Lato',
          },
        },
      }}
      mapsApiKey={mapsAPIKey}
    />
  );
};
export default ClientMap;
