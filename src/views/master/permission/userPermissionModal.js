import DefaultModal from 'components/basic-modal/basic-modal';
import Input from 'components/reduxForm/checkbox/checkbox';
import { MasterBlogFilter } from 'components/filters/master-blogFilter';
import { MasterCheckboxesFilter } from 'components/filters/masterCheckboxesFilter';
import React from 'react';
import { permissionsList } from 'constants/permissions';
import styles from '../artists-settings-modal.module.scss';

export const UserPermissionModal = props => {
  const {
    open,
    closeModal,
    user,
    role,
    handleFilterChange,
    handleSubmit,
    options,
    handleUrlClick,
    selectAll,
  } = props;

  const isDisabled =
    role === 'owner' || (user?.new_permission === 'owner' && role === 'owner');

  return (
    <DefaultModal
      maxWidth="xs"
      isOpen={open}
      title="Permission settings"
      handleClose={closeModal}
      footer={
        <div className={styles.footer}>
          <button
            type="button"
            className={`secondary-button ${styles.button}`}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`primary-button ${styles.button}`}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      }
    >
      <div className={styles.modal}>
        <MasterBlogFilter
          name="role"
          inputs={permissionsList}
          handleFilterChange={handleFilterChange}
          value={role || user?.new_permission}
        />
        <div>
          <Input
            label="Select all"
            className={styles.checkbox}
            disabled={isDisabled}
            onChange={e => {
              selectAll(e.target.checked);
            }}
          />
          <MasterCheckboxesFilter
            options={options}
            setOptions={handleUrlClick}
            permission={true}
            disabled={isDisabled}
          />
        </div>
      </div>
    </DefaultModal>
  );
};
