export const subsOptionsCheck = (options2, type) =>
  options2 && type && type === 'payment_system';

export default function getStatisticParameters(chart, statistics, changedData) {
  const { filter, date, options, options2 } = statistics[chart];
  const parameters = {
    ...filter,
    ...date,
    options,
    options2,
    ...changedData,
  };
  parameters.options = subsOptionsCheck(parameters.options2, parameters.type)
    ? parameters.options2
    : parameters.options;
  delete parameters.options2;
  return parameters;
}
