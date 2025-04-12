import { FOOTER_NEWSLETTER_FORM } from 'constants/components/weekly-newsletter';
import { FooterClimate } from 'components/footer/footer-climate/footer-climate';
import { FooterList } from 'components/footer/footer-list/footer-list';
import { FooterTrade } from 'components/footer/footer-trade/footer-trade';
import Icons from 'components/icons';
import { Logo } from 'components/logo/logo';
import { NewsletterSubscribeForm } from 'components/footer/newsletter-form/newsletter-form';
import React from 'react';
import styles from 'components/footer/footer.module.scss';

export function FooterDesktop() {
  const ICON_SIZE = 56;
  const path = window.location.pathname;
  const isHome = path === '/';

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footer_wrapper}>
            <div className={styles.logo_section}>
              <Logo className={styles.logo} home={isHome} />
              <NewsletterSubscribeForm form={FOOTER_NEWSLETTER_FORM.name} />
              <FooterClimate />
            </div>
            <div className={styles.nav_list}>
              <FooterList />
            </div>
          </div>
        </div>
      </footer>

      <FooterTrade iconSize={ICON_SIZE} className={{ styles }} />

      <div className={styles.draint_rights}>
        <div className="container">
          <div className={styles.rights_content}>
            <div className={styles.copywriter_wrapper}>
              <Icons.EuropeanUnion height={70} />
              <Icons.Rheinland height={70} />
            </div>
            <span className={styles.copywriter}>
              &copy; Draint {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
