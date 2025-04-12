import Icons from '../../../icons';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './control-buttons.module.scss';

const ControlButtons = function({
  loading = false,
  handleCrop,
  cropFlag,
  handleRotate,
  historyRollback,
  disableHistoryRollbackButton,
  className,
}) {
  return (
    <div className={classnames(styles.tools, className)}>
      {handleCrop && (
        <>
          {!cropFlag ? (
            <button
              className={styles.tool}
              disabled={loading}
              onClick={handleCrop}
              type="button"
            >
              <Icons.Crop />
            </button>
          ) : (
            <button
              className={styles.tool}
              disabled={loading}
              onClick={handleCrop}
              type="button"
            >
              <Icons.Cancel />
            </button>
          )}
        </>
      )}
      <button
        className={styles.tool}
        disabled={loading}
        onClick={() => handleRotate(-90)}
        type="button"
      >
        <Icons.RotateLeft />
      </button>
      <button
        className={styles.tool}
        disabled={loading}
        onClick={() => handleRotate(90)}
        type="button"
      >
        <Icons.RotateRight />
      </button>
      {historyRollback && (
        <button
          className={styles.tool}
          disabled={
            disableHistoryRollbackButton && disableHistoryRollbackButton()
          }
          onClick={() => historyRollback()}
          type="button"
        >
          <Icons.HistoryCircleIcon />
        </button>
      )}
    </div>
  );
};

ControlButtons.defaultProps = {
  className: '',
};

ControlButtons.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  handleCrop: PropTypes.func,
  cropFlag: PropTypes.bool,
  handleRotate: PropTypes.func,
  historyRollback: PropTypes.func,
  disableHistoryRollbackButton: PropTypes.func,
};

export default ControlButtons;
