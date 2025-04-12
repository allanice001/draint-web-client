import './modal.scss';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  changeModalDescription,
  getModalContentData,
  getModalsList,
  getModalsMedia,
  selectModal,
  updateModalContentData,
  updateModalDescription,
} from 'redux/master/actions/modalActions';
import { useDispatch, useSelector } from 'react-redux';

import { MasterModalNav } from 'components/lib';
import ModalContentCard from './modal-connect-card';

const ModalConnect = () => {
  const {
    loading,
    mediaList,
    currentModal,
    allModals,
    description,
    mediaToModal,
  } = useSelector(state => state.master.modals);

  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';

  let isAnalyst = true;

  if (user?.new_permission) {
    isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModalsMedia());
    dispatch(getModalsList());
  }, [dispatch]);

  const handleSelectorChange = async event => {
    const currentModalID = event.target.value;
    const currentModal = allModals.find(m => m.id === currentModalID);
    dispatch(selectModal(currentModal));
    dispatch(getModalContentData(currentModalID));
  };

  const handleSwitchChange = async (contentMediaId, checked) => {
    if (currentModal) {
      const modalId = currentModal.id;
      dispatch(updateModalContentData(contentMediaId, checked, modalId));
    }
  };

  const handleDescription = event => {
    dispatch(changeModalDescription(event.target.value));
  };

  const handleSendDescription = async () => {
    dispatch(updateModalDescription(currentModal.id, description, allModals));
  };

  return (
    <div id="modal-master-wrapper">
      <MasterModalNav />

      <Card>
        <CardContent classes={{ root: 'connect-form' }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Choose modal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={currentModal.id}
              onChange={handleSelectorChange}
            >
              {allModals.map(modal => (
                <MenuItem key={modal.id} value={modal.id}>
                  {modal.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Modal Description</InputLabel>
            <Input
              multiline
              rows={4}
              value={description || ''}
              onChange={handleDescription}
            />
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            disabled={loading || isAnalyst}
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSendDescription}
          >
            Save Description
          </Button>
        </CardActions>
      </Card>

      <div className="image-cards-list">
        {mediaList.map((image, index) => {
          const checked = mediaToModal.includes(image.id);
          return (
            <ModalContentCard
              key={image.id}
              isInList={checked && !isAnalyst}
              image={image}
              index={index}
              handleSwitchChange={handleSwitchChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ModalConnect;
