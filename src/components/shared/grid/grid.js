import React, { useMemo } from 'react';
import cx from 'classnames';
import styles from './grid.module.scss';

const getGridStyle = (columns) => {
  return {
    gridTemplateColumns: `repeat(${columns}, minmax(100px, 1fr))`,
  };
};

export const Grid = ({
  columns,
  list = [],
  render = () => {},
  className = '',
}) => {
  const columnsView = useMemo(() => {
    const result = [];

    list.forEach((el, i) => {
      const targetColumn = i % columns;
      const column = result[targetColumn] || [];
      column.push(el);

      if (!result.some((item) => item === column)) {
        result.push(column);
      }
    });

    if (result.length < columns) {
      result.push(...Array(columns - result.length).fill([]));
    }

    return result;
  }, [list, columns]);

  return (
    <div className={cx(styles.grid, className)} style={getGridStyle(columns)}>
      {columnsView.map((column, index) => (
        <div className={styles.column} key={index}>
          {!!column.length ? (
            column.map((el, index) => render(el, index))
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  );
};
