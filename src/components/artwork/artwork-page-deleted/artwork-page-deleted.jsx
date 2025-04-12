import React, { useMemo, useState } from 'react';

import { BackButton } from './back-button';
import { RecoverButton } from './recover-button';
import styles from './artwork-page-deleted.module.scss';
import { useSelector } from 'react-redux';

function ArtworkDeletedPage({ permissions }) {
  const { loading } = useSelector(store => store.artwork.artworkData);
  const { currentArtwork } = useSelector(store => store.artwork.artworkData);
  const {
    deleted_at: deletedAt,
    id,
    authorInfo: { account_id },
  } = currentArtwork;
  const [deadline, setDeadline] = useState(null);

  function isBeforeDeadline(deletedAt) {
    const today = Date.now();
    const deadline = Date.parse(deletedAt);
    return today < deadline;
  }

  useMemo(() => {
    setDeadline(null);

    if (isBeforeDeadline(deletedAt) && deletedAt) {
      return setDeadline(new Date(deletedAt).toLocaleDateString());
    }
  }, [deletedAt]);

  const canRecover = permissions && deadline;
  const deadlineMessage = canRecover
    ? `You can restore it before ${deadline}.`
    : '';

  return (
    <section className={`container ${styles.wrapper}`}>
      <h2>This artwork has been deleted.</h2>
      <h3>{deadlineMessage}</h3>
      {!loading && (
        <div>
          <BackButton />
          {canRecover ? (
            <RecoverButton artworkId={id} accountId={account_id} />
          ) : null}
        </div>
      )}
    </section>
  );
}

export default ArtworkDeletedPage;
