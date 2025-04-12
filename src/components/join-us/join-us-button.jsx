import React from 'react';
import classNames from 'classnames';
import styles from './join-us.module.scss';
import { useJoinUsButton } from 'hooks/use-join-us-button';

function JoinUsButton({ name, url, link, logout = true, setIsOpened }) {
  const { handleLogoutRedirect, handleRedirect } = useJoinUsButton(url);
  const buttonStyle = classNames(`${styles.button}`, {
    [`${styles.button} ${link}`]: link,
    [`primary-button ${styles.button} ${link}`]: !link,
  });

  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={() => {
        setIsOpened && setIsOpened(false);
        logout ? handleLogoutRedirect() : handleRedirect();
      }}
    >
      {name}
    </button>
  );
}

export default JoinUsButton;
