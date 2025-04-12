import { Line } from 'react-chartjs-2';
import React from 'react';

export function LineChart(props) {
  const { options } = props;
  // options.maintainAspectRatio = false;
  options.responsive = true;

  return <Line data={props.data} height={props.height} options={options} />;
}
