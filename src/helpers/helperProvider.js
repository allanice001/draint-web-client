import AnalyticHelper from './analytic/AnalyticHelper';
import React from 'react';

const HelperProvider = function(properties) {
  const HelperContext = React.createContext({
    analyticHelper: AnalyticHelper.create(),
  });
  return (
    <HelperContext.Provider
      value={{ analyticHelper: AnalyticHelper.create() }}
      {...properties}
    />
  );
};

export default HelperProvider;
