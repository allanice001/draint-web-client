import { IconButton } from '@material-ui/core';
import React from 'react';
// import RedoIcon from '@material-ui/icons/Redo';
// import UndoIcon from '@material-ui/icons/Undo';
import styles from './footer.module.scss';

function Footer({
  undoEditorChanges,
  redoEditorChanges,
  handleDeletePost,
  savePostHandler,
  post,
  disabled,
  buttonName = 'Save Post',
  secondButton,
}) {
  return (
    <div className={styles.footer}>
      <div className="editor-buttons-wrap">
        <IconButton onClick={undoEditorChanges} disabled>
          {/*<UndoIcon />*/}
        </IconButton>
        <IconButton onClick={redoEditorChanges} disabled>
          {/*<RedoIcon />*/}
        </IconButton>
      </div>
      <div className={`post-buttons-wrap ${styles.buttons_wrapper}`}>
        {post && (
          <button
            onClick={() => {
              handleDeletePost(post);
            }}
            className={`primary-button ${styles.main_button}`}
            type="button"
          >
            {secondButton || 'Delete Post'}
          </button>
        )}
        <button
          onClick={savePostHandler}
          disabled={disabled}
          className={`primary-button ${styles.main_button}`}
          type="button"
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
}

export default Footer;
