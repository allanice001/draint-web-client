import * as Button from 'components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from 'components/basic-modal/basic-modal';
import React from 'react';
import { SWITCH_ROLE_MODAL_BUTTON } from 'constants/components/modals';
import { changeRoleAction } from 'redux/artist/actions/artistProfileActions';
import styles from './switch-role-modal.module.scss';
import { useHistory } from 'react-router';

const SwitchRoleModal = ({ isOpen, setOpenModal, text }) => {
  const dispatch = useDispatch();
  const state = useSelector(store => store);
  const account = state.user.account;
  const history = useHistory();

  const handleClick = () => {
    dispatch(changeRoleAction(account, history));
    setOpenModal(!isOpen);
  };

  return (
    <BasicModal
      isOpen={isOpen}
      handleClose={() => setOpenModal(!isOpen)}
      maxWidth="sm"
      footerClassName={styles.footer_wrapper}
      footer={
        <Button.Primary
          className={styles.button}
          disabled={false}
          onClick={handleClick}
        >
          {SWITCH_ROLE_MODAL_BUTTON}
        </Button.Primary>
      }
    >
      <div className={styles.content_wrapper}>
        <span className={styles.content_text}>{text}</span>
      </div>
    </BasicModal>
  );
};

export default SwitchRoleModal;
