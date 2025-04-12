import * as Button from 'components/shared/button';
import {
  BIOGRAPHY_FIELD,
  MAX_LENGTH_ANSWER,
  MAX_LENGTH_BIOGRAPHY,
  NO_AVAILABLE_INFO,
  PLACE_HOLDER
} from 'constants/components/my-vita';
import { CANNOT_ROTATE_GIF_IMAGE, FAILED_TO_PROCESS_IMAGE } from 'constants/messages';
import { Field, reduxForm, reset} from 'redux-form';
import React, { useCallback, useEffect, useState } from 'react';
import { aside, types } from './artist-about-me.config';
import { checkIsGif, createImage } from 'services/images/imageService';
import { connect, useSelector } from 'react-redux';
import {
  createUserData,
  deleteUserData,
  updateBiography,
} from 'redux/artist/actions/artistProfileActions';
import {
  getInterviewActions,
  getPhotoActions,
  saveInterviewActions,
  setInitialData,
  uploadPhotoActions,
} from 'redux/my-vita/actions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtistAboutMeSkeleton from 'components/skeletons/artist-about-me/artist-about-me-sk';
import { Blockquote } from 'components/shared/blockquote/blockquote';
import EditIcon from 'components/icons/editPencilIcon';
import EducationForm from 'components/reduxForm/my-vita/education-form';
import ExhibitionsForm from 'components/reduxForm/my-vita/exhibitions-form';
import Icons from 'components/icons';
import ImageDropzone from 'components/shared/image-dropzone/image-dropzone';
import PublicationsForm from 'components/reduxForm/my-vita/publications-form';
import Textarea from 'components/reduxForm/textarea/textarea';
import { WARNING } from 'constants/components/message-statuses';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getRotatedImage } from 'services/images/cropService';
import { required } from 'components/reduxForm/validators';
import styles from './artist-about-me.module.scss';

const Analytic = AnalyticHelper.create();

function ListItem(props) {
  const { item, onDelete, canEdit } = props;
  const { from, to, link, info } = item;

  const deleteButton = (
    <button type="button" className={styles.button_small} onClick={onDelete}>
      <Icons.Delete width={12} />
    </button>
  );

  return (
    <li className={styles.list__item}>
      <div className={styles.header}>
        <div className={styles.info}>
          {!to ? `${from} - ${info}` : info}
          <br />
          {link && <span className={styles.years}>{link}</span>}
          {to && <span className={styles.years}>{`${from} - ${to}`}</span>}
        </div>

        {canEdit && deleteButton}
      </div>
    </li>
  );
}

const List = props => {
  const { list = [], canEdit, deleteField, type, creating } = props;

  if (!list.length && !creating) {
    return <div className={styles.list__item}>{NO_AVAILABLE_INFO}</div>;
  }

  return (
    <ul className={styles.list}>
      {list.map(el => (
        <ListItem
          key={el.id}
          item={el}
          onDelete={() => deleteField(type, el.id)}
          canEdit={canEdit}
        />
      ))}
    </ul>
  );
};

const InputControl = ({ type, saveNewField }) => {
  return (
    <div className={styles.input_control}>
      <div className={styles.control}>
        {type === types.education && (
          <EducationForm
            validate={required}
            type={type}
            saveNewField={saveNewField}
          />
        )}
        {type === types.exhibitions && (
          <ExhibitionsForm
            validate={required}
            type={type}
            saveNewField={saveNewField}
          />
        )}
        {type === types.publications && (
          <PublicationsForm
            validate={required}
            type={type}
            saveNewField={saveNewField}
          />
        )}
      </div>
    </div>
  );
};

