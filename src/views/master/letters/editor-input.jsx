import { FORM_FIELD, NAME } from 'constants/components/newsletter-mail-form';
import { LetterHints } from './letter-hints';
import React from 'react';
import cx from 'classnames';
import styles from 'views/master/newsletter-email-form.module.scss';

export function EditorInput({ selectedType, measuredRef }) {
  function isDisabled() {
    switch (selectedType) {
      case NAME.ARTWORK_PRICE_CHANGED:
        return true;
      default:
        return false;
    }
  }

  return (
    <>
      <span>{FORM_FIELD.ENTER_EMAIL_TEXT}</span>
      <LetterHints selectedType={selectedType} />
      <div
        className={cx(styles.text_editor, {
          [styles.disabled]: isDisabled(),
        })}
      >
        <div className={styles.editor} ref={measuredRef} />
      </div>
    </>
  );
}
