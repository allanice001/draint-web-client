import { Card, CardActions, CardContent } from '@material-ui/core';
import {
  LETTER_TYPES,
  NAME,
  TYPE,
} from 'constants/components/newsletter-mail-form';
import React, { useCallback, useEffect, useState } from 'react';
import { LetterForm } from './letters/letter-form';
import { LetterFormButtons } from './letters/letter-form-buttons';
import Quill from 'quill';
import { getTemplate } from 'redux/master/actions/newslettersActions';
import { useDispatch } from 'react-redux';

export const toolbarOptions = [
  ['link', 'bold', 'italic', 'underline', { color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ size: [false, 'large'] }],
];

const Editor = (el, options = toolbarOptions) =>
  new Quill(el, {
    modules: {
      toolbar: options,
    },

    theme: 'snow',
  });

const getDefType = name => {
  return LETTER_TYPES.find(el => el.name === name)?.type || '';
};

const getTemplateName = selectedType => {
  switch (selectedType) {
    case NAME.ARTIST_REMINDER:
      return TYPE.USER_REMINDER;
    case NAME.ARTWORKS_VERIFIED:
    case NAME.ARTWORK_UNVERIFIED:
      return NAME.WEEKLY_LETTER;
    default:
      return NAME.BASIC_TEMPLATE;
  }
};

function EmailForm({
  form,
  loading,
  openDialog,
  withTime = false,
  withButton = true,
  dialogSettings,
  inputChange,
  handleDialog,
  handleCancelDialog,
  lettersSend,
  handleSaveDialog,
  dateCheckbox,
  dateChange,
  templateName,
  selectedType,
  isPermission,
  checkedArtworks,
  checkedArtists,
}) {
  const dispatch = useDispatch();
  const [textEditor, setTextEditor] = useState(null);

  const setTemplateName = () => {
    if (selectedType) {
      return getTemplateName(selectedType);
    }
    return templateName;
  };

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setTextEditor(Editor(node));
    }
  }, []);

  const handleLettersSend = (form, selectedType) => {
    form.text = textEditor.root.innerHTML;
    lettersSend(form, selectedType);
  };

  const handleGetTemplate = () => {
    const { title, img_link, button_name, button_link } = form;
    const data = {
      title,
      img_link,
      text: textEditor.root.innerHTML,
      template: setTemplateName(),
      type: getDefType(selectedType),
      checkedArtworks,
      checkedArtists,
      button_name,
      button_link,
      letterType: selectedType,
    };
    dispatch(getTemplate(data));
  };

  useEffect(() => {
    if (textEditor) {
      textEditor.root.innerHTML = form.text;
    }
  }, [form.text, textEditor]);

  function handleCancel() {
    handleCancelDialog();
    textEditor.root.innerHTML = form.text;
  }

  return (
    <Card
      classes={{
        root: 'newsletter-form',
      }}
    >
      <CardContent>
        <LetterForm
          openDialog={openDialog}
          dialogSettings={dialogSettings}
          handleDialog={handleDialog}
          handleCancel={handleCancel}
          handleLettersSend={handleLettersSend}
          form={form}
          selectedType={selectedType}
          title={form.title}
          inputChange={inputChange}
          measuredRef={measuredRef}
          image={form.img_link}
          loading={loading}
          name={form.button_name}
          link={form.button_link}
          withTime={withTime}
          withButton={withButton}
          dateCheckbox={dateCheckbox}
          dateChange={dateChange}
        />
      </CardContent>
      <CardActions>
        <LetterFormButtons
          handleDialog={handleDialog}
          handleSaveDialog={handleSaveDialog}
          loading={loading}
          isPermission={isPermission}
          handleGetTemplate={handleGetTemplate}
        />
      </CardActions>
    </Card>
  );
}

export default EmailForm;
