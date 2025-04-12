import { FOOTER_NEWSLETTER_FORM } from 'constants/components/weekly-newsletter';
import { FooterClimate } from 'components/footer/footer-climate/footer-climate';
import { FooterList } from 'components/footer/footer-list/footer-list';
import { FooterTrade } from 'components/footer/footer-trade/footer-trade';
import { Logo } from 'components/logo/logo';
import { NewsletterSubscribeForm } from 'components/footer/newsletter-form/newsletter-form';
import React from 'react';
import styles from 'components/footer/footer-mobile.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function FooterMobile() {
  const isMobile = useMediaQuery('(min-width:550px)');
  const ICON_SIZE = isMobile ? 56 : 32;
  const path = window.location.pathname;
  const isHome = path === '/';

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.mail_section}>
            <Logo className={styles.logo} home={isHome} />
            <NewsletterSubscribeForm
              form={FOOTER_NEWSLETTER_FORM.name}
              mobile
            />
          </div>

          <div className={styles.nav_section}>
            <FooterList mobile />
          </div>

          <FooterClimate />
        </div>

        <FooterTrade iconSize={ICON_SIZE} className={{ styles }} />

        {/*<div className={styles.union_section}>*/}
        {/*  <div className="container">*/}
        {/*    /!*<div className={styles.rights_content}>*!/*/}
        {/*    /!*  <Icons.EuropeanUnion height={60}/>*!/*/}
        {/*    /!*  <Icons.Rheinland height={60}/>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className={styles.rights_section}>
          <div className="container">
            <span className={styles.copywriter}>
              &copy; Draint {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
