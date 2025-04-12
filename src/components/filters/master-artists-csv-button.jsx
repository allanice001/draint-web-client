import { Button, Card } from '@material-ui/core';
import { bool, func } from 'prop-types';

import React from 'react';
import styles from './master-artists-csv-button.module.scss';

const MasterArtistsCsvButton = function({ loading, generateCSV }) {
  const buttonOptions = {
    color: 'primary',
    variant: 'contained',
  };

  return (
    <Card className={styles.wrapper}>
      <Button
        color={buttonOptions.color}
        disabled={loading}
        onClick={generateCSV}
        variant={buttonOptions.variant}
      >
        {loading ? 'Loading...' : 'Generate CSV'}
      </Button>
    </Card>
  );
};

MasterArtistsCsvButton.propTypes = {
  loading: bool,
  generateCSV: func.isRequired,
};

export default MasterArtistsCsvButton;
