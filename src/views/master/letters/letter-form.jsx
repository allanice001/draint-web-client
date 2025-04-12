import { Checkbox, FormControlLabel } from '@material-ui/core';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { ButtonLinkInput } from './button-link-input';
import { ButtonNameInput } from './button-name-input';
import { EditorInput } from './editor-input';
import { ImageInput } from './image-input';
import MaterialUIPickers from 'components/pickers/dateForm';
import React from 'react';
import { TitleInput } from './title-input';
import styles from 'views/master/newsletter-email-form.module.scss';

export function LetterForm({
  openDialog,
  dialogSettings,
  handleDialog,
  handleCancel,
  handleLettersSend,
  form,
  selectedType,
  title,
  inputChange,
  measuredRef,
  image,
  loading,
  name,
  link,
  withTime,
  withButton,
  dateCheckbox,
  dateChange,
}) {
  return (
    <form>
      <AlertDialogDelete
        openDialog={openDialog}
        dialogSettings={dialogSettings}
        //workaround for clearing fields in current component
        //handleDialog also use components newsletter-weekly and newsletter-create
        handleDialog={handleDialog ? handleDialog : handleCancel}
        deleteBackground={() => handleLettersSend(form, selectedType)}
      />

      <TitleInput title={title} inputChange={inputChange} />

      <EditorInput selectedType={selectedType} measuredRef={measuredRef} />

      <ImageInput
        selectedType={selectedType}
        image={image}
        inputChange={inputChange}
      />

      {withButton && (
        <div className={styles.button_container}>
          <div className={styles.button_wrapper}>
            <ButtonNameInput
              selectedType={selectedType}
              name={name}
              inputChange={inputChange}
            />
          </div>
          <div className={styles.button_wrapper}>
            <ButtonLinkInput
              selectedType={selectedType}
              link={link}
              inputChange={inputChange}
            ></ButtonLinkInput>
          </div>
        </div>
      )}

      {withTime && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                disabled={loading}
                checked={form.dateSelected}
                color="primary"
                onChange={dateCheckbox}
              />
            }
            label="Set sending time"
          />
          {form.dateSelected && (
            <MaterialUIPickers
              disabled={loading}
              selectedDate={form.selectedDate}
              handleDateChange={dateChange}
              disablePast
            />
          )}
        </>
      )}
      <div className={styles.bottom_buttons} />
    </form>
  );
}
