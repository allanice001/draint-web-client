import React, { useEffect } from 'react';
import {
  checkedPermission,
  deleteMessage,
  getTemplate,
  resetActiveMessage,
  sendMessage,
} from 'redux/dashboard/actions/contactToolActions';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ButtonPrimary from 'components/shared/button-primary/button-primary';
import ButtonSecondary from 'components/shared/button-secondary/button-secondary';
import EmailTemplate from 'views/master/newsletter-email-template';
import Icons from 'components/icons';
import { SUBSCRIPTIONS_DASHBOARD } from 'constants/routes/userModule/dashboard';
import { WARNING_SUBSCRIPTION_ALL_IN_ONE } from 'constants/components/artworks.contants';
import cx from 'classnames';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getTemplateData } from 'services/emails/emails-data-service';
import styles from './message-preview.module.scss';
import { useHistory } from 'react-router';

const contentMetadata = [
  {
    label: 'Recipients',
    key: 'contacts',
    className: styles.recipient,
  },
  {
    label: 'Subject',
    key: 'subject',
    className: styles.subject,
  },
];

export default function MessagePreview() {
  const active_message = useSelector(
    store => store.dashboard.contactTool.activeMessage
  );

  const template = useSelector(
    store => store.dashboard.contactTool.previewTemplate
  );

  const contactTool = useSelector(store => store.dashboard.contactTool);

  const dispatch = useDispatch();

  useEffect(() => {
    if (active_message) {
      const content = getTemplateData(active_message);
      dispatch(getTemplate(content));
      dispatch(checkedPermission());
    }
  }, [active_message, dispatch]);

  const history = useHistory();
  const Analytic = AnalyticHelper.create();

  const onForward = () => {
    if (active_message && contactTool.isCanUse) {
      let analytic_data = { template_name: template.name };
      let analyticEvent = 'TemplateMessageSent';
      const forward_data = getTemplateData(active_message);

      const data = {
        subject: active_message.subject,
        message: active_message.message,
        recipients: active_message.contacts,
        profile_id: active_message.profile_id,
      };
      data.template = {
        id: forward_data.id,
        attachments: forward_data.attachments,
      };

      Analytic.createEvent(analyticEvent, {
        contact_quantity: contactTool.recipients.length,
        ...analytic_data,
      });
      return dispatch(sendMessage(data));
    } else {
      history.push(SUBSCRIPTIONS_DASHBOARD);
      dispatch(displayMessage(WARNING_SUBSCRIPTION_ALL_IN_ONE, 'warning'));
    }
  };

  const content = contentMetadata.map(({ label, key, className }) => {
    const value = active_message ? active_message[key] : '';
    let messageContent = null;

    if (value) {
      messageContent = Array.isArray(value) ? (
        value.map(item => (
          <div key={item} className={className}>
            {item.name}
          </div>
        ))
      ) : (
        <div className={className}>
          <div className={cx(styles.subject_wrapper)}>{value}</div>
          <div className={cx(styles.template_wrapper)}>
            <EmailTemplate html={template} />
          </div>
        </div>
      );
    }

    return (
      <div
        className={cx(styles.field, {
          [styles.has_list]: Array.isArray(value),
        })}
      >
        <label className={cx(styles.label)}>{label}</label>
        {messageContent}
      </div>
    );
  });

  const actions = active_message ? (
    <div className={cx(styles.footer)}>
      <ButtonSecondary
        className={cx(styles.delete)}
        icon={<Icons.Delete />}
        onClick={() => {
          dispatch(deleteMessage(active_message.id));
          dispatch(resetActiveMessage());
        }}
      />
      <ButtonPrimary
        className={cx(styles.forward)}
        icon={<Icons.SendIcon />}
        onClick={() => {
          onForward();
          dispatch(resetActiveMessage());
        }}
      >
        Forward
      </ButtonPrimary>
    </div>
  ) : null;

  return (
    <div className={cx(styles.root)}>
      <div className={cx(styles.content)}>{content}</div>
      {actions}
    </div>
  );
}
