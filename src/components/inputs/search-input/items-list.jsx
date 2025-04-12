import cx from 'classnames';
import styles from './styles.module.scss';

const BOTTOM = 'bottom';
const TOP = 'top';

export const ItemsList = ({
  loading,
  itemsList,
  onItemClick,
  align = BOTTOM,
}) => {
  if (loading || !itemsList?.length) {
    return null;
  }

  return (
    <div
      className={cx(styles.list, {
        [styles.alignBottom]: align === BOTTOM,
        [styles.alignTop]: align === TOP,
      })}
    >
      {itemsList?.map(item => (
        <div
          onMouseDown={() => onItemClick(item)}
          className={styles.list__item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
