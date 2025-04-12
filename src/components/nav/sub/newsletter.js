import {
  AUTOMATED,
  CREATE,
  NEWSLETTER_ROOT,
  STATS,
  SUBSCRIPTION,
  WEEKLY,
} from 'constants/routes/masterModule/newsletter';
import Card from '@material-ui/core/Card';

import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

const nav = [
  {
    to: `${MASTER_ROOT}${NEWSLETTER_ROOT}${SUBSCRIPTION}`,
    label: 'Subscription',
  },
  {
    to: `${MASTER_ROOT}${NEWSLETTER_ROOT}${CREATE}`,
    label: 'Custom Newsletter',
  },
  {
    to: `${MASTER_ROOT}${NEWSLETTER_ROOT}${AUTOMATED}`,
    label: 'Automatic Letters',
  },
  {
    to: `${MASTER_ROOT}${NEWSLETTER_ROOT}${WEEKLY}`,
    label: 'Weekly Newsletter',
  },
  {
    to: `${MASTER_ROOT}${NEWSLETTER_ROOT}${STATS}`,
    label: 'Stats',
  },
];

export function NewsletterNav() {
  return (
    <div className={styles.subnav_wrapper}>
      <Card className={styles.subnav}>
        {nav.map(({ to, label }) => (
          <NavLink exact to={to} activeClassName={styles.active} key={to}>
            {label}
          </NavLink>
        ))}
      </Card>
    </div>
  );
}
