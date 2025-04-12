import { Bar, HorizontalBar } from 'react-chartjs-2';

import React from 'react';

export function BarChart(props) {
  const { options, type } = props;
  // options.maintainAspectRatio = false;
  options.responsive = true;

  if (type === 'horizontal') {
    return <HorizontalBar data={props.data} options={options} />;
  }

  return <Bar data={props.data} options={options} />;
}
