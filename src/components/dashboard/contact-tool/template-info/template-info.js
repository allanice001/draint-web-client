import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  handlePreviewModal,
  setAttachments,
  showMessageOptionsActions,
} from 'redux/dashboard/actions/contactToolActions';

import CommonCard from '../template-info-cards/common-card';
import PreviewTemplateModal from '../add-contact-modal/preview_template_modal';
import { bindActionCreators } from 'redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import styles from './template-info.module.scss';

const TemplateInfo = ({
  template,
  actions,
  id,
  handleCancel,
  handleAttachmentChange,
  disabled,
  handleSend,
  handleGetTemplate,
  closePreviewModal,
  previewTemplate,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const attachments = useSelector(
    store => store.dashboard.contactTool.attachments
  );

  const ItemsSection = ({ items, handleClick, selectedId, type }) => (
    <div className={styles.artwork_wrapper}>
      {items.map((val, index) => (
        <CommonCard
          {...val}
          key={index}
          handleClick={() => handleClick(type, val.id)}
          selectedId={selectedId}
          type={type}
        />
      ))}
    </div>
  );

  const getTemplateAttachments = useCallback(() => {
    if (Object.values(template).length > 0) {
      const { attachment } = template?.settings;
      if (attachment) {
        template.getAttachments(id).then(res => {
          actions.showMessageOptionsActions(res, template);
          actions.setAttachments(res);
        });
      }
    }
  }, [template, id, actions]);

  useEffect(() => {
    actions.setAttachments([]);
    getTemplateAttachments();
  }, [actions, getTemplateAttachments, template]);

  const handleClick = (type, id) => {
    if (template.isMultiple) {
      if (!selectedIds.includes(id)) {
        setSelectedIds([...selectedIds, id]);
      } else {
        const ids = selectedIds.filter(val => val !== id);
        setSelectedIds([...ids]);
      }
    } else {
      setSelectedIds([id]);
    }
    handleAttachmentChange(type, id);
  };

  return (
    <div className={styles.template_info}>
      <div className={styles.template_info_content}>
        {attachments.map((atta, index) => (
          <ItemsSection
            key={`attachments-${index}`}
            items={atta?.value}
            selectedId={selectedIds}
            handleClick={handleClick}
            type={atta?.type}
          />
        ))}
      </div>
      <div className={styles.button_wrapper}>
        <button
          type="button"
          className="secondary-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          type="button"
          className="primary-button"
          disabled={disabled || selectedIds.length === 0}
        >
          Send
        </button>
        <button
          onClick={() => {
            actions.handlePreviewModal(true);
            handleGetTemplate();
          }}
          type="button"
          className="primary-button"
          disabled={disabled || selectedIds.length === 0}
        >
          Preview
        </button>
      </div>
      <PreviewTemplateModal
        handleCloseModal={() => actions.handlePreviewModal(false)}
        openModal={closePreviewModal}
        template={previewTemplate}
      />
    </div>
  );
};
const mapDispatchProps = dispatch => ({
  dispatch,

  actions: bindActionCreators(
    {
      handlePreviewModal,
      displayMessage,
      showMessageOptionsActions,
      setAttachments,
    },
    dispatch
  ),
});

const mapStateToProps = state => ({
  id: state.user.account.profile_id,
  closePreviewModal: state.dashboard.contactTool.closePreviewModal,
  previewTemplate: state.dashboard.contactTool.previewTemplate,
});

export default connect(mapStateToProps, mapDispatchProps)(TemplateInfo);
