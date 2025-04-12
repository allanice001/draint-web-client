import BasicModal from 'components/basic-modal/basic-modal';
import { Card } from '@material-ui/core';
import EmailTemplate from '../../../../views/master/newsletter-email-template';
import React from 'react';

function PreviewTemplateModal(props) {
  const { handleCloseModal, openModal, template } = props;

  return (
    <BasicModal
      handleClose={handleCloseModal}
      isOpen={openModal}
      footer={<></>}
    >
      <Card>
        <EmailTemplate html={template} />
      </Card>
    </BasicModal>
  );
}

export default PreviewTemplateModal;
