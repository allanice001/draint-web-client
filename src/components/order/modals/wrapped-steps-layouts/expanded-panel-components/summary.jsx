import { DECLINED, VERIFIED } from 'constants/global';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ArrowIcon } from 'components/order/modals/wrapped-steps-layouts/icons/arrow-icon';
import { WrappedMainButton as Button } from 'components/order/modals/wrapped-steps-layouts/buttonts/main-button';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Icons from 'components/icons';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from 'components/order/modals/wrapped-steps.module.scss';

function SummaryComponent({
  expanded,
  title,
  handleExpanded,
  stepNumber,
  status,
  photo,
  uploaded,
}) {
  const iconWrapper = classNames(`${styles.icon_container}`, {
    [`${styles.icon_container__open}`]: expanded,
    [`${styles.icon_container__done}`]: uploaded,
    [`${styles.icon_container__uprove}`]: uploaded && status === VERIFIED,
    [`${styles.icon_container__decline}`]: uploaded && status === DECLINED,
  });

  const numberStyle = classNames(`${styles.number}`, {
    [`${styles.number__open}`]: expanded,
  });

  function handleButtonName(expanded) {
    return expanded ? `Exit preview` : `Preview step`;
  }

  return (
    <AccordionSummary
      classes={{
        root: styles.expansion_panel,
      }}
    >
      <div className={styles.panel_wrapper}>
        <div className={styles.wrapper_icon}>
          {!Boolean(photo && uploaded) ? (
            <div className={iconWrapper}>
              <span className={numberStyle}>{stepNumber}</span>
            </div>
          ) : (
            <div className={iconWrapper}>
              {uploaded && status === DECLINED ? (
                <ClearRoundedIcon className={styles.cancel} />
              ) : (
                <Icons.WrapperStepChecked
                  size={20}
                  uploaded={uploaded}
                  status={status}
                />
              )}
            </div>
          )}
        </div>
        <span className={styles.text}>{title}</span>
        <Button
          buttonName={handleButtonName(expanded)}
          isExpanded
          onClick={handleExpanded}
        >
          <ArrowIcon isExpanded={expanded} />
        </Button>
      </div>
    </AccordionSummary>
  );
}

SummaryComponent.propTypes = {
  expanded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export { SummaryComponent };
