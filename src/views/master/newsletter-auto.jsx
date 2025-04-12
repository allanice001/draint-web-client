import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  closeSnackbar,
  getAutoLetters,
  getTemplate,
  handleSaveAutoLetterLetter,
  resetTemplate,
  saveLetterDialog,
  setLetterType,
  setMailForm,
} from 'redux/master/actions/newslettersActions';

import { AUTO_LETTER_DIALOG } from 'constants/master-dashboard/automated-newslaters';
import EmailForm from './newsletter-email-form';
import EmailTemplate from './newsletter-email-template';
import { NewsletterNav } from 'components/nav/sub/newsletter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './newsletter-auto.module.scss';

function MasterNewsLetterAutomated({
  loading,
  letterTypes,
  selectedType,
  openDialog,
  template,
  actions,
  mailForm,
  user,
}) {
  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    if (!letterTypes.length) {
      actions.getAutoLetters();
    }
  }, [letterTypes.length, actions]);

  useEffect(() => {
    actions.resetTemplate();
  }, [actions]);

  useEffect(() => {
    if (selectedType) {
      actions.setLetterType(selectedType);
      const autoForm = letterTypes.find(el => el.type === selectedType);
      actions.setMailForm(autoForm);
    }
  }, [selectedType, letterTypes, actions]);

  function formAutoFill(type) {
    const autoForm = letterTypes.find(el => el.type === type);
    actions.setMailForm(autoForm);
  }

  function handleSelectorChange(event) {
    const selectedType = event.target.value;
    actions.setLetterType(selectedType);
    formAutoFill(selectedType);
  }

  function handleInputChange(event, field) {
    actions.setMailForm({ ...mailForm, [field]: event.target.value });
  }

  return (
    <div>
      <NewsletterNav />
      <div className={styles.wrapper}>
        <div className={styles.wrapper__form}>
          <Card>
            <CardContent>
              <FormControl>
                <Select
                  style={{ minWidth: 220, minHeight: 30, fontSize: 15 }}
                  value={selectedType || 'none'}
                  onChange={handleSelectorChange}
                >
                  {!selectedType && (
                    <MenuItem key="auto-none" value="none">
                      Select letter type
                    </MenuItem>
                  )}
                  {letterTypes.map(letter => (
                    <MenuItem key={`auto-${letter.id}`} value={letter.type}>
                      {letter.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={styles.form_block}>
                <h2>Newsletter Form</h2>
                <EmailForm
                  form={mailForm}
                  loading={loading}
                  openDialog={openDialog}
                  selectedType={selectedType}
                  dialogSettings={AUTO_LETTER_DIALOG}
                  inputChange={handleInputChange}
                  //action for open dialog in newsletter-email-form
                  handleSaveDialog={actions.saveLetterDialog}
                  //reset fields for newsletter-email-form
                  handleCancelDialog={() => {
                    formAutoFill(selectedType);
                    actions.saveLetterDialog();
                  }}
                  lettersSend={actions.handleSaveAutoLetterLetter}
                  getPreview={actions.getTemplate}
                  isPermission={isAnalyst}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className={styles.wrapper__preview}>
          <Card>
            <EmailTemplate html={template} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    mailForm: store.master.newsletters.form,
    newsletters: store.master.newsletters,
    loading: store.master.newsletters.loading,
    letterTypes: store.master.newsletters.letterTypes,
    selectedType: store.master.newsletters.selectedType,
    message: store.master.newsletters.message,
    open: store.master.newsletters.open,
    style: store.master.newsletters.style,
    openDialog: store.master.newsletters.openDialog,
    template: store.master.newsletters.template,
    user: store.user.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getTemplate,
        getAutoLetters,
        setLetterType,
        saveLetterDialog,
        closeSnackbar,
        handleSaveAutoLetterLetter,
        setMailForm,
        resetTemplate,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterNewsLetterAutomated);
