import { bool, func, string } from 'prop-types';

import { Button } from '@material-ui/core';
import DownloadIcon from 'components/icons/download';
import React from 'react';
import styles from './artist-card-download-button.module.scss';

const ArtistCardDownloadButton = props => {
  const { onClick, id, disabled } = props;

  return (
    <Button
      variant="contained"
      className={styles.root}
      onClick={() => onClick(id)}
      disabled={disabled}
    >
      <DownloadIcon />
    </Button>
  );
};

ArtistCardDownloadButton.propTypes = {
  id: string.isRequired,
  onClick: func.isRequired,
  disabled: bool.isRequired,
};

export default ArtistCardDownloadButton;
