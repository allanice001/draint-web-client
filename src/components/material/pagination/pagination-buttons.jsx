import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function PaginationButtons({
  hide,
  pages = 5,
  size = 'medium',
  onChange,
  disabled,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!hide ? (
        <Pagination
          count={pages}
          showFirstButton
          showLastButton
          size={size}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <Pagination
          count={pages}
          hidePrevButton
          hideNextButton
          size={size}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default PaginationButtons;
