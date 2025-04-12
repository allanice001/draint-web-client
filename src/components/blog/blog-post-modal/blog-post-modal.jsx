import './modal-layout/editol.scss';
import {
  MAX_LENGTH_CONTENT,
  MAX_LENGTH_SUMMARY,
  MAX_LENGTH_TITLE,
  MIN_LENGTH_CONTENT,
  NO_FIRST_SPACE_SYMBOL_REGEX,
} from 'constants/blog';
import React, { useCallback, useEffect, useState } from 'react';
import BasicModal from 'components/basic-modal/basic-modal';
import { BlogDnd } from 'components/blog/blog-dnd/blog-dnd';
import Editor from 'components/blog/blog-post-modal/modal-layout/editor';
import Footer from 'components/blog/blog-post-modal/modal-layout/footer/footer';
import Input from 'components/reduxForm/input/input';
import { InputList } from 'components/reduxForm/input-list/input-list';
import { Tag } from 'components/shared/tag/tag';
import Textarea from 'components/reduxForm/textarea/textarea';
import styles from 'components/blog/blog-post-modal/blog-post-modal.module.scss';

function BlogPostModal({
  handleClose,
  open,
  handleSavePost,
  post,
  handleDeletePost,
  handleAnalyticEvents,
  secondButton,
}) {
  const [textEditor, setTextEditor] = useState(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [featureImage, setFeaturedImage] = useState(null);
  const [contentLength, setContentLength] = useState(0);
  const [keywords, setKeywords] = useState([]);

  const isFormValid =
    title?.length > 0 &&
    title?.length <= MAX_LENGTH_TITLE &&
    summary?.length > 0 &&
    summary?.length <= MAX_LENGTH_SUMMARY &&
    keywords?.length > 0 &&
    contentLength >= MIN_LENGTH_CONTENT &&
    contentLength <= MAX_LENGTH_CONTENT;

  const resetForm = useCallback(() => {
    setTitle('');
    setSummary('');
    setKeywords([]);
    setContentLength(0);
    setFeaturedImage(null);
    if (textEditor) {
      textEditor.resetImages();
    }
  }, [textEditor]);

  const onSavePost = () => {
    if (!isFormValid) {
      return;
    }

    const analyticMethod = post ? 'edit' : 'create';
    handleAnalyticEvents && handleAnalyticEvents(analyticMethod);

    const content = textEditor.root.innerHTML;
    const Data = new FormData();

    if (featureImage && typeof featureImage === 'object') {
      Data.append('file', featureImage, featureImage.name);
    }

    Data.append('title', title);
    Data.append('summary', summary);
    Data.append('content', content);
    Data.append('keywords', keywords);

    textEditor.getImagesUrls().forEach(url => {
      Data.append('urls', url);
    });

    textEditor.getImages().forEach(img => {
      Data.append('image', img);
    });

    if (typeof handleSavePost === 'function') {
      handleSavePost(Data);
    }

    resetForm();
  };

  useEffect(() => {
    if (!textEditor) return;

    textEditor.on('text-change', () => {
      const textLength = textEditor.getLength();
      setContentLength(textLength);

      if (textLength > MAX_LENGTH_CONTENT) {
        textEditor.deleteText(MAX_LENGTH_CONTENT - 1, textLength);
      }
    });
  }, [textEditor]);

  useEffect(() => {
    if (textEditor && post) {
      setTitle(post.title);
      setFeaturedImage(post.small_image);
      setSummary(post.summary);
      setKeywords(post.keywords?.map(kw => kw.name));
      textEditor.root.innerHTML = post.content;
    }

    return () => {
      resetForm();
    };
  }, [post, resetForm, textEditor]);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setTextEditor(Editor(node));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTitleChange = text => {
    if (!text.match(NO_FIRST_SPACE_SYMBOL_REGEX)) {
      setTitle(text);
    }
  };

  const onSummaryChange = text => {
    if (!text.match(NO_FIRST_SPACE_SYMBOL_REGEX)) {
      setSummary(text);
    }
  };

  return (
    <BasicModal
      title={!post ? 'Create a blog post' : 'Edit a blog post'}
      isOpen={open}
      handleClose={handleClose}
      footer={
        <Footer
          handleDeletePost={handleDeletePost}
          post={post}
          redoEditorChanges={() => textEditor.history.redo()}
          savePostHandler={onSavePost}
          disabled={!isFormValid}
          undoEditorChanges={() => textEditor.history.undo()}
          secondButton={secondButton}
        />
      }
    >
      <div className={styles.edit_content}>
        <Input
          name="Title"
          label="Title"
          type="text"
          value={title}
          onChange={event => onTitleChange(event.target.value)}
          required
          maxLength={MAX_LENGTH_TITLE}
          errorMessage={title.length === 0 && 'The title is required'}
        />
        <small className={styles.count}>
          {title.length} / {MAX_LENGTH_TITLE}
        </small>

        <Textarea
          name="Summary"
          label="Summary"
          type="text"
          value={summary}
          inputClassName={styles.input}
          labelClassName={styles.label}
          onChange={event => onSummaryChange(event.target.value)}
          required
          maxLength={MAX_LENGTH_SUMMARY}
          helperText={summary?.length === 0 && 'The summary is required'}
        />

        <InputList
          required
          edit
          listItem={Tag}
          input={{
            onChange: keywords => setKeywords(keywords),
            value: keywords,
          }}
          label="Keywords"
        />

        <div className={styles.gallery}>
          <BlogDnd
            setFeaturedImage={setFeaturedImage}
            featureImage={featureImage}
            post={post?.small_image}
          />
        </div>
        <div className={styles.label}>
          <span>Blog</span>
        </div>
        <div className={styles.text_editor}>
          <div className="editor" ref={measuredRef} />
          <p className={styles.help_container}>
            <small className={styles.contentError}>
              {contentLength < MIN_LENGTH_CONTENT &&
                `The content should be ${MIN_LENGTH_CONTENT} symbols or more`}
            </small>
            <small className={styles.count}>
              {contentLength} / {MAX_LENGTH_CONTENT}
            </small>
          </p>
        </div>
      </div>
    </BasicModal>
  );
}

export default BlogPostModal;
