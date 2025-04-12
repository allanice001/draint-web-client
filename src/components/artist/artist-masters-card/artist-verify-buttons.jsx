import { Button, ButtonGroup } from '@material-ui/core';
import { bool, func, string } from 'prop-types';

import React from 'react';
import SettingsIcon from 'components/icons/settings';
import cx from 'classnames';
import styles from './artist-verify-buttons.module.scss';

function ArtistVerificationButtons({
  onVerify,
  onSettings,
  id,
  disabled,
  disabledAll,
  verification,
}) {
  const actions = [
    {
      type: 'verified',
      label: 'Verify',
      disabled: disabled || disabledAll,
    },
    {
      type: 'unverified',
      label: 'Unverify',
      disabled: disabledAll,
    },
    {
      type: 'pending',
      label: 'Pending',
      disabled: disabledAll,
    },
  ];

  return (
    <div className={styles.root}>
      <ButtonGroup>
        {actions.map(({ type, label, disabled }) => {
          return (
            <Button
              key={type}
              classes={{ label: styles.label }}
              variant="contained"
              className={!disabled ? cx(styles.button, styles[type]) : ''}
              onClick={() => onVerify(id, type)}
              disabled={disabled || verification === type}
            >
              {label}
            </Button>
          );
        })}
        {onSettings && (
          <Button
            variant="contained"
            classes={{ label: styles.label }}
            className={styles.settings}
            onClick={() => onSettings(id)}
            disabled={disabledAll}
          >
            <SettingsIcon width={20} height={20} />
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

ArtistVerificationButtons.propTypes = {
  id: string.isRequired,
  onVerify: func.isRequired,
  onSettings: func.isRequired,
  disabled: bool.isRequired,
};

export default ArtistVerificationButtons;
