import React, { useCallback, useEffect, useState } from 'react';
import BasicModal from 'components/basic-modal/basic-modal';
import { BlogDnd } from 'components/blog/blog-dnd/blog-dnd';
import Editor from 'components/blog/blog-post-modal/modal-layout/editor';
import Footer from 'components/blog/blog-post-modal/modal-layout/footer/footer';
import Input from 'components/reduxForm/input/input';
import PropTypes from 'prop-types';
import styles from 'components/blog/blog-post-modal/blog-post-modal.module.scss';

function AddOrEditLegal({
  handleClose,
  open,
  handleSaveLegal,
  item,
  isEditorOrAdmin,
}) {
  const [textEditor, setTextEditor] = useState(null);
  const [featureImage, setFeaturedImage] = useState(null);
  const [title, setTitle] = useState('');

  const savePostHandler = () => {
    if (title.length > 0 && (featureImage || item?.image_url)) {
      const content = textEditor.root.innerHTML;

      if (typeof handleSaveLegal === 'function')
        handleSaveLegal(item, title, content, featureImage);

      setTitle('');
      setFeaturedImage(null);
    }
  };

  const disabled = !(title.length > 0 && (featureImage || item?.image_url));

  const measuredRef = useCallback(node => {
    if (node !== null) setTextEditor(Editor(node));
  }, []);

  useEffect(() => {
    if (textEditor) {
      textEditor.root.innerHTML = item ? item.html_content : '';
    }
    setTitle(item?.title || '');
  }, [textEditor, item]);

  const undoEditorChanges = () => {
    textEditor.history.undo();
  };

  const redoEditorChanges = () => {
    textEditor.history.redo();
  };

  return (
    <BasicModal
      footer={
        <Footer
          buttonName="Save Legal"
          featureImage={featureImage}
          item={item}
          disabled={disabled || !isEditorOrAdmin}
          redoEditorChanges={redoEditorChanges}
          savePostHandler={savePostHandler}
          title={title}
          undoEditorChanges={undoEditorChanges}
        />
      }
      handleClose={() => {
        handleClose();
        setFeaturedImage(null);
      }}
      isOpen={open}
      title={`${item ? 'Edit' : 'Create'} a legal item`}
    >
      <div className={styles.edit_content}>
        <Input
          inputClassName={styles.input}
          label="Title"
          maxLength={30}
          labelClassName={styles.label}
          name="Title"
          onChange={event => setTitle(event.target.value)}
          type="text"
          value={title}
          disabled={item?.title === 'Imprint'}
        />
        <small className={styles.count}>{title.length} / 30</small>
        <div className="gallery-uploader-button">
          <BlogDnd
            setFeaturedImage={setFeaturedImage}
            featureImage={featureImage}
            post={item?.image_url}
            staticUrl
          />
        </div>
        <div className={styles.label}>
          <span>Legal</span>
        </div>
        <div className={styles.text_editor}>
          <div ref={measuredRef} className="editor" />
        </div>
      </div>
    </BasicModal>
  );
}

AddOrEditLegal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSaveLegal: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddOrEditLegal;
