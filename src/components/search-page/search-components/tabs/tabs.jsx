import { Tab, Tabs } from '@material-ui/core';

import React from 'react';
import { TabCount } from './tab-count';
import { TabList } from 'constants/search.constants';
import styles from '../../search-page.module.scss';

export const SearchTabs = ({ activeTab, handleTabChange, counts }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      textColor="inherit"
      scrollButtons="off"
      variant="scrollable"
      scrollable="true"
      classes={{
        root: styles.root,
        indicator: styles.indicator,
      }}
    >
      {TabList.map(({ name, type }) => (
        <Tab
          key={name}
          classes={{
            root: styles.tabs__button,
          }}
          label={
            <div>
              <span className={styles.tab__title}>{name}</span>
              &nbsp;
              <TabCount count={counts[type]} type={type} />
            </div>
          }
        />
      ))}
    </Tabs>
  );
};
