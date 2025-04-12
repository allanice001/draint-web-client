import {
  CONTACTS_COUNT_LABEL,
  CONTACT_LIST,
} from 'constants/contacts';
import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ContactCard from 'components/dashboard/contact-tool/contact-card/contact-card';
import DeleteContactModal from 'components/dashboard/contact-tool/add-contact-modal/delete-contact-modal';
import EditContactModal from 'components/dashboard/contact-tool/add-contact-modal/edit-contact-modal';
import ListFooter from 'components/dashboard/contact-tool/shared/list-footer/list-footer';
import ListHeader from 'components/dashboard/contact-tool/shared/list-header/list-header';
import SearchForm from 'components/dashboard/contact-tool/shared/search-form/search-form';
import cx from 'classnames';
import { getContacts } from 'redux/dashboard/actions/contactToolActions';
import styles from 'components/dashboard/contact-tool/list.module.scss';

const Analytic = AnalyticHelper.create();

export const ContactList = props => {
  const { handleEditContact, handleDeleteContact, contactTool } = props;
  const { values = {} } = useSelector(state => state.form.contactList) || {};
  const dispatch = useDispatch();

  const onEdit = useCallback(
    id => {
      handleEditContact(id);
    },
    [handleEditContact]
  );

  const onDelete = useCallback(
    id => {
      Analytic.createEvent('ContactWasDeletedToContactTool');
      handleDeleteContact(id);
    },
    [handleDeleteContact]
  );

  return (
    <div className={styles.component_wrapper}>
      <ListHeader
        count={contactTool.contacts.length}
        title={CONTACT_LIST}
        countLabel={CONTACTS_COUNT_LABEL}
      />

      <SearchForm onChange={() => dispatch(getContacts())} />

      <div className={cx(styles.content)}>
        {contactTool.contacts.map((contact, index) => (
          <ContactCard
            key={index}
            contact={contact}
            handleContactCheck={props.handleContactCheck}
            onEdit={() => onEdit(contact.id)}
            onDelete={() => onDelete(contact.id)}
            checked={values[contact.id]}
            handleCloseEditModal={props.handleCloseEditModal}
            handleUpdateContact={props.handleUpdateContact}
            handleCloseDeleteModal={props.handleCloseDeleteModal}
            deleteContact={props.deleteContact}
            openModal={props.openModal}
            contactList={props.contactList}
          />
        ))}
      </div>

      <ListFooter
        handleCloseModal={props.handleCloseModal}
        setOpenModal={props.contactTool.setOpenModal}
        handleAddContact={props.handleAddContact}
        handleOpenModal={props.handleOpenModal}
      />

      <EditContactModal
        handleCloseEditModal={props.handleCloseEditModal}
        onSubmit={props.handleUpdateContact}
      />

      <DeleteContactModal
        handleCloseDeleteModal={props.handleCloseDeleteModal}
        deleteContact={props.deleteContact}
      />
    </div>
  );
};
