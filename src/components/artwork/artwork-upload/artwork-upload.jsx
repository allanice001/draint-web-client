import React, { useEffect, useState } from 'react';
import {
  any,
  arrayOf,
  bool,
  func,
  number,
  objectOf,
  shape,
  string,
} from 'prop-types';
import {
  checkRequiredInfoForSaleUpload,
  getAllArtworkProperties,
  saveMultipleArtworks,
} from 'redux/artwork/actions/artworkActions';
import { getFormValues, reduxForm } from 'redux-form';
import {
  onNextDisabled,
  submitArtworkUpload,
} from 'services/artwork-upload-service';
import { useHistory, withRouter } from 'react-router';

import { ARTWORK_UPLOAD_FORM } from 'constants/components/forms';
import MasterConfirmationModal from './components/master-confirmation-modal';
import MobileStepper from '@material-ui/core/MobileStepper';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import ProgressBar from 'components/progressBar/progress-bar';
import RequiredSaleInfoModal from './components/required-sale-info-modal/required-sale-info-modal';
import StepOne from './components/upload-step-one';
import StepTwo from './components/upload-step-two';
import { bindActionCreators } from 'redux';
import checkArtworkDimensions from 'redux/artwork/thunks/check-artwork-dimensions';
import checkIsArtworkCanUpload from 'redux/artwork/thunks/check-is-artwork-can-upload';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getArtistAccount } from 'redux/artist/actions/artistProfileActions';
import { pageScroll } from 'services/pageScroller';
import { setArtworkUploading } from 'redux/user/loader/actions/setLoading';
import styles from './artwork-upload.module.scss';

const imagesData = new Set();

function ArtworkUpload({
  actions,
  handleSubmit,
  artworkData,
  user,
  valid,
  dispatch,
  formValues,
  isArtworkUploading,
  artist,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [nextDisabled, setNextDisable] = useState(false);
  const [images, setImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [openMasterDialog, setOpenMasterModal] = useState(false);
  const history = useHistory();
  const { planId } = user.account;

  useEffect(() => {
    if (!Boolean(Object.keys(artist.account).length)) {
      const url = window.location.pathname;
      const search = url.slice(url.indexOf('upload'));
      const result = search.split('/');
      const userName = result[result.length - 1];
      dispatch(getArtistAccount(userName));
    }
  }, [dispatch, artist.account]);

  const { profile_id: profilerId } = artist.account;

  useEffect(() => {
    if (user?.account.id) {
      actions.checkIsArtworkCanUpload(history);
    }
  }, [actions, history, user?.account.id]);

  useEffect(() => {
    actions.getAllArtworkProperties();
  }, [actions]);

  useEffect(() => {
    if (formValues?.for_sale === true) {
      actions.checkRequiredInfoForSaleUpload();
    }
  }, [actions, formValues]);

  useEffect(() => {
    pageScroll();
  }, []);

  useEffect(() => {
    const disabled = onNextDisabled(
      activeStep,
      valid,
      images,
      user.account.permission,
      isArtworkUploading
    );
    setNextDisable(disabled);
  }, [
    activeStep,
    valid,
    images,
    setNextDisable,
    user.account.permission,
    isArtworkUploading,
  ]);

  const handleCloseMasterModal = () => {
    setOpenMasterModal(false);
  };

  const handleModalConfirm = () => {
    if (actions.checkArtworkDimensions(true)) {
      return;
    }

    const values = formValues || {};
    values.hashtags = hashtags?.map(el => el.name) || [];
    handleCloseMasterModal();

    dispatch(setArtworkUploading(true));

    submitArtworkUpload(values, dispatch, history, imagesData, profilerId);
  };

  const onNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
      pageScroll();
    }

    if (activeStep === 1) {
      if (!valid && user.account.permission === 'master') {
        return setOpenMasterModal(true);
      }

      return handleModalConfirm();
    }
  };

  const onBack = () => {
    if (activeStep === 0) return history.push(PROFILE_GALLERY);

    return setActiveStep(activeStep - 1);
  };

  const { artworkLoader, uploadCount } = user.loader;

  return (
    <>
      {artworkLoader && <ProgressBar progress={uploadCount} />}

      <MasterConfirmationModal
        handleClose={handleCloseMasterModal}
        handleConfirm={handleModalConfirm}
        open={openMasterDialog}
      />

      <RequiredSaleInfoModal />

      <section>
        <div className="container">
          <h2 className={cx('group-title', styles.page__title)}>
            Publish one Painting only
          </h2>

          <form
            id="upload_form"
            onKeyPress={e => (e.key === 'Enter' ? e.preventDefault() : null)}
            onSubmit={handleSubmit}
          >
            {activeStep === 0 && (
              <StepOne
                images={images}
                onImagesChange={data => {
                  imagesData.clear();
                  data.forEach(image => imagesData.add(image));
                  setImages(data);
                }}
              />
            )}
            {activeStep === 1 && (
              <StepTwo
                artworkData={artworkData}
                planId={planId}
                hashtags={hashtags}
                images={images}
                onEdit={onBack}
                setHashtags={setHashtags}
              />
            )}
          </form>
        </div>

        <div className={styles.stepper__wrapper}>
          <div className={styles.stepper}>
            <MobileStepper
              activeStep={activeStep}
              backButton={
                <button
                  className={cx('secondary-button', styles.button)}
                  onClick={() => onBack()}
                  type="button"
                >
                  {activeStep === 0 ? 'Cancel' : 'Back'}
                </button>
              }
              classes={{
                root: cx('container', styles.root),
                dot: styles.dot,
                dotActive: styles.dot__active,
              }}
              nextButton={
                <button
                  className={cx('primary-button', styles.button)}
                  disabled={nextDisabled}
                  form="upload_form"
                  onClick={() => onNext()}
                  type="button"
                >
                  {activeStep === 0 ? 'Next' : 'Publish'}
                </button>
              }
              position="static"
              steps={2}
              variant="dots"
            />
          </div>
          <div className={styles.stepper__shadow} />
        </div>
      </section>
    </>
  );
}

