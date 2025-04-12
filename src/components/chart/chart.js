import CanvasJSReact from 'external-lib/canvasjs.react';
import { Card } from '@material-ui/core';
import React from 'react';
import defColors from './colors.json';

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const totalSum = [
  '394.00',
  '218.00',
  '346.00',
  '189.00',
  '302.00',
  '630.00',
  '375.00',
  '419.00',
  '360.00',
  '470.00',
  '241.00',
  '225.00',
];

export const ordersCount = [
  '320.00',
  '425.00',
  '786.00',
  '210.00',
  '375.00',
  '620.00',
  '419.00',
  '255.00',
  '360.00',
  '318.00',
  '470.00',
  '211.00',
];

const CanvasJSLineChart = ({
  className,
  data_arrays,
  title,
  colors,
  interval,
  by_month,
  labels,
}) => {
  const def_colors = { ...defColors, ...colors };

  const getInterval = array => {
    const array_check = array
      .map(el => el.dataPoints)
      .flat()
      .map(el => el.y);
    const max = Math.max.apply(null, array_check);
    const res = Math.round(max / 10);
    return res;
  };

  const getColor = color => def_colors[color] || def_colors.default;

  const getOptions = data_arrays => ({
    animationEnabled: true,
    theme: 'light2',
    backgroundColor: 'transparent',
    title: { text: title },
    toolTip: { shared: true },

    axisX: {
      title: '',
      includeZero: false,
      gridColor: 'transparent',
      lineColor: 'transparent',
      tickLength: 0,
      margin: 10,
    },

    axisY: {
      title: '',
      includeZero: 'false',
      tickLength: 0,
      interval: interval || getInterval(data_arrays),
      margin: 0,
    },

    legend: {
      verticalAlign: 'bottom',
      horizontalAlign: 'center',
    },

    data: data_arrays.map(({ dataPoints, name, color }) => ({
      showInLegend: 'true',
      name,
      indexLabel: '{y}',
      indexLabelFontColor: getColor(color).main,
      indexLabelFontWeight: 'bold',
      indexLabelFontFamily: 'Muli',
      indexLabelFontSize: 10,
      type: 'splineArea',
      yValueFormatString: '##0',
      markerColor: getColor(color).lighten,
      markerBorderColor: getColor(color).main,
      markerSize: '10',
      color: getColor(color).main,
      markerBorderThickness: 3,
      fillOpacity: 0.2,
      lineThickness: 3,

      dataPoints: by_month
        ? dataPoints.map(el => ({ ...el, label: monthNames[el.x] }))
        : labels
        ? dataPoints.map(el => ({ ...el, label: labels[el.x] }))
        : dataPoints,
    })),
  });

  return (
    <Card className={className}>
      <CanvasJSReact.CanvasJSChart options={getOptions(data_arrays)} />
    </Card>
  );
};

const getNumbersOfMonth = () => {
  const date = new Date();
  const month = date.getMonth();

  const numbersOfMonth = [];

  for (let i = 0; i <= 5; i++) {
    const number = month - i;
    date.setMonth(number);
    numbersOfMonth.push({ month: date.getMonth() });
  }

  return numbersOfMonth.reverse();
};

const getMonths = numbersOfMonth => {
  return monthNames.find((item, index) => index === numbersOfMonth.month);
};

const getTotalSum = numbersOfMonth => {
  return totalSum.find((item, index) => index === numbersOfMonth.month);
};

const getOrdersCount = numbersOfMonth => {
  return ordersCount.find((item, index) => index === numbersOfMonth.month);
};

const getMothNum = numbersOfMonth => numbersOfMonth.month + 1;

export const getGraphsMockData = () => {
  const graphsData = [];
  const numbersOfMonth = getNumbersOfMonth();

  for (let i = 0; i <= numbersOfMonth.length; i++) {
    if (numbersOfMonth[i]) {
      graphsData.push({
        total_sum: getTotalSum(numbersOfMonth[i]),
        month: getMonths(numbersOfMonth[i]),
        orders_count: getOrdersCount(numbersOfMonth[i]),
        monthNum: getMothNum(numbersOfMonth[i]),
      });
    }
  }

  return graphsData;
};

export default CanvasJSLineChart;
