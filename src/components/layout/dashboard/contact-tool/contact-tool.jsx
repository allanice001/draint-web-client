import React, { useEffect, useState } from 'react';
import { change, reduxForm } from 'redux-form';
import {
  checkedPermission,
  closeDeleteMode,
  closeEditMode,
  createContact,
  deleteContact,
  getContacts,
  getMessages,
  getTemplate,
  handleCloseModal,
  handleOpenModal,
  handleRecipients,
  handleResetRecipients,
  openDeleteMode,
  openEditMode,
  resetRecipients,
  sendMessage,
  setActiveMessage,
  setAttachments,
  setResetQuillMessage,
  unsetRecipients,
  updateContact,
} from 'redux/dashboard/actions/contactToolActions';
import { connect, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { ContactList } from 'components/dashboard/contact-tool/contact-list/contact-list';
import { CreateMessage } from 'components/dashboard/contact-tool/create-message/create-message';
import { HistoryList } from 'components/dashboard/contact-tool/history-list/history-list';
import MessagePreview from 'components/dashboard/contact-tool/message-preview/message-preview';
import { SUBSCRIPTIONS_DASHBOARD } from 'constants/routes/userModule/dashboard';
import { Sort } from 'config/sort';
import { Spinner } from 'components/lib';
import { Template } from 'models/template';
import TemplateDialog from './template-dialog/template-dialog';
import { WARNING_SUBSCRIPTION_ALL_IN_ONE } from 'constants/components/artworks.contants';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { reset } from 'redux-form';
import styles from './contact-tool.module.scss';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';

const Analytic = AnalyticHelper.create();
const EMPTY_MESSAGE = '<p><br></p>';

const ContactTool = ({
  profileId,
  actions,
  dispatch,
  contactTool,
  contactList,
  accountLoading,
}) => {
  const history = useHistory();
  const isHistory = useSelector(store => store.dashboard.contactTool.isHistory);

  useEffect(() => {
    if (profileId) {
      actions.getContacts();
      actions.checkedPermission();
    }
  }, [profileId, actions]);

  useEffect(() => {
    if (profileId) {
      actions.getMessages(profileId);
    }
  }, [isHistory, profileId, actions]);

  useEffect(() => {
    Analytic.createEvent('PageView');
  }, []);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(EMPTY_MESSAGE);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [template, setTemplate] = useState({});
  const [disableSendTemplate, setDisableSendTemplate] = useState(true);
  const [templateMode, setTemplateMode] = useState(false);

  const disableSend = !(
    subject !== '' &&
    message !== EMPTY_MESSAGE &&
    contactTool.recipients?.length
  );

  const handleSubject = event => {
    setSubject(event.target.value);
  };

  const handleMessage = message => {
    setMessage(message);
  };

  function resetMessageContent() {
    actions.setResetQuillMessage(true);
    actions.reset('contactList');
    actions.resetRecipients();
    setTemplateMode(false);
    setSubject('');
  }

  const handleGetTemplate = () => {
    const data = {
      subject,
      template: template.name,
      id: template.id,
      recipients: contactTool.recipients,
      attachments: template.selectedAttachments,
      contact_quantity: contactTool.recipients.length,
    };
    actions.getTemplate(data);
  };

  const handleSend = () => {
    if (contactTool.isCanUse) {
      let analytic_data = { template_name: template.name };
      let analyticEvent = 'TemplateMessageSent';
      const data = {
        subject,
        message,
        recipients: contactTool.recipients,
        profile_id: profileId,
      };
      data.template = {
        id: template.id,
        attachments: template.selectedAttachments,
      };

      Analytic.createEvent(analyticEvent, {
        contact_quantity: contactTool.recipients.length,
        ...analytic_data,
      });

      setTemplate({});

      return actions.sendMessage(data);
    } else {
      history.push(SUBSCRIPTIONS_DASHBOARD);
      actions.displayMessage(WARNING_SUBSCRIPTION_ALL_IN_ONE, 'warning');
    }
  };

  const handleAddContact = data => {
    Analytic.createEvent('ContactWasAddedToContactTool');
    const formData = {
      ...data,
      profile_id: profileId,
      sort: '',
    };
    actions.createContact(formData);
    actions.reset('addContact');
  };

  const handleUpdateContact = data => {
    Analytic.createEvent('ContactWasUpdatedToContactTool');
    const formData = {
      ...data,
      profile_id: profileId,
      sort: '',
    };
    actions.updateContact(formData);
  };

  const handleContactCheck = (...data) => {
    const checked = data[1];
    const contactId = data[3];
    actions.handleRecipients(checked, contactId);
  };

  const handleCloseRecipient = data => {
    actions.handleRecipients(false, data);
    dispatch(change('contactList', data, false));
  };

  const handleEditContact = id => {
    actions.openEditMode(id);
  };

  const handleDeleteContact = id => {
    actions.openDeleteMode(id);
  };

  const handleOpenTemplateModal = () => {
    return setOpenTemplate(true);
  };

  const handleClearTemplate = () => {
    setTemplate({});
    setTemplateMode(false);
    setSubject('');
    setDisableSendTemplate(true);
    actions.setAttachments([]);
  };

  const handleSetDisableTemplate = (type, id) => {
    const atta = { [type]: id };
    const isNotAttachmentSelected = !(
      template.settings.attachment.length === Object.values(atta)?.length
    );
    setDisableSendTemplate(isNotAttachmentSelected);
  };

  const handleAttachmentChange = (type, id) => {
    template.addSelectedAttachments(type, id);
    handleSetDisableTemplate(type, id);
  };

  const handleSetTemplate = choseTemplate => {
    setTemplateMode(true);
    setTemplate(new Template(choseTemplate));
    setSubject(choseTemplate.settings.title);
  };

  if (accountLoading) return <Spinner full />;

  return (
    <>
      <TemplateDialog
        open={openTemplate}
        handleClose={() => setOpenTemplate(false)}
        handleSetTemplate={handleSetTemplate}
      />
      <section className={cx(styles.root)}>
        {!isHistory && (
          <ContactList
            handleOpenModal={actions.handleOpenModal}
            handleCloseModal={actions.handleCloseModal}
            handleCloseEditModal={actions.closeEditMode}
            handleEditContact={handleEditContact}
            contactTool={contactTool}
            handleDeleteContact={handleDeleteContact}
            deleteContact={actions.deleteContact}
            handleSearch={actions.setActiveMessage}
            handleCloseDeleteModal={() => {
              actions.closeDeleteMode();
            }}
            contactList={contactList}
            handleAddContact={handleAddContact}
            handleUpdateContact={handleUpdateContact}
            handleContactCheck={handleContactCheck}
          />
        )}
        {isHistory && (
          <HistoryList
            contactTool={contactTool}
            handleAddContact={handleAddContact}
            handleOpenModal={actions.handleOpenModal}
            handleCloseModal={actions.handleCloseModal}
            deleteMessage={actions.deleteMessage}
          />
        )}
        {!isHistory && (
          <CreateMessage
            contactTool={contactTool}
            handleCloseRecipient={handleCloseRecipient}
            handleResetRecipients={actions.handleResetRecipients}
            contactList={contactList}
            subject={subject}
            handleSubject={handleSubject}
            handleMessage={handleMessage}
            handleSend={() => {
              handleSend();
              resetMessageContent();
            }}
            handleGetTemplate={handleGetTemplate}
            disableSend={disableSend}
            setOpenTemplate={handleOpenTemplateModal}
            choseTemplate={template}
            clearTemplate={handleClearTemplate}
            handleAttachmentChange={handleAttachmentChange}
            disableSendTemplate={disableSendTemplate}
            templateMode={templateMode}
          />
        )}
        {isHistory && <MessagePreview />}
      </section>
    </>
  );
};

const mapStateToProps = store => {
  const { profile_id: profileId, loading: accountLoading } = store.user.account;
  const {
    dashboard: { contactTool },
    form: { contactList },
  } = store;

  return {
    contactTool,
    contactList,
    profileId,
    accountLoading,
  };
};

const mapDispatchProps = dispatch => ({
  dispatch,

  actions: bindActionCreators(
    {
      handleOpenModal,
      handleCloseModal,
      createContact,
      getContacts,
      setActiveMessage,
      openEditMode,
      openDeleteMode,
      deleteContact,
      closeDeleteMode,
      closeEditMode,
      updateContact,
      handleRecipients,
      sendMessage,
      getTemplate,
      getMessages,
      resetRecipients,
      handleResetRecipients,
      displayMessage,
      checkedPermission,
      unsetRecipients,
      setResetQuillMessage,
      reset,
      setAttachments,
    },
    dispatch
  ),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchProps
  )(
    reduxForm({
      form: 'contactList',
      initialValues: {
        sort: Sort.Desc,
      },
    })(ContactTool)
  )
);
