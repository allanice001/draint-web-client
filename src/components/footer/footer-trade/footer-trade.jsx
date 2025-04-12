import Icons from 'components/icons';
import React from 'react';

export function FooterTrade({ iconSize, className }) {
  const { styles } = className;

  return (
    <div className={styles.payment_section}>
      <div className="container">
        <div className={styles.payment_logo_icon}>
          <Icons.AmexIconBW param={iconSize} />
          <Icons.MasterCardIconBW param={iconSize} />
          <Icons.VisaCardIconBW param={iconSize} />
          <Icons.PayPalIconBW height={iconSize} />
          <Icons.ApplePayIconBW param={iconSize} />
          <Icons.GooglePayBW param={iconSize} />
          <Icons.SepaBw param={iconSize} />
          <Icons.SofortIconBW param={iconSize} />
        </div>
      </div>
    </div>
  );
}
