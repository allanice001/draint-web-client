import { ALIASES, NAME } from 'constants/components/newsletter-mail-form';
import React from 'react';
import style from 'views/master/newsletter-email-form.module.scss';

export function LetterHints({ selectedType }) {
  switch (selectedType) {
    case NAME.SHIPP_COURIER_ARRIVAL_BUYER:
    case NAME.SHIPP_COURIER_ARRIVAL_SELLER_ARTIST:
    case NAME.SHIPP_COURIER_ARRIVAL_SELLER_COLLECTOR:
      return (
        <div className={style.hint_font}>
          (use <b>{ALIASES.recipientName}</b> to mention username or{' '}
          <b>{ALIASES.shippCourierDate}</b> to mention courier arrival date in
          message body)
        </div>
      );
    case NAME.ARTWORK_PRICE_CHANGED:
      return null;

    case NAME.NEWSLETTER_FORMULAR:
      return null;

    case NAME.NEWSLETTER_SIGN_IN_AS_COLLECTOR:
      return null;

    case NAME.NEWSLETTER_SIGN_UP_AS_COLLECTOR:
      return null;

    default:
      return (
        <div className={style.hint_font}>
          (use <b>{ALIASES.recipientName}</b> to mention username or{' '}
          <b>{ALIASES.recipientPlan}</b> to mention plan in message body)
        </div>
      );
  }
}
