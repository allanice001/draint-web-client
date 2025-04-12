import React, { useCallback, useEffect, useState } from 'react';
import { b64toBlob, splitBase64File } from 'services/images/imageService';
import {
  deleteWrappedPhoto,
  saveWrappedPhoto,
} from 'redux/dashboard/actions/ordersActions';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { DNDUploader } from './wrapped-steps-layouts/expanded-panel-components/d-n-d-uploader';
import { IMAGE_SIZE_5 } from 'constants/components/image-upload';
import { SummaryComponent as Summary } from './wrapped-steps-layouts/expanded-panel-components/summary';
import checkImage from 'redux/artwork/thunks/check-image';
import { readFiles } from 'services/fileServices';
import styles from './wrapped-steps.module.scss';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';

function WrappedSteps({
  step,
  order,
  profileId,
  setCurrentSteps,
  orderPagination,
}) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [uploaded, setUploaded] = useState(step.uploaded);

  useEffect(() => {
    setPhoto(step.photo);
  }, [step]);

  useEffect(() => {
    setUploaded(step.uploaded);
  }, [step.uploaded]);

  const onDrop = useCallback(
    async acceptedFiles => {
      const checkedPhoto = dispatch(checkImage(acceptedFiles, IMAGE_SIZE_5));
      const readePhoto = await readFiles(checkedPhoto?.slice(0));
      const result = readePhoto.map(value => ({
        id: null,
        name: checkedPhoto[0].name || 'photo',
        size: checkedPhoto[0].size || undefined,
        imgPath: value,
      }));
      setPhoto(result.length ? result : undefined);
      step.photo = result.length ? result : undefined;
      setCurrentSteps();
    },
    [step, setCurrentSteps, dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handleDeletePhoto() {
    setPhoto(undefined);
    step.photo = undefined;
    setUploaded((step.uploaded = false));
    step.status = '';
    step.name = null;
    step.status = null;
    dispatch(deleteWrappedPhoto(step, order, orderPagination));
    setCurrentSteps();
  }

  const handleSavePhoto = useCallback(
    photo => {
      const file = photo.map((el, i) => {
        const { realData, contentType } = splitBase64File(el.imgPath);
        const blob = b64toBlob(realData, contentType);
        return new File([blob], i, {
          type: contentType,
          lastModified: Date.now(),
        });
      });

      const stepData = {
        id: step.id,
        number: step.number,
        orderId: order.id,
        artworkId: order.artwork.id,
        profileId,
        photoSize: photo[0].size,
        photoName: photo[0].name,
      };

      dispatch(saveWrappedPhoto(stepData, file));
      return setUploaded(true);
    },
    [dispatch, order, profileId, step]
  );

  useEffect(() => {
    if (Array.isArray(photo)) {
      if (photo.length && !uploaded) {
        handleSavePhoto(photo);
      }
    }
  }, [uploaded, photo, handleSavePhoto]);

  function handleExpanded(panel) {
    setExpanded(panel === step.title && !expanded);
  }

  return (
    <Accordion
      className={styles.MuiPaper_elevation}
      classes={{
        root: styles.panel,
      }}
      expanded={expanded}
    >
      <Summary
        expanded={expanded}
        uploaded={uploaded}
        stepNumber={step.number}
        status={step.status}
        title={step.title}
        photo={photo}
        handleExpanded={() => handleExpanded(step.title)}
      />
      {expanded && (
        <div className={styles.wrapper}>
          <div className={styles.description}>{step.description}</div>
          <div className={styles.animation_wrapper}>
            <img alt="" className={styles.animation} src={step.gifUrl} />
          </div>
        </div>
      )}
      <AccordionDetails
        classes={{
          root: styles.expanded_details,
        }}
      >
        <DNDUploader
          uploaded={uploaded}
          photo={photo}
          status={step.status}
          handleDeletePhoto={handleDeletePhoto}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          step={step}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default WrappedSteps;
