import {
  ARTWORK_FILTER_NAME,
  FILTER_NAME,
  ROLE_FILER_NAME,
  SUBSCRIPTION_FILER_NAME,
} from 'constants/components/master/filters-default';
import {
  AUTO_LETTER_DIALOG,
  FILL_FORM_ALERT,
  SELECT_RECIPIENT,
} from 'constants/master-dashboard/automated-newslaters';
import { Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  getRecipients,
  resetTemplate,
  saveLetterDialog,
  sendCustomLetter,
  setFilter,
  setMailForm,
  setPage,
  setRecipientsList,
} from 'redux/master/actions/newslettersActions';
import { useDispatch, useSelector } from 'react-redux';

import { ArtistsEmailsList } from 'components/newsletter/emails/emailsList';
import EmailForm from './newsletter-email-form';
import EmailTemplate from './newsletter-email-template';
import { MasterFilter } from 'components/filters/masterFilter';
import { NewsletterNav } from 'components/nav/sub/newsletter';
import PaginationControlled from 'components/pagination/paginationNumbers';
import SearchBar from 'components/searchBar/searchBar';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import styles from './newsletter-create.module.scss';

const MasterNewsLetterCreate = () => {
  const [initialState, setInitialState] = useState(false);

  let {
    loading,
    page,
    totalPages,
    openDialog,
    search,
    filter,
    subscriptionFilter,
    artworkFilter,
    currentAccounts,
    template,
    roleFilter,
    checkedAccounts,
    selectedAll,
    form: mailForm,
  } = useSelector(state => state.master.newsletters);

  const { account: user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    dispatch(
      setMailForm({
        title: '',
        text: '',
        img_link: '',
        button_name: '',
        button_link: '',
        dateSelected: false,
        selectedDate: null,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetTemplate());
  }, [dispatch]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(
        getRecipients(
          search,
          filter,
          artworkFilter,
          subscriptionFilter,
          page,
          roleFilter
        )
      );
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [
    dispatch,
    search,
    filter,
    artworkFilter,
    subscriptionFilter,
    page,
    roleFilter,
  ]);

  const filterChange = async (event, type) => {
    const filter = await event.target.value;
    await dispatch(setFilter(type, filter));
  };

  const handlePageChange = async page => {
    await dispatch(setPage(page));
  };

  const handleSearch = search => {
    dispatch(setFilter('search', search));
  };

  const handleDateChange = date => {
    dispatch(
      setMailForm({
        ...mailForm,
        selectedDate: new Date(date).toISOString(),
      })
    );
  };

  const handleDateCheckbox = async () => {
    dispatch(
      setMailForm({
        ...mailForm,
        dateSelected: !mailForm.dateSelected,
        selectedDate: mailForm.dateSelected ? null : new Date(),
      })
    );
  };

  const handleInputChange = (event, field) => {
    dispatch(setMailForm({ ...mailForm, [field]: event.target.value }));
  };

  const updateRecipients = recipients => {
    dispatch(setRecipientsList(recipients));
  };

  const handleDialog = () => {
    dispatch(saveLetterDialog());
  };

  const lettersSend = async mailForm => {
    setInitialState(false);

    if (mailForm.title === '' || mailForm.text === String('<p><br></p>')) {
      dispatch(displayMessage(FILL_FORM_ALERT));
    } else if (checkedAccounts.length === 0 && !selectedAll) {
      dispatch(displayMessage(SELECT_RECIPIENT));
    } else {
      dispatch(
        sendCustomLetter(
          mailForm,
          checkedAccounts,
          selectedAll,
          filter,
          subscriptionFilter,
          artworkFilter,
          search
        )
      );
    }
    handleDialog();
  };

  return (
    <>
      <NewsletterNav />
      <div className={styles.wrapper}>
        <div className={styles.list_block}>
          <div className={styles.list_wrapper}>
            <Card>
              <CardContent>
                <div className={styles.filter}>
                  <SearchBar handleSearch={handleSearch} value={search} />
                  <MasterFilter
                    column
                    disabled={loading}
                    filter={filter}
                    artworkFilter={artworkFilter}
                    onArtworkFilterChange={event =>
                      filterChange(event, ARTWORK_FILTER_NAME)
                    }
                    onRoleFilterChange={event =>
                      filterChange(event, ROLE_FILER_NAME)
                    }
                    roleFilter={roleFilter}
                    onChange={event => filterChange(event, FILTER_NAME)}
                    subscriptionFilter={subscriptionFilter}
                    subscriptionFilterChange={event =>
                      filterChange(event, SUBSCRIPTION_FILER_NAME)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className={styles.list_content}>
              <ArtistsEmailsList
                loading={loading}
                artists={currentAccounts}
                updateRecipients={updateRecipients}
              />
              <PaginationControlled
                style={['dark']}
                totalPages={totalPages}
                page={page}
                handler={handlePageChange}
              />
            </div>
          </div>
        </div>
        <h2 className={styles.title}>Newsletter Form</h2>

        {!isAnalyst && (
          <div className={styles.form_block}>
            <EmailForm
              withTime
              form={mailForm}
              loading={loading}
              openDialog={openDialog}
              initialState={initialState}
              dialogSettings={AUTO_LETTER_DIALOG}
              setInitialState={() => setInitialState(true)}
              inputChange={handleInputChange}
              handleDialog={handleDialog}
              lettersSend={lettersSend}
              dateCheckbox={handleDateCheckbox}
              dateChange={handleDateChange}
            />
            <Card className={styles.form_block__preview}>
              <EmailTemplate html={template} />
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default MasterNewsLetterCreate;
