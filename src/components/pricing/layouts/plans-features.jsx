import React, { useMemo, useState } from 'react';
import Icons from 'components/icons';
import classnames from 'classnames/bind';
import { cssClassWithModifier } from 'helpers/utils';
import styles from '../plans.module.scss';
import { usePricing } from 'hooks/use-pricing';

function PlanFeatureRow({ handleOpenInfoModal, name, i, list, activePlanId }) {
  const infoButtonClasses = classnames(styles['button-info'], 'ui-button');

  return (
    <div className={styles.row}>
      <div className={styles.name}>
        <button
          className={infoButtonClasses}
          type="button"
          onClick={handleOpenInfoModal}
        >
          <Icons.InfoCircle />
        </button>

        <span className="font-content">{name}</span>
      </div>

      {list.map((item, index) => {
        const iconClasses = classnames({
          [styles.disabled]: !item.features[i],
        });
        const cellClassNames = classnames(styles.cell, {
          [cssClassWithModifier(styles, 'cell', 'active')]:
            list[index].id === activePlanId,
        });

        return (
          <div className={cellClassNames} key={index}>
            <Icons.Check
              className={iconClasses}
              fill="currentColor"
              width="21"
            />
          </div>
        );
      })}
    </div>
  );
}

function ActivePlanHighlight({ element }) {
  const [offset, setOffset] = useState(0);

  useMemo(() => {
    const updateOffset = () => {
      if (element) {
        setOffset(element.offsetLeft);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, [element]);

  return (
    <div
      className={styles.active}
      style={{
        transform: element ? `translateX(${offset}px)` : 'translateX(0px)',
      }}
    />
  );
}

export function PlansFeatures({ planRef }) {
  const { user, plansList, features } = usePricing();
  const { planId: activePlanId } = user;

  const { handleOpenInfoModal } = usePricing();

  return (
    <div className={styles.body}>
      {features.map((name, i) => (
        <PlanFeatureRow
          key={i}
          activePlanId={activePlanId}
          name={name}
          i={i}
          list={plansList}
          handleOpenInfoModal={() => handleOpenInfoModal(name)}
        />
      ))}

      {planRef && <ActivePlanHighlight element={planRef.current} />}
    </div>
  );
}
