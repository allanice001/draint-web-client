import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import React, { useEffect, useState } from 'react';

import { Close } from '@material-ui/icons';
import Icons from '../../icons';
import Input from '../../reduxForm/input/input';
import { imageSizes } from 'constants/media-query/image-sizes';
import { required } from '../../reduxForm/validators';
import styles from './artwork-series-connect-modal.module.scss';

const EditForm = reduxForm({
  form: 'editSeries',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(({ title, setEdit, handleSubmit, valid }) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <Field
      component={Input}
      validate={[required]}
      className={styles.input__wrapper}
      label="Enter new series label"
      inputClassName={styles.input}
      name="name"
      value={title}
    />
    <div className={styles.buttons_wrap}>
      <button
        type="submit"
        className={`primary-button ${styles.button}`}
        disabled={!valid}
      >
        <Icons.Check />
      </button>
      <button
        type="button"
        className={`secondary-button ${styles.button}`}
        onClick={() => setEdit(false)}
      >
        <Close />
      </button>
    </div>
  </form>
));

const TitleGroup = ({ title, setEdit }) => (
  <div className={styles.title}>
    {title}
    <button
      type="button"
      className={styles.edit__button}
      onClick={() => setEdit(true)}
    >
      <Icons.Edit fill="#806BFF" />
    </button>
  </div>
);

const ArtworkConnectSeriesModal = props => {
  const {
    open,
    handleClose,
    artworks,
    series,
    seriesId,
    add,
    remove,
    updateSeries,
  } = props;

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const current = series.find(el => el.id === seriesId);
    if (!current) return;
    const data = artworks.map(art => {
      art.inSeries = !!current.artworks.includes(art.id);
      return art;
    });
    setData(data);
    setTitle(current.name);
  }, [seriesId, series, artworks]);

  const changeStatus = (status, id) => {
    const newData = data.map(el =>
      el.id === id ? { ...el, inSeries: status } : el
    );
    setData(newData);
  };

  const handleClick = (inSeries, artwork_id) => {
    const series_id = seriesId;
    if (!inSeries) {
      add({ series_id, artwork_id });
    } else {
      remove({ series_id, artwork_id });
    }
    changeStatus(!inSeries, artwork_id);
  };

  const handleNameUpdate = data => {
    data.id = seriesId;
    updateSeries(data, series);
    setEdit(false);
  };

  return (
    <Dialog maxWidth="xl" open={open} onClose={handleClose}>
      <DialogTitle>
        <div className={styles.header}>
          {!edit ? (
            <TitleGroup title={title} setEdit={setEdit} />
          ) : (
            <EditForm
              title={title}
              setEdit={setEdit}
              onSubmit={handleNameUpdate}
            />
          )}
        </div>
      </DialogTitle>
      <DialogContent id="series-modal">
        <div className={styles.wrapper}>
          {data.map(el => (
            <button
              key={el.id}
              type="button"
              className={`${styles.image__wrapper}`}
              onClick={() => handleClick(el.inSeries, el.id)}
            >
              <img
                alt="Artwork"
                className={`${styles.image} ${
                  el.inSeries ? styles.active : null
                }`}
                srcSet={el.small_image || el.primary_image}
                sizes={imageSizes.SM}
                title="Artwork"
              />
            </button>
          ))}
        </div>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <button
          type="button"
          onClick={handleClose}
          disabled={props.loading}
          className="secondary-button"
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ArtworkConnectSeriesModal;
