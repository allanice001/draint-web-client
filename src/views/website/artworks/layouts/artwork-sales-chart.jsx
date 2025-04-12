import './artworkSalesHistory.scss';
import CanvasJSReact from 'external-lib/canvasjs.react';
import React from 'react';
import moment from 'moment';

const { CanvasJSChart } = CanvasJSReact;

function ArtworkSalesChart({ purchaseHistory, inWatchlist }) {
  const fontSize = inWatchlist ? 10 : 16;
  const height = inWatchlist ? 100 : 250;
  function getDataPoints() {
    return purchaseHistory.map((el, i) => ({
      x: i + 1,
      y: +el.price,

      label: inWatchlist
        ? moment(el.created_at).format('DD.MMM')
        : moment(el.created_at).format('MMMM YYYY'),
    }));
  }

  const options = {
    animationEnabled: true,
    theme: 'light2',
    backgroundColor: 'transparent',

    title: {
      text: '',
    },

    axisX: {
      lineColor: 'transparent',
      labelFontFamily: 'Muli',
      labelFontColor: '#C7C7C7',
      labelFontWeight: 'bold',
      labelFontSize: fontSize,
      tickLength: 15,
      tickColor: '#e7e7e7',
      margin: 10,
    },

    axisY: {
      title: '',
      includeZero: false,
      gridColor: 'transparent',
      lineColor: 'transparent',
      tickLength: 0,
      interval: 500,
      labelFontColor: 'transparent',
      margin: 0,
    },

    height: height,

    data: [
      {
        indexLabel: '{y}',
        indexLabelFontColor: '#806BFF',
        indexLabelFontWeight: 'bold',
        indexLabelFontFamily: 'Muli',
        indexLabelFontSize: fontSize,
        type: 'area',
        yValueFormatString: '€ ##0',
        markerColor: '#e8e4ff',
        markerBorderColor: '#806BFF',
        markerSize: '10',
        color: '#806BFF',
        markerBorderThickness: 3,
        fillOpacity: 0.2,
        lineThickness: 3,
        dataPoints: getDataPoints(),
      },
    ],
  };

  return (
    <>
      <CanvasJSChart options={options} />
    </>
  );
}

export default ArtworkSalesChart;
