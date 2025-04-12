import {
  artistDashboardLinks,
  collectorDashboardLinks,
} from 'constants/components/navbar/links';
import { bool, func } from 'prop-types';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import styles from '../main-navbar.module.scss';

function MenuListComposition({ isArtist, logout }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const links = isArtist ? artistDashboardLinks : collectorDashboardLinks;

  return (
    <div>
      <div>
        <button
          type="button"
          className={`primary-button ${styles.button}`}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Your Profile
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    width="100%"
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {links.map(({ to, label }) => (
                      <MenuItem>
                        <Link to={to} className={styles.menu_item}>
                          {label}
                        </Link>
                      </MenuItem>
                    ))}
                    <br />
                    <MenuItem>
                      <div onClick={logout} className={styles.menu_item}>
                        Logout
                      </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

MenuListComposition.propTypes = {
  isArtist: bool.isRequired,
  logout: func.isRequired,
};

export default MenuListComposition;