function ArtistAboutMe({
  actions,
  account,
  canEdit,
  loading,
  photo,
  loadAvatar,
}) {
  const interview = useSelector(store => store.dashboard.about.interview || []);

  const biography = useSelector(store => {
    const { artistBiography: form } = store.form;

    if (form && form.values) {
      return form.values.biography;
    }

    return account.biography;
  });

  const formValues = useSelector(store => {
    const { artistBiography: form } = store.form;

    if (form && form.values) {
      return form.values;
    }
  });

  const [isEditLead, setIsEditLead] = useState(false);
  const [isEditInterview, setIsEditInterview] = useState(false);

  const imageSections = classNames(styles.photo, {
    [styles.photo__unupload]: !photo && !canEdit,
  });

  const [newFields, setNewFields] = useState({
    education: false,
    exhibitions: false,
    publications: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInitialValues = () => {
    if (interview.length) {
      const initialValuesOfAnswers = interview.reduce(
        (acc, it) => ({ ...acc, [it.id]: it.content }),
        {}
      );
      actions.setInitialData(initialValuesOfAnswers);
    }
  };

  const uploadPhoto = photo => {
    actions.uploadPhotoActions(account.profile_id, photo);
  };

  const handleRotate = async angle => {
    try {
      if (checkIsGif(photo))
        return actions.displayMessage(CANNOT_ROTATE_GIF_IMAGE, WARNING);

      const image = await createImage(photo);
      const rotatedImageSource = await getRotatedImage(image, angle);

      actions.uploadPhotoActions(account.profile_id, rotatedImageSource);
    } catch {
      actions.displayMessage(FAILED_TO_PROCESS_IMAGE, WARNING);
    }
  };

  useEffect(() => {
    Analytic.createEvent('PageView');
  }, []);

  useEffect(() => {
    if (account.profile_id) {
      actions.getInterviewActions(account.profile_id);
    }
  }, [actions, account.profile_id]);

  useEffect(() => {
    if (account.profile_id) {
      actions.getPhotoActions(account.profile_id);
    }
  }, [actions, account.profile_id]);

  useEffect(() => {
    getInitialValues();
  }, [actions, getInitialValues, interview]);

  const saveBiography = useCallback(() => {
    Analytic.createEvent('ArtistBiographyWasEdited');
    actions.updateBiography(account.profile_id, account, biography);
    setIsEditLead(false);
  }, [biography, actions, account]);

  const saveInterview = useCallback(() => {
    actions.saveInterviewActions(account.profile_id, formValues);
    setIsEditInterview(false);
  }, [actions, account, formValues]);

  const addNewField = type => {
    setNewFields({ ...newFields, [type]: !newFields[type] })
    actions.reset(type);
  };

  const saveNewField = (type, form) => {
    const analyticEvents = {
      education: 'EducationWasAdded',
      exhibitions: 'ExhibitionsWasAdded',
      publications: 'PublicationsWasAdded',
    };
    actions.createUserData(account.profile_id, type, form, account);
    Analytic.createEvent(analyticEvents[type]);
    setNewFields({ ...newFields, [type]: false });
  };

  const deleteField = (type, field_id) => {
    const analyticEvents = {
      education: 'EducationWasDeleted',
      exhibitions: 'ExhibitionsWasDeleted',
      publications: 'PublicationsWasDeleted',
    };
    actions.deleteUserData(type, field_id, account);
    Analytic.createEvent(analyticEvents[type]);
  };

  if (loading) {
    return <ArtistAboutMeSkeleton />;
  }

  const actionButton = (isEdit, onEdit, onSave) => {
    if (isEdit) {
      return (
        <Button.Primary className={styles.editButton} xs onClick={onSave}>
          Save
        </Button.Primary>
      );
    }

    return (
      <Button.Secondary
        className={styles.editButton}
        xs
        icon={<EditIcon className={styles.editButtonIcon} />}
        onClick={onEdit}
      >
        Edit
      </Button.Secondary>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        {loadAvatar && (
          <div className={imageSections}>
            <ImageDropzone
              src={photo}
              canEdit={canEdit}
              onRotate={handleRotate}
              onChange={uploadPhoto}
            />
          </div>
        )}
        {aside.map(({ key, label }) => {
          return (
            <div className={styles.group} key={key}>
              <div className={`${styles.header}`}>
                <h4 className={styles.title}>{label}</h4>
                {canEdit && (
                  <button type="button" onClick={() => addNewField(key)}>
                    <Icons.AddCircle />
                  </button>
                )}
              </div>
              {newFields[key] && (
                <InputControl type={key} saveNewField={saveNewField} />
              )}
              <List
                list={account[key]}
                canEdit={canEdit}
                type={key}
                deleteField={deleteField}
                creating={newFields[key]}
              />
            </div>
          );
        })}
      </div>

      <div>
        <div className={styles.biography}>
          <div className={styles.groupHeader}>
            <h4 className={styles.biographyTitle}>Read more about me</h4>
            {canEdit &&
              actionButton(
                isEditLead,
                () => setIsEditLead(true),
                () => saveBiography()
              )}
          </div>

          {isEditLead && (
            <Field
              name={BIOGRAPHY_FIELD}
              rows="4"
              component={Textarea}
              maxLength={MAX_LENGTH_BIOGRAPHY}
              placeholder={PLACE_HOLDER}
            />
          )}

          {!isEditLead && <p className={styles.content}>{biography}</p>}
        </div>

        {Boolean(interview.length) && (
          <>
            <div className={styles.groupHeader}>
              <h5 className={styles.groupTitle}>Interview</h5>
              {canEdit &&
                actionButton(
                  isEditInterview,
                  () => setIsEditInterview(true),
                  () => saveInterview()
                )}
            </div>

            {interview.map(({ id, title, content, quote }, index) => {
              const field = (
                <Field
                  name={id}
                  rows="2"
                  component={Textarea}
                  maxLength={MAX_LENGTH_ANSWER}
                  placeholder={PLACE_HOLDER}
                />
              );

              if (quote) {
                return (
                  <Blockquote
                    className={styles.blockquote}
                    key={index}
                    quote={quote}
                    content={content}
                    isEdit={isEditInterview}
                    formField={field}
                  >
                    {content}
                  </Blockquote>
                );
              }
              return (
                <div className={styles.question} key={index}>
                  <h6 className={styles.subtitle}>{title}</h6>
                  {isEditInterview ? (
                    field
                  ) : (
                    <p className={styles.content}>{content}</p>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  const { loading, account } = store.artist.currentArtist;
  const { artistBiography: form } = store.form;
  const initialData = store.dashboard.about.initialData;

  function setInitialValues() {
    if (form) {
      return {
        biography: account.biography,
        ...initialData,
      };
    }
  }

  return {
    loading,
    account,
    photo: store.dashboard.about.photo,
    loadAvatar: store.dashboard.about.loadAvatar,
    initialValues: setInitialValues(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        createUserData,
        updateBiography,
        deleteUserData,
        getInterviewActions,
        setInitialData,
        saveInterviewActions,
        uploadPhotoActions,
        getPhotoActions,
        displayMessage,
        reset,
      },
      dispatch
    ),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'artistBiography' })(ArtistAboutMe));
