export const getPurchaseHistoryOptions = dataPoints => ({
  animationEnabled: true,
  theme: 'light2',
  backgroundColor: 'transparent',

  title: {
    text: '',
  },

  axisX: {
    title: '',
    includeZero: false,
    gridColor: 'transparent',
    lineColor: 'transparent',
    tickLength: 0,
    labelFontColor: 'transparent',
    margin: -20,
  },

  axisY: {
    title: '',
    includeZero: false,
    gridColor: 'transparent',
    lineColor: 'transparent',
    tickLength: 0,
    interval: 1000,
    labelFontColor: 'transparent',
    viewportMinimum: -100,
    margin: 0,
  },

  height: 120,
  width: 200,
  dataPointMaxWidth: 50,

  data: [
    {
      indexLabel: '{y}',
      indexLabelFontColor: '#806BFF',
      indexLabelFontWeight: 'bold',
      indexLabelFontFamily: 'Muli',
      indexLabelFontSize: 10,
      type: 'area',
      yValueFormatString: '€ ##0',
      markerColor: '#e8e4ff',
      markerBorderColor: '#806BFF',
      markerSize: '10',
      color: '#806BFF',
      markerBorderThickness: 3,
      fillOpacity: 0.2,
      lineThickness: 3,
      dataPoints,
    },
  ],
});
