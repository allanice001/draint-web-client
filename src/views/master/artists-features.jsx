import { List, Record } from 'components/shared/list';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  createFeaturesCard,
  deleteFeaturesCard,
  getFeaturesCards,
  updateFeaturesCard,
} from 'redux/master/actions/featuresCardsActions';
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
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import ArtistFeaturesForm from './artist-features-form';
import { ArtistsExperienceCard } from 'components/artists-experience/artists-experience';
import DefaultModal from 'components/basic-modal/basic-modal';
import { MODAL_FEATURE_CONTENT } from 'constants/components/feature-page';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { bindActionCreators } from 'redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { required } from 'components/reduxForm/validators';
import { roles } from 'helpers/get-role';
import styles from './artists-features.module.scss';

const EditModal = ({ open, setOpen, current, handleCreate, handleUpdate }) => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
  });

  const resetFields = () => {
    setForm({
      name: '',
      title: '',
      description: '',
    });
  };

  useEffect(() => {
    if (current) {
      const { username, title, description } = current;
      setForm({
        name: username,
        title: title,
        description: description,
      });
    } else {
      resetFields();
    }
  }, [current]);

  return (
    <DefaultModal
      maxWidth="xs"
      isOpen={open}
      title={`Artists Features ${current ? 'Update' : 'Create'} Mode`}
      handleClose={() => {
        setOpen(false);
      }}
    >
      <ArtistFeaturesForm
        initialValues={form}
        handleUpdate={handleUpdate}
        current={current}
        handleCreate={handleCreate}
        validate={required}
      />
    </DefaultModal>
  );
};

const MasterArtistsFeatures = () => {
  const [current, setCurrent] = useState(null);
  const [editMode, setEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [cardId, setCardId] = useState(null);
  const [isDialogModal, setDialogModal] = useState(false);

  const dispatch = useDispatch();

  const { loading, cards, pagination } = useSelector(
    store => store.master.featuresCards
  );
  const { account: user } = useSelector(state => state.user);
  const { isEditorOrAdmin } = roles({
    permission: user.permission,
    new_permission: user.new_permission,
  });

  useEffect(() => {
    dispatch(getFeaturesCards({ page: page, pageSize: 6 }));
  }, [dispatch, page]);

  const handleCreate = (name, title, description) => {
    dispatch(createFeaturesCard(name, title, description, cards));
    setEdit(!editMode);
  };

  const handleUpdate = (id, name, title, description) => {
    dispatch(
      updateFeaturesCard(id, name, title, description, cards, pagination)
    );
    setEdit(!editMode);
  };

  const handleOpenModal = id => {
    const current = id ? cards.find(el => el.id === id) : null;
    setCurrent(current);
    setEdit(!editMode);
  };

  const onAcceptDelete = () => {
    dispatch(deleteFeaturesCard(cardId, cards, pagination));
    setDialogModal(false);
  };

  const onDeclineDelete = () => {
    setDialogModal(false);
  };

  const handleDelete = id => {
    setDialogModal(true);
    setCardId(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {isEditorOrAdmin && (
          <button
            type="button"
            className="primary-button"
            onClick={() => handleOpenModal()}
          >
            Create new
          </button>
        )}
      </div>
      {pagination && (
        <PaginationControlled
          handler={setPage}
          page={page}
          style={['dark']}
          totalPages={pagination?.pageCount}
        />
      )}
      <EditModal
        open={editMode}
        setOpen={() => setEdit(false)}
        current={current}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
      <AlertDialogDelete
        openDialog={isDialogModal}
        dialogSettings={MODAL_FEATURE_CONTENT}
        handleDialog={onDeclineDelete}
        deleteBackground={onAcceptDelete}
      />
      {loading ? null : (
        <List className={styles.master_wrapper}>
          {cards?.map(item => (
            <Record>
              <ArtistsExperienceCard
                data={item}
                editable
                isEditorOrAdmin={isEditorOrAdmin}
                handleUpdate={handleOpenModal}
                handleDelete={handleDelete}
              />
            </Record>
          ))}
        </List>
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getInterviewActions,
        getPhotoActions,
        saveInterviewActions,
        setInitialData,
        uploadPhotoActions,
        createUserData,
        deleteUserData,
        updateBiography,
        displayMessage,
      },
      dispatch
    ),
  };
}
export default connect(mapDispatchToProps)(MasterArtistsFeatures);
