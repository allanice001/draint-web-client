import './spinner.scss';

import { CircularProgress } from '@material-ui/core';
import React from 'react';

export const Spinner = ({ full, className }) => (
  <div className={`spinner ${full && 'full'}`}>
    <CircularProgress className={className} color="primary" />
  </div>
);
