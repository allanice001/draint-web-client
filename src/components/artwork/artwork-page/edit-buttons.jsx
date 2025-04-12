import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import Icons from 'components/icons';
import React from 'react';
import cx from 'classnames';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

export function EditButtons({ sendRequest }) {
  const {
    canEdit,
    canDelete,
    loading,
    isOwnerCanEditArtwork,
    artworkEditForm,
    setDeleteModal,
    setEditMode,
    editMode,
  } = useArtworkPage();

  const DeleteButton = () => (
    <button
      type="button"
      className={cx('primary-button', styles.button__delete)}
      onClick={() => setDeleteModal(true)}
    >
      <Icons.Delete className={styles.icon} /> Delete
    </button>
  );

  return (
    <div className={styles.actions}>
      <button type="button" className={cx(styles.button, styles.share)}>
        <Icons.Share className={styles.icon} />
        Share
      </button>
      {canEdit() && !loading && (
        <>
          {!editMode && (
            <button
              type="button"
              className={cx('secondary-button', styles.button)}
              disabled={!isOwnerCanEditArtwork}
              onClick={() => {
                setEditMode(true);
                const Analytic = AnalyticHelper.create();
                Analytic.createEvent('ArtworkEdit');
              }}
            >
              <Icons.Edit className={styles.icon} />
              Edit Painting
            </button>
          )}

          {editMode && (
            <>
              {canDelete() && <DeleteButton />}
              <button
                type="button"
                className={cx('secondary-button', styles.button)}
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Discard
              </button>
              <button
                type="button"
                className={cx('primary-button', styles.button, styles.save, {
                  [styles.disabled]: artworkEditForm?.syncErrors,
                })}
                onClick={sendRequest}
                form="artwork_edit_form"
                disabled={artworkEditForm?.syncErrors}
              >
                Save Changes
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
