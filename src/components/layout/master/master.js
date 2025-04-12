import { Button, HoverNav, Spinner } from 'components/lib';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppNav } from 'components/nav/app/app';
import { Logo } from 'components/logo/logo.jsx';
import { Menu } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import getInitialCheckout from 'redux/checkout/thunks/getInitialCheckout';
import masterTheme from 'config/mui-theme-master';
import { masterUrls } from 'constants/master/master-urls';
import { permissions } from 'constants/permissions';
import styles from './styles.module.scss';

export const MasterLayout = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { account: user } = useSelector(state => state.user);

  const showMenu = () => {
    setOpen(!open);
  };

  const logout = () => {
    dispatch(deleteUserData());
    dispatch(getInitialCheckout());
  };

  const urlsList = useMemo(() => {
    const userUrls = user.urls;
    return masterUrls.map(item => {
      const isAccess =
        userUrls && userUrls.find(selectedUrl => selectedUrl.url === item.link);
      const isMaster = user.permission === permissions.MASTER;
      return {
        ...item,
        permission: !!isAccess || isMaster,
      };
    });
  }, [user]);

  if (!user) {
    return <Spinner full />;
  }

  return (
    <ThemeProvider theme={masterTheme}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <Logo old />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.menuButton}>
              <button type="button" onClick={showMenu}>
                <Menu />
              </button>
            </div>
            <div>
              <div className={styles.menuWrapper}>
                <HoverNav label={user.username || user.email} align="right">
                  <Button text="Sign out" action={logout} />
                </HoverNav>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.contentWrapper}>
          <section className={styles.sideNav}>
            <AppNav type="fixed" open={open} items={urlsList} />
          </section>
          <section className={styles.content}>{children}</section>
        </div>
      </div>
    </ThemeProvider>
  );
};
