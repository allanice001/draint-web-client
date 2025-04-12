import * as Button from 'components/shared/button';

import BasicModal from '../basic-modal/basic-modal';
import React from 'react';
import styles from './alertDialog.module.scss';

export default class AlertDialogDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      openDialog,
      handleDialog,
      dialogSettings,
      deleteBackground,
    } = this.props;
    return (
      <div className="alert-delete-dialog-wrapper">
        <BasicModal
          customWidth={styles.customWidth}
          title={dialogSettings.headerDialog}
          isOpen={openDialog}
          handleClose={handleDialog}
          hasCloseIcon={false}
          footerClassName={styles.footer}
          footer={
            <>
              <Button.Primary
                className={styles.action}
                onClick={deleteBackground}
              >
                {dialogSettings.buttonConfirmValue}
              </Button.Primary>
              <Button.Secondary
                className={styles.action}
                onClick={handleDialog}
              >
                {dialogSettings.buttonRejectValue}
              </Button.Secondary>
            </>
          }
        >
          <h3>{dialogSettings.titleDialog}</h3>
        </BasicModal>
      </div>
    );
  }
}
