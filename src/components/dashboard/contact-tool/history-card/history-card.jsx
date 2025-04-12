import CardWrapper from '../shared/card-wrapper/card-wrapper';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import styles from './history-card.module.scss';
import { useSelector } from 'react-redux';

export default function HistoryCard(props) {
  const { onClick } = props;
  const {
    id,
    contacts,
    created_at,
    subject,
    message,
    using_template: isTemplate,
  } = props.data;
  const activeMessageId = useSelector(store => {
    const { activeMessage } = store.dashboard.contactTool;

    return activeMessage ? activeMessage.id : null;
  });

  const getRecipient = () => {
    return contacts.length > 1
      ? `${contacts[0].name} and ${contacts.length - 1} others`
      : contacts[0].name;
  };

  const messageReplace = () => {
    return !isTemplate ? message.replace(/<\/?[^>]+>/gi, '') : '';
  };
  const getSentData = () => {
    return moment(created_at).format('D MMM hh:mm');
  };

  return (
    <div className={cx(styles.root)} onClick={onClick}>
      <CardWrapper active={activeMessageId === id}>
        <div className={cx(styles.header)}>
          <div>
            <strong className={cx(styles.recipient)}>{getRecipient()}</strong>
            <time className={cx(styles.time)}>{getSentData()}</time>
          </div>
        </div>

        <h4 className={cx(styles.subject)}>{subject}</h4>

        <p className={cx(styles.description)}>{messageReplace()}</p>
      </CardWrapper>
    </div>
  );
}
