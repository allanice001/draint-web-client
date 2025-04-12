import { Button, ButtonGroup } from '@material-ui/core';
import { PENDING, UNVERIFIED, VERIFIED } from 'constants/statuses';

import { bool, func, object, oneOfType, string } from 'prop-types';

import React from 'react';
import styles from './artwork-masters-card.module.scss';

function ArtworkVerificationButtons({
  id,
  onVerify,
  disabled,
  disableAll,
  isBlog,
  verification,
}) {
  return (
    <div className={styles.buttons}>
      <ButtonGroup>
        <Button
          variant="contained"
          classes={{
            label: styles.label,
          }}
          className={
            disabled || disableAll ? '' : `${styles.button} ${styles.verified}`
          }
          onClick={() => onVerify(id, VERIFIED)}
          disabled={disabled || disableAll || verification === VERIFIED}
        >
          {!isBlog ? 'Verify' : 'Approve'}
        </Button>
        <Button
          variant="contained"
          classes={{
            label: styles.label,
          }}
          className={
            disabled || disableAll
              ? ''
              : `${styles.button} ${styles.unverified}`
          }
          onClick={() => onVerify(id, UNVERIFIED)}
          disabled={disabled || disableAll || verification === UNVERIFIED}
        >
          {!isBlog ? 'Unverify' : 'Disapprove'}
        </Button>
        {!isBlog && (
          <Button
            variant="contained"
            classes={{
              label: styles.label,
            }}
            className={
              disabled || disableAll ? '' : `${styles.button} ${styles.pending}`
            }
            onClick={() => onVerify(id, PENDING)}
            disabled={disabled || disableAll || verification === PENDING}
          >
            Pending
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

ArtworkVerificationButtons.propTypes = {
  id: oneOfType([string, object]),
  onVerify: func.isRequired,
  disabled: bool.isRequired,
};

export default ArtworkVerificationButtons;
