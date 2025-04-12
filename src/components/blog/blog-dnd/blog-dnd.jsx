import React, { useCallback, useEffect, useState } from 'react';
import { IMAGE_SIZE_8 } from 'constants/components/image-upload';
import { Image } from 'components/lib';
import { PreviewMessage } from './preview-message';
import checkImage from 'redux/artwork/thunks/check-image';
import cx from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import { readFiles } from 'services/fileServices';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-dnd.module.scss';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';

export function BlogDnd({ setFeaturedImage, featureImage, post, staticUrl }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [blob, setBlob] = useState('');
  const onDrop = useCallback(
    async acceptedFiles => {
      const checkedImage = dispatch(checkImage(acceptedFiles, IMAGE_SIZE_8));
      const createdFile = await readFiles(checkedImage);
      setBlob(createdFile.length ? createdFile : '');
      setFeaturedImage(checkedImage.length ? checkedImage[0] : null);
    },
    [dispatch, setFeaturedImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (post && featureImage) {
      setImage([featureImage]);
    }

    if (blob) {
      setImage(blob.length ? blob : []);
    }

    if (post && !blob) {
      setImage([staticUrl ? encodeURI(post) : post]);
    }
  }, [post, featureImage, blob, staticUrl]);

  return (
    <div
      {...getRootProps()}
      className={cx(styles.dnd_wrapper, {
        [styles.dnd_wrapper_drag_file]: !!!image.length,
      })}
    >
      <input {...getInputProps()} />
      <div
        className={cx(styles.preview_wrapper, {
          [styles.preview_wrapper_drag_file]: !!!image.length,
        })}
      >
        <Image
          srcSet={image[0]}
          sizes={imageSizes.ADAPTIVE}
          className={cx(styles.preview, {
            [styles.preview_disabled]: !!!image.length,
          })}
          defaultSrc={staticUrls.image.defaultPost}
        />
        <PreviewMessage image={image} />
      </div>
    </div>
  );
}
