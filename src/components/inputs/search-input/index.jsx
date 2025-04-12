import Icons from 'components/icons';
import { ItemsList } from './items-list';
import cx from 'classnames';
import styles from './styles.module.scss';
import { useState } from 'react';

export const SearchInput = ({
  onItemClick,
  itemsList,
  listLoading,
  value,
  className,
  icon: Icon,
  ...rest
}) => {
  const [showList, setShowList] = useState(false);

  const toggleShowList = () => {
    setShowList(!showList);
  };

  return (
    <div className={cx(styles.inputWrapper, { [className]: className })}>
      {Icon ? <Icon /> : <Icons.SearchContactIcon />}

      <input
        value={value}
        {...rest}
        onBlur={toggleShowList}
        onFocus={toggleShowList}
      />

      {showList && (
        <ItemsList
          itemsList={itemsList}
          loading={listLoading}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
};
