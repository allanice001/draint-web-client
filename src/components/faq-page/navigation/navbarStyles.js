import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    background: '#F7F7F7',
  },
  content: {
    fontFamily: 'Mulish',
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '26px',
    display: 'flex',
    height: 50,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
      height: 80,
    },
    '& > *:not(:first-child)': {
      margin: '0 5px',
      [theme.breakpoints.up('sm')]: {
        margin: '0 10px',
      },
    },
    '& > *:first-child': {
      marginRight: 5,
      [theme.breakpoints.up('sm')]: {
        margin: '0 10px',
      },
    },
  },
  text: {
    margin: '0 5px',
    '&:first-letter': {
      textTransform: 'capitalize',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 20px',
      cursor: 'pointer',
    },
  },
  icon: {
    width: 17,
    [theme.breakpoints.down('xs')]: {
      width: 10,
    },
  },
  topic: {
    color: '#C7C7C7',
    marginLeft: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 3,
    },
  },
  disabled: {
    color: '#C7C7C7',
  },
}));
