import React, { useEffect, useState } from 'react';
import {
  addLegalItem,
  getLegalData,
  removeLegalItem,
  updateLegalItem,
} from 'redux/legal/actions/legalActions';
import { useDispatch, useSelector } from 'react-redux';

import AddOrEditLegal from './legal-add-edit-modal';
import LegalCard from './legal-card';
import { MasterLegalNav } from 'components/nav/sub/masterLegal';
import { roles } from 'helpers/get-role';
import styles from './legal.module.scss';

const MasterLegal = () => {
  const [open, setOpen] = useState('closed');
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  const { legalList } = useSelector(state => state.legal);
  const { permission, new_permission } = useSelector(
    state => state.user.account
  );

  const role = roles({ permission, new_permission });

  useEffect(() => {
    dispatch(getLegalData({ master: true }));
  }, [dispatch]);

  const onDelete = id => {
    dispatch(removeLegalItem(id));
  };

  const handleSaveLegal = (item, title, content, featureImage) => {
    item?.id
      ? dispatch(
          updateLegalItem(
            item.id,
            title,
            content,
            featureImage || item.image_url
          )
        )
      : dispatch(addLegalItem(title, content, featureImage));
    setOpen('closed');
  };

  const handleEditLegal = item => {
    setOpen('edit');
    setSelectedItem(item);
  };

  if (!legalList) {
    return null;
  }

  return (
    <section>
      <MasterLegalNav />
      <div className={styles.add__button}>
        {role.isSuperAdmin && (
          <button className="primary-button" onClick={() => setOpen('create')}>
            Add Legal
          </button>
        )}
      </div>
      <div className={styles.container}>
        {legalList.map(item => (
          <LegalCard
            isEditorOrAdmin={role.isEditorOrAdmin}
            handleEditLegal={handleEditLegal}
            key={item.id}
            item={item}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>
      <AddOrEditLegal
        handleClose={() => {
          setOpen('closed');
          setSelectedItem(null);
        }}
        handleSaveLegal={handleSaveLegal}
        item={open === 'edit' ? selectedItem : null}
        open={open === 'edit' || open === 'create'}
        isEditorOrAdmin={role.isEditorOrAdmin}
      />
    </section>
  );
};

export default MasterLegal;
