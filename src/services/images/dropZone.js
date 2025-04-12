import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MyDropzone(props) {
  const { className, children, onDrop: onDropHandler, accept, canEdit } = props;

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          // Do whatever you want with the file contents
          const dataUrl = reader.result;
          onDropHandler(dataUrl);
        };
        reader.readAsDataURL(file);
      });
    },
    [onDropHandler]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

  return (
    <div className={className} {...getRootProps()}>
      {children}
      {canEdit && <input {...getInputProps()} />}
    </div>
  );
}
