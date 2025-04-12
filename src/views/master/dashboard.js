import {
  CHART_NAMES,
  CHART_TITLES,
  FILTER_OPTIONS,
} from 'constants/components/master/statistics';
import React, { useEffect } from 'react';
import {
  getAllStatistics,
  getStatistics,
  setCheckbox,
  setDateFilter,
  setFilter,
} from 'redux/master/actions/statisticsActions';
import { useDispatch, useSelector } from 'react-redux';

import CanvasJSLineChart from 'components/chart/chart';
import { MasterCheckboxesFilter } from 'components/filters/masterCheckboxesFilter';
import { MasterFilter } from 'components/filters/masterFilter';
import { masterUrls } from 'constants/master/master-urls';
import { setCurrentUrls } from 'dataLayer/permissions/masterPermissions';
import styles from './dashboard.module.scss';
import { subsOptionsCheck } from 'services/get-statistic-parameters';

const MasterChart = ({
  chartName,
  title,
  data,
  filter,
  onChange,
  dateFilter,
  onDateChange,
  disabled,
  labels,
  options,
  options2,
  onOptionsChange,
}) => {
  const secondOpt = subsOptionsCheck(options2, filter.type);
  const showed = secondOpt ? options2 : options;
  const numb = secondOpt ? 2 : null;

  return (
    <div className={styles.chart__wrapper}>
      <CanvasJSLineChart
        className={styles.chart__block}
        labels={labels}
        title={title}
        data_arrays={data}
      />
      <MasterCheckboxesFilter
        disabled={disabled}
        options={showed}
        setOptions={(type, value) =>
          onOptionsChange(chartName, showed, { [type]: value }, numb)
        }
      />
      <MasterFilter
        artworkPriceFilter={filter.counter}
        dateFilter={dateFilter}
        disabled={disabled}
        filter={filter.period}
        onArtworkPriceChange={event =>
          onChange(chartName, filter, { counter: event.target.value })
        }
        onChange={event =>
          onChange(chartName, filter, { period: event.target.value })
        }
        onDateChange={(type, value) =>
          onDateChange(chartName, dateFilter, { [type]: value })
        }
        onSubscriptionTypeChange={event =>
          onChange(chartName, filter, { type: event.target.value })
        }
        options={FILTER_OPTIONS}
        subscriptionTypeFilter={filter.type}
      />
    </div>
  );
};

export const MasterDashboard = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(store => store.master.statistics);

  useEffect(() => {
    dispatch(getAllStatistics(CHART_NAMES));

    const urls = masterUrls.slice(0, masterUrls.length).map(item => item.link);
    setCurrentUrls(urls);
  }, [dispatch]);

  const handleSetFilter = (chart, filter, value) => {
    const changedData = { ...filter, ...value };

    dispatch(setFilter(chart, changedData));
    dispatch(getStatistics(chart));
  };

  const handleSetDateFilter = (chart, date, value) => {
    const changedData = { ...date, ...value };

    dispatch(setDateFilter(chart, changedData));
    dispatch(getStatistics(chart));
  };

  const handleSetCheckbox = (chart, options, value, numb) => {
    const changedData = { [`options${numb || ''}`]: { ...options, ...value } };

    dispatch(setCheckbox(chart, changedData));
    dispatch(getStatistics(chart));
  };

  return (
    <div className={styles.charts}>
      {CHART_NAMES.map((name, i) => (
        <MasterChart
          key={i}
          chartName={name}
          title={CHART_TITLES[i]}
          data={statistics[name].data}
          filter={statistics[name].filter}
          options={statistics[name].options}
          options2={statistics[name].options2}
          onChange={handleSetFilter}
          dateFilter={statistics[name].date}
          onDateChange={handleSetDateFilter}
          onOptionsChange={handleSetCheckbox}
          disabled={statistics.initialLoading || statistics[name].loading}
        />
      ))}
    </div>
  );
};
