import './profileLink.scss';

import { ClickAwayListener, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Link } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';

const Settings = require('settings.json');

function ProfileLink(props) {
  const [open, setOpen] = useState(false);
  const { front_server } = Settings[process.env.NODE_ENV];
  const { username } = props.user;

  const onClick = () => {
    if (!open && username) {
      const urlString = `${front_server}${getArtistGalleryURL(username)}`;
      navigator.clipboard.writeText(urlString);
      setOpen(true);
    } else if (!username) {
      displayMessage('No username specified');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleClose}
          open={open}
          disableFocusListener
          disableHoverListener
          placement={props.isInline ? 'top' : 'left'}
          title="Your profile link has been copied to the clipboard!"
        >
          {props.isInline ? (
            <button
              type="button"
              className="secondary-button"
              onClick={onClick}
            >
              Copy Draint account URL
            </button>
          ) : (
            <div className="widget profile-link" onClick={onClick}>
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Link />
                </IconButton>
              </label>
            </div>
          )}
        </Tooltip>
      </ClickAwayListener>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      displayMessage,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLink);
