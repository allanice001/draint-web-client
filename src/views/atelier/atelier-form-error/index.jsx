import { ATELIER_ERROR_DEFAULT_MESSAGE } from 'constants/atelier/atelier-form-fields';
import styles from './styles.module.scss';

export const AtelierFormError = ({ message }) => {
  return (
    <div className={styles.text}>
      {message || ATELIER_ERROR_DEFAULT_MESSAGE}
    </div>
  );
};
