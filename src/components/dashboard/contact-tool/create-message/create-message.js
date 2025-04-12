import './create-message.scss';

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import Editor from 'components/blog/blog-post-modal/modal-layout/editor';
import { SendIcon } from 'components/icons/sendIcon';
import TemplateInfo from 'components/dashboard/contact-tool/template-info/template-info';
import cx from 'classnames';
import { setResetQuillMessage } from 'redux/dashboard/actions/contactToolActions';
import styles from './create-message.module.scss';

const TitleComponent = ({ setOpenTemplate }) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>Create message</h3>
    <button
      type="button"
      className={styles.template_button}
      onClick={() => setOpenTemplate(true)}
    >
      Template
    </button>
  </div>
);

const RecipientsComponent = props => {
  props.handleResetRecipients(Boolean(props.contactList));
  return (
    <div>
      <span className={styles.component_title}>Recipients</span>
      <div className={styles.list}>
        {props.recipients.map((recipient, index) => (
          <RecipientsButton
            key={index}
            recipient={recipient}
            handleCloseRecipient={props.handleCloseRecipient}
          />
        ))}
      </div>
    </div>
  );
};

const RecipientsButton = props => {
  const cropName = name => {
    const str = name.slice(0, 10);
    if (name.length > 12) {
      return `${str}...`;
    }
    return `${str}`;
  };

  return (
    <div className={styles.recipients}>
      <span className={styles.recipients_name}>
        {cropName(props.recipient.name || props.recipient.email)}
      </span>
      <button
        type="button"
        onClick={() => props.handleCloseRecipient(props.recipient.id)}
      >
        <CloseIcon className={styles.close_icon} />
      </button>
    </div>
  );
};

const SubjectComponent = props => (
  <div>
    <span className={styles.component_title}>Subject</span>
    <div className={styles.subject_title_wrapper}>
      <input
        className={styles.subject_title}
        type="text"
        name="subject"
        value={props.subject}
        autoComplete="off"
        onChange={props.handleSubject}
        disabled={props.templateMode}
      />
    </div>
  </div>
);

const Delimiter = () => (
  <div>
    <div className={styles.delimiter} />
  </div>
);

const MessageComponent = props => {
  const dispatch = useDispatch();

  const isQuillMessage = useSelector(
    store => store.dashboard.contactTool.isQuillMessage
  );

  const [textEditor, setTextEditor] = useState(false);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setTextEditor(Editor(node));
    }
  }, []);

  if (textEditor && !isQuillMessage) {
    textEditor.on('text-change', () => {
      return props.handleMessage(textEditor.root.innerHTML);
    });
  }

  if (textEditor && isQuillMessage) {
    textEditor.root.innerHTML = '';
    textEditor.on('text-change', () => {
      return props.handleMessage(textEditor.root.innerHTML);
    });
    dispatch(setResetQuillMessage(false));
  }

  return (
    <div className={styles.massage_wrapper} id="contact-tool">
      <span className={styles.component_title}>Message</span>
      <div className={styles.message_letter_wrapper}>
        <div ref={measuredRef} className="message_letter" />
        <div className={styles.send_wrapper}>
          <button
            type="button"
            className={
              props.disableSend
                ? styles.send_button_disabled
                : styles.send_button
            }
            onClick={props.handleSend}
            disabled={props.disableSend}
          >
            <span className={styles.send_name}>Send</span>
            <SendIcon className={styles.send_icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateMessage = props => {
  const attachments = useSelector(
    store => store.dashboard.contactTool.attachments
  );

  const getSubject = () => {
    if (!attachments[0]?.value.length && Boolean(attachments[0]?.type)) {
      props.clearTemplate();
    }
    return props.subject;
  };

  return (
    <>
      <h3 className={cx('group-title', styles.title_mobile)}>Create message</h3>
      <div className={styles.message_wrapper}>
        <TitleComponent setOpenTemplate={props.setOpenTemplate} />
        <RecipientsComponent
          recipients={props.contactTool.recipients}
          handleCloseRecipient={props.handleCloseRecipient}
          handleResetRecipients={props.handleResetRecipients}
          contactList={props.contactList}
        />
        <Delimiter />
        <SubjectComponent
          subject={getSubject()}
          handleSubject={props.handleSubject}
          templateMode={props.templateMode}
        />
        <Delimiter />

        {props.templateMode ? (
          <div className={styles.template}>
            <TemplateInfo
              template={props.choseTemplate}
              handleCancel={props.clearTemplate}
              handleAttachmentChange={props.handleAttachmentChange}
              templateAttachment={props.templateAttachment}
              disabled={
                props.disableSendTemplate ||
                !props.contactTool.recipients.length
              }
              handleSend={props.handleSend}
              handleGetTemplate={props.handleGetTemplate}
            />
          </div>
        ) : (
          <MessageComponent
            handleMessage={props.handleMessage}
            handleSend={props.handleSend}
            disableSend={props.disableSend}
          />
        )}
      </div>
    </>
  );
};

export { CreateMessage };
