import React, { useEffect, useState } from 'react';
import { b64toBlob, splitBase64File } from 'services/images/imageService';
import { bool, func } from 'prop-types';
import {
  getUserSignature,
  updateUserSignature,
} from 'redux/dashboard/actions/settingsActions';
import { useDispatch, useSelector } from 'react-redux';

import CheckBox from 'components/reduxForm/checkbox/checkbox';
import DefaultModal from 'components/basic-modal/basic-modal';
import Icons from 'components/icons';
import SignatureCanvas from 'react-signature-canvas';
import classNames from 'classnames';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import styles from './order-modal-signature.module.scss';

function OrderModalSignature({ isOpen, setOpen }) {
  const dispatch = useDispatch();
  const [isAgree, setAgree] = useState(false);
  const resetButtonClass = classNames('secondary-button', styles.button);
  const confirmButtonClass = classNames('primary-button', styles.button);
  const { id } = useSelector(store => store.user.account);
  let sigPad = {};

  function onConfirm() {
    if (sigPad.isEmpty())
      return dispatch(displayMessage('Add your signature first', 'warning'));

    const imageUrl = sigPad.getTrimmedCanvas().toDataURL('image/png');
    const { realData, contentType } = splitBase64File(imageUrl);
    const blob = b64toBlob(realData, contentType);
    const file = new File([blob], 'signature', {
      type: contentType,
      lastModified: Date.now(),
    });

    dispatch(
      updateUserSignature(
        {
          accountId: id,
        },
        file
      )
    );

    setOpen();
  }

  function onReset() {
    sigPad.clear();
  }

  useEffect(() => {
    if (id) {
      dispatch(getUserSignature({ accountId: id, check: true }));
    }
  }, [dispatch, id]);

  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Enter signature'}
      handleClose={setOpen}
      footerClassName={styles.footer}
      footer={
        <div className="d-flex j-between">
          <button type="button" className={resetButtonClass} onClick={onReset}>
            <Icons.Reset className={styles.icon} />
            Reset
          </button>
          <button
            type="button"
            className={confirmButtonClass}
            onClick={onConfirm}
            disabled={!isAgree}
          >
            Confirm
          </button>
        </div>
      }
    >
      <div className="d-flex d-col">
        <b>
          Use mouse or pen on your device to sign certificate in field bellow:
        </b>
        <SignatureCanvas
          ref={ref => {
            sigPad = ref;
          }}
          canvasProps={{ className: styles.sigPad }}
        />
        <CheckBox
          value={isAgree}
          onChange={() => setAgree(!isAgree)}
          label="I agree to keep my signature on Draint"
        />
      </div>
    </DefaultModal>
  );
}

OrderModalSignature.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
};

export default OrderModalSignature;
