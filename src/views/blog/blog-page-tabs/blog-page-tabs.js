import { List, Record } from 'components/shared/list';
import { OUTLINE_COLOR, PRIMARY_COLOR } from 'constants/colors';

import React, { useMemo } from 'react';
import { blogIcons, sortOptions, tabList } from './tabs-helpers';
import Dropdown from 'components/dropdown/dropdown';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './blog-page-tabs.module.scss';

const FIRST_PAGE = 1;

export const BlogPageTabs = ({
  categories = [],
  onSortChange,
  activeCategory,
  setPage,
}) => {
  const tabs = useMemo(() => {
    if (!categories) {
      return null;
    }
    const handleTabClick = () => {
      setPage(FIRST_PAGE);
    };

    const categoryTabs = categories.map(el => {
      return {
        label: el.name,
        icon: blogIcons[el.key],
        key: el.key,
        path: `/blog/${el.key}`,
      };
    });

    const tabs = [tabList[0], ...categoryTabs];

    return (
      <List className={styles.list} horizontal>
        {tabs.map(tab => {
          return (
            <Record
              key={tab.path}
              className={cx(styles.item, {
                [styles.active]: tab.label === activeCategory,
              })}
            >
              <NavLink
                exact
                onClick={handleTabClick}
                className={styles.link}
                to={tab.path}
                activeClassName={styles.active}
              >
                <span className={styles.tab_label}>{tab.label}</span>
                <span className={styles.tab_icon}>
                  {
                    <tab.icon
                      fill={
                        tab.key === activeCategory
                          ? PRIMARY_COLOR
                          : OUTLINE_COLOR
                      }
                    />
                  }
                </span>
              </NavLink>
            </Record>
          );
        })}
      </List>
    );
  }, [activeCategory, categories, setPage]);

  return (
    <div className={styles.root}>
      {tabs}

      <div className={styles.sort}>
        <span className={styles.label}>Sort by</span>

        <Dropdown
          className={styles.select}
          onChange={onSortChange}
          options={sortOptions}
          rounded
        />
      </div>
    </div>
  );
};