ArtworkUpload.propTypes = {
  actions: objectOf(func).isRequired,
  artworkData: shape({
    loading: bool,
    inCart: bool,
    inOrder: bool,
    inOffer: bool,
    editModes: bool,
    profile_id: string,
    hashtag: string,
    hashtags: arrayOf(string),
    stylesList: arrayOf(objectOf(any)),
    mediumsList: arrayOf(objectOf(any)),
    surfacesList: arrayOf(objectOf(any)),
    gallerySteps: arrayOf(objectOf(any)),
    currentArtwork: objectOf([
      string,
      number,
      bool,
      arrayOf(any),
      objectOf(any),
    ]),
  }).isRequired,
  dispatch: func.isRequired,
  formValues: objectOf([string, number, arrayOf(any)]).isRequired,
  handleSubmit: func.isRequired,
  isArtworkUploading: bool.isRequired,
  user: objectOf(objectOf(any)).isRequired,
  valid: bool.isRequired,
};

function mapStateToProps(state) {
  if (state) {
    return {
      artworkData: state.artwork.artworkData,
      user: state.user,
      artist: state.artist.currentArtist,
      isArtworkUploading: state.user.loader.artworkLoader,
      formValues: getFormValues(ARTWORK_UPLOAD_FORM)(state),
    };
  }
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAllArtworkProperties,
        saveMultipleArtworks,
        checkRequiredInfoForSaleUpload,
        checkArtworkDimensions,
        checkIsArtworkCanUpload,
      },
      dispatch
    ),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: ARTWORK_UPLOAD_FORM,
      touchOnBlur: true,
      initialValues: {
        completed: new Date().toUTCString(),
      },
    })(ArtworkUpload)
  )
);
