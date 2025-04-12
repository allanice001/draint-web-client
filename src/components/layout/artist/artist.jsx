import {
  ARTIST_NOT_FOUND,
  CANNOT_ROTATE_GIF_IMAGE,
  FAILED_TO_PROCESS_IMAGE,
} from 'constants/messages';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SUBSCRIBED_TO_NEWSLETTER,
  SUBSCRIBE_BUTTON_STYLE,
  SUBSCRIBE_TO_NEWSLETTER,
} from 'constants/components/subscribed-artist';
import {
  checkIsGif,
  createImage,
  createImageFile,
  getBase64FromFile,
} from 'services/images/imageService';
import {
  getArtistAccount,
  isEmptyOrSpaces,
  updateArtistAccount,
  uploadArtistAvatar,
} from 'redux/artist/actions/artistProfileActions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtistCardDownloadModal from 'components/basic-modal/artist-card-download-modal';
import { ArtistPageTabs } from './artist-tabs';
import ArtistProfileInfoSkeleton from 'components/skeletons/artist-profile-info/artist-profile-info-sk';
import { ButtonRounded } from 'components/button-rounded/button-rounded';
import CountryRoundedFlag from 'components/artist/artist-country-flag/artist-country-flag';
import { DELETED } from 'constants/components/master/artists';
import Helmet from 'components/helmet';
import Icons from 'components/icons';
import { Loader } from 'components/loader/loader';
import { MAX_NAME_LENGTH } from 'constants/global';
import { NEWSLETTER_SWITCH_ROLE_MODAL } from 'constants/components/modals';
import ProfileLink from 'components/widgets/profileLink/profileLink';
import RatingIcon from 'components/artist/artist-masters-card/rating-icon';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import SubscribeNewsletterModal from 'components/basic-modal/subscription-modal/subscribe_newsletter_modal';
import SwitchRoleModal from 'components/basic-modal/switch-role-modal/switch-role-modal';
import Textarea from 'components/reduxForm/textarea/textarea';
import { Types } from 'constants/permissions';
import UploadPreview from './profile-image-upload-preview';
import { VERIFIED } from 'constants/statuses';
import VerificationButtons from 'components/verification-buttons/verification-buttons';
import { WARNING } from 'constants/components/message-statuses';
import WelcomeModal from 'components/basic-modal/welcome-modal';
import { bindActionCreators } from 'redux';
import checkAvatar from 'redux/artwork/thunks/check-avatar';
import { checkSubscription } from 'helpers/checkSubscription';
import { connect } from 'react-redux';
import cx from 'classnames';
import { deleteEmailAndPhone } from 'helpers/artist/delete-email-and-phone';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getFullName } from 'services/global';
import { getRotatedImage } from 'services/images/cropService';
import { imageSizes } from 'constants/media-query/image-sizes';
import { pageScroll } from 'services/pageScroller';
import { roles } from 'helpers/get-role';
import { setSwitchRoleModal } from 'redux/artwork/actions/artworkActions';
import staticUrls from 'constants/images/static-urls';
import styles from './artist.module.scss';
import { useRouteMatch } from 'react-router';
import useWelcomeModal from 'hooks/use-welcome-modal/use-welcome-modal';
const Analytic = AnalyticHelper.create();

const SkeletonArtistPage = () => {
  return (
    <section className={styles.wrapper}>
      <div className={cx('container', styles.container)}>
        <ArtistProfileInfoSkeleton />
      </div>
    </section>
  );
};

