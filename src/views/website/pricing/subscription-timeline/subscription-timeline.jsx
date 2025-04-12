import React from 'react';
import TimelineArrowIcon from 'components/icons/timeline-arrow';
import cx from 'classnames';
import styles from './subscription-timeline.module.scss';
import { useTimeline } from 'hooks/use-timeline';

export const SubscriptionTimeline = () => {
  const { subscription, timeLineHistory, left } = useTimeline();

  return (
    <div
      className={cx(styles.root, {
        [styles.invisible]: !subscription || !timeLineHistory.length,
      })}
    >
      <div className={styles.wrapper}>
        <div className={styles.timeline} />
        <div className={styles.fill} style={{ width: `${left}%` }} />
        <TimelineArrowIcon className={styles.arrow} />

        {timeLineHistory.map((point, index) => (
          <div
            className={cx(styles.point, {
              [styles.active]: point.active,
              [styles.start]: index === 0,
            })}
            style={{ left: `${point.left}%` }}
            key={index}
          >
            <span className={styles.dot} />

            <div className={styles.content}>
              <p>
                <time>
                  <b>{point.date}</b>
                </time>
              </p>
              <p>{point.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
