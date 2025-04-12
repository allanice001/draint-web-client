import * as Button from 'components/shared/button';
import { DISAPPROVED, WAITING } from 'constants/statuses';
import React, { useMemo } from 'react';
import { AtelierBanner } from 'views/atelier/atelier-banner/atelier-banner';
import { AtelierNotes } from 'views/atelier/atelier-notes/atelier-notes';
import { AtelierPostForm } from 'views/atelier/atelier-post-form/atelier-post-form';
import { AtelierPosts } from 'views/atelier/atelier-posts/atelier-posts';
import { AtelierProcess } from 'views/atelier/atelier-process/atelier-process';
import BasicModal from 'components/basic-modal/basic-modal';
import { Container } from 'components/shared/container/container';
import Plans from 'components/pricing/plans';
import { atelierFormFields } from 'constants/atelier/atelier-form-fields';
import cx from 'classnames';
import staticUrls from 'constants/images/static-urls';
import styles from './atelier-page.module.scss';
import { useAtelier } from 'hooks/use-atelier';

export const AtelierPage = () => {
  const {
    atelier,
    isAdmin,
    isDesktop,
    canEdit,
    showEmptyImage,
    canUse,
    isSuperAdmin,
    isEditor,
    connectPostForm,
    connectNotesForm,
    connectBannerForm,
    connectProcessForm,
    setEditMode,
    setEditType,
    isEditMode,
    handleCreateAtelier,
    aboutTitles,
    onDeletePostClick,
    changeModalView,
    validateFields,
    owner,
  } = useAtelier();

  const NewPostForm = useMemo(() => connectPostForm(AtelierPostForm), [
    connectPostForm,
  ]);

  const NotesSection = useMemo(() => connectNotesForm(AtelierNotes), [
    connectNotesForm,
  ]);

  const BannerSection = useMemo(() => connectBannerForm(AtelierBanner), [
    connectBannerForm,
  ]);

  const ProcessSection = useMemo(() => connectProcessForm(AtelierProcess), [
    connectProcessForm,
  ]);

  const {
    PROCESS,
    ENJOY,
    LEAD,
    TOP_CONTENT,
    BOTTOM_CONTENT,
    BLOCKQUOTE,
  } = atelierFormFields;

  if (atelier.loading) {
    return null;
  }

  if (!canUse && owner) {
    return (
      <Container>
        <Plans />
      </Container>
    );
  }

  if (showEmptyImage && !isSuperAdmin && !isAdmin && !isEditor) {
    return (
      <div className={cx(styles.root, styles.empty)}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Atelier</h2>
        </div>

        <img
          className={styles.image}
          height="220"
          src={staticUrls.image.emptyPage}
          alt=""
        />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Atelier</h2>
        {atelier.status &&
          (atelier.isOwner || isSuperAdmin || isAdmin || isEditor) && (
            <span className={cx(styles.status, styles[atelier.status])}>
              {atelier.status}
              {!isSuperAdmin &&
                atelier.status === DISAPPROVED &&
                ', please edit your atelier'}
              {!isAdmin && atelier.status === WAITING && ' to approve'}
            </span>
          )}

        {atelier.isOwner && !atelier.id && (
          <Button.Primary
            className={styles.action}
            sm
            onClick={handleCreateAtelier}
          >
            Create Atelier
          </Button.Primary>
        )}
      </div>
      {atelier.id && (
        <>
          <div className={styles.section}>
            <BannerSection
              atelierStatus={atelier.status}
              defaultImage={staticUrls.image.defaultPost}
              content={atelier.banner}
              isEditMode={isEditMode(atelier.form.banner)}
              setEditMode={value => {
                if (atelier.banner) setEditType(atelier.form.banner, value);
                setEditMode(atelier.form.banner, value);
              }}
              isOwner={isSuperAdmin || atelier.isOwner || isAdmin || isEditor}
              canEdit={canEdit || owner}
              isError={!validateFields(atelier.form.banner, [LEAD])}
            />
          </div>

          <div className={styles.section}>
            <AtelierPosts
              posts={atelier.posts}
              onAddNewPost={() => changeModalView(true)}
              isOwner={isSuperAdmin || atelier.isOwner || isAdmin || isEditor}
              username={atelier?.profile?.username}
              isDesktop={isDesktop}
              isAdmin={isSuperAdmin}
              canEdit={canEdit || owner}
              onDeletePostClick={onDeletePostClick}
              status={atelier.status}
            />
          </div>

          <div className={cx(styles.section, styles.border)}>
            <ProcessSection
              defaultImage={staticUrls.image.defaultPost}
              data={atelier.process}
              questions={{
                process: atelier.process_question,
                enjoy: atelier.enjoy_question,
              }}
              isOwner={isSuperAdmin || atelier.isOwner || isAdmin || isEditor}
              isEditMode={isEditMode(atelier.form.process)}
              setEditMode={value => {
                if (atelier.process) setEditType(atelier.form.process, value);
                setEditMode(atelier.form.process, value);
              }}
              canEdit={canEdit || owner}
              isError={!validateFields(atelier.form.process, [PROCESS, ENJOY])}
            />
          </div>

          <div className={cx(styles.section, styles.border)}>
            <NotesSection
              defaultImage={staticUrls.image.defaultPost}
              content={atelier.notes}
              titles={aboutTitles()}
              isEditMode={isEditMode(atelier.form.notes)}
              setEditMode={value => {
                if (atelier.notes) setEditType(atelier.form.notes, value);
                setEditMode(atelier.form.notes, value);
              }}
              isOwner={isSuperAdmin || atelier.isOwner || isAdmin || isEditor}
              canEdit={canEdit || owner}
              isError={
                !validateFields(atelier.form.notes, [
                  TOP_CONTENT,
                  BOTTOM_CONTENT,
                  BLOCKQUOTE,
                ])
              }
            />
          </div>
        </>
      )}
      <BasicModal
        title="Upload new post"
        isOpen={atelier.isOpenModal}
        handleClose={() => changeModalView(false)}
        footerClassName={styles.footer}
        maxWidth="xs"
      >
        <NewPostForm onClick={() => changeModalView(false)} />
      </BasicModal>
    </div>
  );
};
