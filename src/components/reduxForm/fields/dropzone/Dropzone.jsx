import { FIVE_MB, UPLOAD_FILES_LIMIT } from 'constants/dropzone';

import DropzoneIcon from 'components/icons/dropzone';
import React from 'react';
import { ThumbPreview } from './ThumbPreview';
import styles from './Dropzone.module.scss';
import { useDropzone } from 'react-dropzone';

export const Dropzone = ({ selectedFiles, setSelectedFiles }) => {
  const onDrop = acceptedFiles => {
    if (selectedFiles.length + acceptedFiles.length <= UPLOAD_FILES_LIMIT) {
      setSelectedFiles(
        selectedFiles.concat(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: UPLOAD_FILES_LIMIT,
    maxSize: FIVE_MB,
    onDrop,
  });

  const handleRemoveFile = path => {
    setSelectedFiles(selectedFiles.filter(file => file.path !== path));
  };

  return (
    <section className={styles.container}>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <DropzoneIcon />
        <h2
          className={styles.title}
        >{`Upload up to ${UPLOAD_FILES_LIMIT} photos here`}</h2>
        <p className={styles.subtitle}>
          or <span className={styles.highlight}>browse</span> to choose a file
        </p>
        <p className={styles.description}>
          Supported file types: JPEG, PNG.
          <br />
          File size up to 5MB
        </p>
      </div>
      {!!selectedFiles.length && (
        <>
          <p className={styles.resultTitle}>Uploaded artworks</p>
          <aside className={styles.thumbsContainer}>
            {selectedFiles.map(file => (
              <ThumbPreview handleRemoveFile={handleRemoveFile} file={file} />
            ))}
          </aside>
        </>
      )}
    </section>
  );
};
