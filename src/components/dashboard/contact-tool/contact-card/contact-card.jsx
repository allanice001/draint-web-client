import CardWrapper from 'components/dashboard/contact-tool/shared/card-wrapper/card-wrapper';
import CheckBox from 'components/reduxForm/checkbox/checkbox';
import { Field } from 'redux-form';
import Icons from 'components/icons';
import React from 'react';
import cx from 'classnames';
import styles from './contact-card.module.scss';
import { getContactsInstagram } from 'helpers/instagram-url-checker';
import { INSTAGRAM_LINK } from 'constants/global';

const ActionButton = ({ children, onClick }) => {
  return (
    <button className={cx(styles.action)} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

const ContactItemRow = ({ leftText, rightText }) => {
  return (
    <p className={cx(styles.card_row)}>
      {leftText && <span className={cx(styles.card_content)}>{leftText}</span>}
      {leftText && rightText && <span className={cx(styles.delim)} />}
      {rightText && (
        <span className={cx(styles.card_content)}>{rightText}</span>
      )}
    </p>
  );
};

export default function ContactCard(props) {
  const { checked, onEdit, onDelete, contact, handleContactCheck } = props;
  const { city, country } = contact;
  const address = [];
  const isUnregistered = !contact.subscriber_id && contact.is_subscriber;
  const instagramUsername = getContactsInstagram(contact.instagram);

  !!city && address.push(city);
  !!country && address.push(country);

  return (
    <CardWrapper active={checked} className={cx(styles.root)} isSubscriber={contact.is_subscriber}>
      {!contact.confirmed && (
        <span className={styles.message}>contact is not confirmed</span>
      )}
      {isUnregistered && contact.confirmed && (
        <span className={styles.message}>user is not registered yet</span>
      )}

      <div className={styles.card_row}>
        <span className={styles.contact_name}>{contact.name}</span>
        <div className={styles.card_actions}>
          <ActionButton onClick={onDelete}>
            <Icons.Delete />
          </ActionButton>

          <ActionButton onClick={onEdit}>
            <Icons.EditPencilIcon />
          </ActionButton>

          <Field
            name={contact.id}
            component={CheckBox}
            onChange={handleContactCheck}
            disabled={!contact.confirmed}
          />
        </div>
      </div>

      <ContactItemRow
        leftText={<span title={address.join(', ')}>{address.join(', ')}</span>}
        rightText={
          !!contact.phone && (
            <a
              className={cx(styles.link)}
              href={`tel:${contact.phone}`}
              title={`+${contact.phone}`}
            >
              {`+${contact.phone}`}
            </a>
          )
        }
      />

      <ContactItemRow
        leftText={
          !!contact.email && (
            <a
              className={cx(styles.link)}
              href={`mailto:${contact.email}`}
              title={contact.email}
            >
              {contact.email}
            </a>
          )
        }
        rightText={
          !!instagramUsername && (
            <a
              className={cx(styles.link)}
              href={`${INSTAGRAM_LINK}${instagramUsername}`}
              title={`@${instagramUsername}`}
            >
              {`@${instagramUsername}`}
            </a>
          )
        }
      />
    </CardWrapper>
  );
}
