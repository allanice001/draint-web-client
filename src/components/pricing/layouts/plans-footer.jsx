import {
  PRICING_FOOTER_NINE_MONTH,
  PRICING_FOOTER_POLICY_LINK,
  PRICING_FOOTER_POLICY_TITLE,
  PRICING_FOOTER_THREE_MONTH,
} from 'constants/components/pricing';
import { Link } from 'react-router-dom';
import React from 'react';
import classnames from 'classnames/bind';
import styles from '../plans.module.scss';

export function PlansFooter() {
  const noteClassNames = classnames('font-caption-2', styles.notes);

  return (
    <>
      <div>
        <div className={noteClassNames}>{PRICING_FOOTER_THREE_MONTH}</div>
        <div className={noteClassNames}>{PRICING_FOOTER_NINE_MONTH}</div>
      </div>

      <div className={styles.footnote}>
        <Link alt={PRICING_FOOTER_POLICY_TITLE} to={PRICING_FOOTER_POLICY_LINK}>
          {PRICING_FOOTER_POLICY_TITLE}
        </Link>
      </div>
    </>
  );
}
