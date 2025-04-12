import React, { useCallback } from 'react';
import { toggleContacts, toggleHistory } from 'redux/dashboard/actions/contactToolActions';

import { useDispatch, useSelector } from 'react-redux';
import AddContactModal from 'components/dashboard/contact-tool/add-contact-modal/add-contact-modal'
import ButtonSecondary from 'components/shared/button-secondary/button-secondary';
import Icons from 'components/icons';
import cx from 'classnames';
import styles from './list-footer.module.scss';
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ListFooter(props) {
  const {
    handleCloseModal,
    setOpenModal,
    handleAddContact,
    handleOpenModal,
  } = props;
  const isHistory = useSelector(store => store.dashboard.contactTool.isHistory);
  const isContacts = useSelector(store => store.dashboard.contactTool.isContacts);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:450px)');

  const onHistoryClick = useCallback(() => {
    dispatch(toggleHistory(true));
    if(isContacts) {
      dispatch(toggleContacts(false));
    }
  }, [dispatch, isContacts]);

  const onContactsClick = useCallback(() => {
    dispatch(toggleContacts(true));
    if(isHistory) {
      dispatch(toggleHistory(false));
    }
  }, [dispatch, isHistory]);

  return (
    <footer className={styles.root}>
      {isMobile ? (
        <ButtonSecondary
          icon={<Icons.Add width="20" height="20" />}
          onClick={handleOpenModal}
        />
      ):(
        <ButtonSecondary
          icon={<Icons.Add width="20" height="20" />}
          className={cx(styles.add_button)}
          onClick={handleOpenModal}
        >
            <span>Add Contact</span>
        </ButtonSecondary>
        )}

      <ButtonSecondary
        className={cx(styles.contacts_button, {
          [styles.active]: isContacts,
        })}
        onClick={onContactsClick}
      >
        Contacts
      </ButtonSecondary>

      <ButtonSecondary
        className={cx(styles.history_button, {
          [styles.active]: isHistory,
        })}
        onClick={onHistoryClick}
      >
        History
      </ButtonSecondary>

      <AddContactModal
        handleCloseModal={handleCloseModal}
        openModal={setOpenModal}
        onSubmit={handleAddContact}
      />
    </footer>
  );
}
