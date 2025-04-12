import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import styles from './Dropzone.module.scss';

export const ThumbPreview = ({ handleRemoveFile, file }) => {
  return (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <div className={styles.deleteBtnWrapper}>
          <IconButton
            className={styles.deleteBtn}
            onClick={() => handleRemoveFile(file.path)}
          >
            <DeleteIcon />
          </IconButton>
        </div>

        <img src={file.preview} className={styles.img} alt="thumb" />
      </div>
    </div>
  );
};
