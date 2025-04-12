import './styles.scss';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { PRIMARY_COLOR } from 'constants/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const tabStyles = makeStyles(theme => ({
  root: {
    '& .MuiTab-textColorSecondary': {
      textTransform: 'capitalize',
      fontSize: '16px',
      fontFamily: 'Muli',
    },
    '& .Mui-selected': {
      color: PRIMARY_COLOR,
    },
    '& .MuiTabs-indicator': {
      backgroundColor: PRIMARY_COLOR,
    },
  },
}));

export const NavTabs = ({ value, tabs, handleChange }) => {
  const tabClasses = tabStyles();
  return (
    <Paper className={`tabs-container`}>
      <Tabs
        className={tabClasses.root}
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={(event, newValue) => handleChange(newValue)}
      >
        {tabs.map((tab, index) => (
          <Tab label={tab} key={index} value={tab} />
        ))}
      </Tabs>
    </Paper>
  );
};
