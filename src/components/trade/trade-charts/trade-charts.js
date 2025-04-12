import React, { useEffect, useState } from 'react';

import { BarChart } from 'components/chart/bar';
import classnames from 'classnames';
import { getGraphsMockData } from 'components/chart/chart';
import styles from './trade-charts.module.scss';

function TradeCharts() {
  const [active, setActive] = useState(0);
  const [sellingHistory, setSellingHistory] = useState([]);
  const [offerHistory, setOfferHistory] = useState([]);
  const [maxSum, setMaxSum] = useState(2000);
  const [maxCount, setMaxCount] = useState(2000);

  useEffect(() => {
    let init = active;

    const intervalId = setInterval(() => {
      init = init === 1 ? 0 : 1;

      setActive(init);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [active]);

  useEffect(() => {
    const mockData = getGraphsMockData();

    const sellingHistory = mockData
      .map(el => ({
        month: el.month,
        total: el.total_sum ? parseFloat(el.total_sum) : 0,
      }))
      .reverse();
    const offerHistory = mockData.map(el => ({
      month: el.month,
      count: el.orders_count,
    }));

    const maxSum = Math.max(...sellingHistory.map(el => el.total));
    const maxCount = Math.max(...offerHistory.map(el => el.count));

    const getMaxValue = num => {
      const arr = num.toString().split('');
      const start = +arr[0] + 1;

      return parseInt(
        [start].concat(Array(arr.length - 1).fill(0)).join(''),
        10
      );
    };

    setMaxSum(getMaxValue(maxSum));
    setMaxCount(getMaxValue(maxCount));
    setSellingHistory(sellingHistory);
    setOfferHistory(offerHistory);
  }, []);

  const getDotClasses = active =>
    classnames(styles.dot, { [styles.active]: active });

  const getChartClasses = active =>
    classnames(styles.chart, { [styles.active]: active });

  const getData = data => ({
    labels: data.map(el => el.month),
    datasets: [
      {
        backgroundColor: '#806BFF',
        barPercentage: 0.5,
        data: data.map(el => el.total || el.count),
      },
    ],
  });

  const getOptions = maxNum => ({
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            min: 0,
            max: maxNum,
            stepSize: Math.ceil(maxNum / 10),
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            drawBorder: true,
            drawOnChartArea: false,
          },
        },
      ],
    },
  });

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h3 className="group-title">Draint Art-Market Statistics</h3>

        <div className={styles.content}>
          <div className={getChartClasses(active === 0)}>
            <h4 className={styles.title}>Overall market value by month</h4>
            <BarChart
              style={{ width: '100%' }}
              type="horizontal"
              options={getOptions(maxSum)}
              data={getData(sellingHistory)}
            />
          </div>

          <div className={getChartClasses(active === 1)}>
            <h4 className={styles.title}>Artworks re-offered by month</h4>
            <BarChart
              style={{ width: '100%' }}
              type="vertical"
              options={getOptions(maxCount)}
              data={getData(offerHistory)}
            />
          </div>
        </div>
      </div>
      <div className={styles.dots}>
        {[0, 1].map(el => (
          <button
            className={getDotClasses(el === active)}
            type="button"
            key={el}
            onClick={() => setActive(el)}
          >
            &nbsp;
          </button>
        ))}
      </div>
    </section>
  );
}

export default TradeCharts;