const ArtistLayout = ({
  user,
  actions,
  artist,
  loading,
  welcomeModal,
  subscriptions,
}) => {
  const {
    first_name,
    last_name,
    avatar,
    theme,
    isUsername,
    instagram,
    description,
    isArtist,
    profile_id,
    artistVerification,
    id,
    country,
    city,
    rating,
  } = artist || {};
  const { params } = useRouteMatch();

  useWelcomeModal();
  const [clicked, setClicked] = useState(false);
  const [positionX, setPositionX] = useState(null);
  const [focus, setFocus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRotate, setRotate] = useState(false);
  const [form, setForm] = useState({});
  const [uploadedImage, setUploadedImage] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [orderRating, setOrderRating] = useState();
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);
  const [isSubscriptionModal, setSubscriptionModal] = useState(false);
  const [isSwitchRoleModal, setSwitchRoleModal] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);

  const {
    isSuperAdmin,
    isSubAdmin,
    isAdmin,
    isEditor,
    canEditArtistArtwork,
    isEditorOrAdmin,
  } = roles({
    permission: user.permission,
    new_permission: user.new_permission,
    urls: user.urls,
  });

  const username = params.username || user.username;
  const isOwner = user.token && user.username === username;
  const isMaster = user.token && isSuperAdmin;
  const canEditRole = isSuperAdmin || (isEditorOrAdmin && canEditArtistArtwork);
  const isAdminRole = isAdmin && canEditArtistArtwork;
  const isEditorRole = isEditor && canEditArtistArtwork;
  const canEditName = isMaster || isAdminRole;
  const checkPermission = isOwner && !user.permissions?.hasAccess(Types.Blog);

  const canEdit = (isOwner || canEditRole) && !!isArtist;
  const downloadDisabled = isEdit || !(theme || avatar);
  const artistName = artist
    ? getFullName(first_name, last_name, username, isUsername)
    : ARTIST_NOT_FOUND;

  useEffect(() => {
    setSubscribed(checkSubscription(subscriptions, artist.profile_id));
  }, [artist.profile_id, isSubscribed, subscriptions]);

  useEffect(() => {
    if (username) {
      pageScroll();
      actions.getArtistAccount(username);
    }
  }, [username, actions]);

  useEffect(() => {
    const updatedProfileImage = uploadedImage || avatar || theme;

    if (profileImage !== updatedProfileImage)
      setProfileImage(updatedProfileImage);
  }, [profileImage, uploadedImage, avatar, theme]);

  useEffect(() => {
    setForm({
      instagram: instagram || '',
      first_name: first_name || '',
      last_name: last_name || '',
      description: description || '',
    });
  }, [instagram, first_name, last_name, description]);

  const uploadAvatar = useCallback(() => {
    actions.uploadArtistAvatar(
      createImageFile(uploadedImage),
      artist,
      isOwner,
      isRotate,
      isMaster,
      isEditorRole
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage, artist, isOwner, isRotate, isMaster, isEditorRole]);

  useEffect(() => {
    if (welcomeModal && user.saw_after_sign_up === null && user.is_activated) {
      Analytic.createEvent('Test');
      Analytic.createEvent('CompletedSignup');
    }
  }, [user.saw_after_sign_up, user.is_activated, welcomeModal]);

  useEffect(() => {
    if (uploadedImage) uploadAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage]);

  useEffect(() => {
    if (user.loading) window.scrollTo(0, 0);
  }, [user.loading]);

  const updateForm = (value, field) => {
    const data = actions.isEmptyOrSpaces(value);
    setForm({ ...form, [field]: data });
  };

  const updateAccount = useCallback(() => {
    actions.updateArtistAccount(
      {
        ...artist,
        ...form,
        description: deleteEmailAndPhone(form.description),
        rating: orderRating,
      },
      artist.id,
      artist
    );
    setIsEdit(false);
  }, [actions, artist, form, orderRating]);

  useEffect(() => {
    if (orderRating) {
      updateAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderRating]);

  const setPositionXMouseDown = e => {
    setPositionX(e.clientX);
  };

  const setIsClicked = e => {
    setClicked(e.clientX === positionX);
  };

  const updateProfileInfo = (prevText, currentText) => {
    if (prevText !== currentText) {
      updateAccount();
      Analytic.createEvent('DescriptionChanged');
    }
    setFocus(false);
    setIsEdit(false);
  };

  const handleRotate = async angle => {
    try {
      setIsProfileImageLoading(true);

      const sourceProfileImage = uploadedImage || theme;

      if (checkIsGif(sourceProfileImage)) {
        return actions.displayMessage(CANNOT_ROTATE_GIF_IMAGE, WARNING);
      }

      const image = await createImage(sourceProfileImage);
      const rotatedImageSource = await getRotatedImage(image, angle);

      setRotate(true);
      setUploadedImage(rotatedImageSource);
    } catch {
      actions.displayMessage(FAILED_TO_PROCESS_IMAGE, WARNING);
    } finally {
      setIsProfileImageLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (user?.is_artist) {
      setSwitchRoleModal(true);
    } else {
      setSubscriptionModal(true);
    }
  };

  const handlePreviewUpload = file => {
    setIsProfileImageLoading(true);
    setRotate(false);

    getBase64FromFile(file)
      .then(base64 => setUploadedImage(base64))
      .finally(() => setIsProfileImageLoading(false));
  };

  if (loading) {
    return <SkeletonArtistPage />;
  }

  if (artistVerification === DELETED) {
    return (
      <section
        className={`container d-flex j-center a-center ${styles.wrapper}`}
      >
        <h2>Sorry, this user has been deleted.</h2>
      </section>
    );
  }

  if (!isSubAdmin && artist && artistVerification !== VERIFIED && !canEdit) {
    return (
      <section
        className={`container d-flex j-center a-center ${styles.wrapper}`}
      >
        <h2>Sorry, this user not found</h2>
      </section>
    );
  }

  if (user.loading) return <Spinner full />;

  return (
    <>
      <Helmet
        title={artistName}
        description="We accompany artists through the digital age. With our profiles we become the single
            place for artists to show up online. Manage your social media appearance and sell your work with us."
        keywords="find artists, find art, find artworks, find paintings, search art, search artists"
      />

      <WelcomeModal />

      <SubscribeNewsletterModal
        isOpen={isSubscriptionModal}
        setOpenModal={setSubscriptionModal}
        artistName={artistName}
        artistId={profile_id}
      />

      <SwitchRoleModal
        isOpen={isSwitchRoleModal}
        setOpenModal={setSwitchRoleModal}
        text={NEWSLETTER_SWITCH_ROLE_MODAL.content}
      />

      <ArtistCardDownloadModal
        id={id}
        open={open}
        handleClose={() => setOpen(false)}
      />

      <section className={styles.wrapper}>
        <div className={cx('container', styles.container)}>
          {/*Artist Header*/}

          <div className={styles.row}>
            <div
              className={cx(styles.image__wrapper, { [styles.edit]: isEdit })}
            >
              {isProfileImageLoading && <Loader />}
              <img
                alt="" // keep this alt empty
                className={styles.image}
                srcSet={profileImage || staticUrls.image.defaultArtist}
                sizes={imageSizes.MD}
                title={artistName}
              />

              {canEdit && (
                <UploadPreview
                  handleRotate={handleRotate}
                  checkImage={actions.checkAvatar}
                  artistId={id}
                  className={styles.image__upload}
                  profileId={profile_id}
                  src={profileImage}
                  uploadImage={handlePreviewUpload}
                />
              )}
            </div>
            <div className={styles.content}>
              <div
                className={cx(styles.title, {
                  [styles.titleEdit]: isEdit,
                })}
              >
                {!isEdit ? (
                  <>
                    <h1
                      onBlur={() => {
                        setIsEdit(false);
                        setFocus(false);
                      }}
                      onMouseDown={setPositionXMouseDown}
                      onMouseUp={setIsClicked}
                      onClick={() => {
                        if (canEditName && clicked) {
                          setIsEdit(true);
                          setFocus(true);
                        }
                      }}
                    >
                      {artistName}
                    </h1>

                    {country && (
                      <CountryRoundedFlag
                        className={cx(styles.country, styles.mobile)}
                        country={country}
                        showCountryIso
                      />
                    )}
                  </>
                ) : (
                  <>
                    {isMaster && (
                      <input
                        className={styles.text__input}
                        onBlur={values =>
                          updateProfileInfo(instagram, form.instagram, values)
                        }
                        onChange={e => {
                          updateForm(e.target.value, 'instagram');
                        }}
                        placeholder="instagram link"
                        type="text"
                        value={form.instagram}
                      />
                    )}
                    <input
                      className={cx(styles.text__input, {
                        [styles.in__focus]: focus,
                      })}
                      maxLength={MAX_NAME_LENGTH}
                      onBlur={values =>
                        updateProfileInfo(first_name, form.first_name, values)
                      }
                      onChange={e => {
                        updateForm(e.target.value, 'first_name');
                      }}
                      onFocus={() => {
                        setFocus(true);
                      }}
                      placeholder="First Name"
                      type="text"
                      value={form.first_name && form.first_name}
                    />
                    <input
                      className={cx(styles.text__input, {
                        [styles.in__focus]: focus,
                      })}
                      maxLength={MAX_NAME_LENGTH}
                      onBlur={values =>
                        updateProfileInfo(last_name, form.last_name, values)
                      }
                      onChange={e => {
                        updateForm(e.target.value, 'last_name');
                      }}
                      onFocus={() => setFocus(true)}
                      placeholder="Last Name"
                      type="text"
                      value={form.last_name && form.last_name}
                    />
                  </>
                )}
              </div>
              <div className={styles.description}>
                {canEdit ? (
                  <Textarea
                    className={cx(styles.textarea__resize, {
                      [styles.textarea__focus]: !focus,
                    })}
                    maxLength={100}
                    rows={5}
                    onBlur={values =>
                      updateProfileInfo(description, form.description, values)
                    }
                    onChange={e => updateForm(e.target.value, 'description')}
                    onFocus={() => setFocus(true)}
                    placeholder="Write a welcome message to your audience"
                    split
                    value={form.description}
                  />
                ) : (
                  <div>{description}</div>
                )}
              </div>

              {country && (
                <CountryRoundedFlag
                  className={cx(styles.country, styles.desktop)}
                  country={country}
                  city={city}
                />
              )}

              {!isOwner && (
                <div className={styles.button_wrap}>
                  <ButtonRounded
                    classname={SUBSCRIBE_BUTTON_STYLE}
                    disabled={isSubscribed}
                    onClick={handleOpenModal}
                    text={
                      isSubscribed
                        ? SUBSCRIBED_TO_NEWSLETTER
                        : SUBSCRIBE_TO_NEWSLETTER
                    }
                  />
                </div>
              )}

              {canEditRole && (
                <div className={styles.verification_buttons}>
                  <VerificationButtons artist={true} />
                  <div className={styles.rating_wrapper}>
                    <RatingIcon
                      rating={rating}
                      Icon={props => <Icons.IconStar {...props} />}
                      setOrderRating={setOrderRating}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {artist && (
            <>
              <ArtistPageTabs
                hasPermission={checkPermission}
                username={username}
                canEdit={canEdit}
                isMaster={canEditRole}
                isOwner={isOwner}
                downloadDisabled={downloadDisabled}
                onDownload={() => setOpen(true)}
              />

              <div>{!loading ? user.token ? <ProfileLink /> : null : null}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

function mapStateToProps({ user, artist, notification, dashboard }) {
  const loading = user.query.fetching || artist.currentArtist.loading;

  return {
    subscriptions: dashboard.gallery.artistSubscribedFull,
    user: user.account,
    artist: artist.currentArtist.account,
    welcomeModal: notification.welcomeModal,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getArtistAccount,
        uploadArtistAvatar,
        updateArtistAccount,
        displayMessage,
        checkAvatar,
        isEmptyOrSpaces,
        setSwitchRoleModal,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistLayout);
