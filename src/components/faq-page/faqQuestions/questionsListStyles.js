import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: '#fff',
    paddingTop: 50,
    paddingBottom: 50,
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      maxWidth: 'unset',
      paddingTop: 10,
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: '1px solid #E7E7E7',
    },
  },
  questionsContainer: {
    [theme.breakpoints.up('sm')]: {
      '&:last-child': {
        borderBottom: '1px solid #E7E7E7',
      },
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  faqItem: {
    borderTop: '1px solid #E7E7E7',
    borderRadius: 0,
    borderLeft: '4px solid transparent',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
      padding: '14px 20px',
      flexDirection: 'row',
      textAlign: 'left',
      background: '#FFFFFF',
      maxWidth: 'unset',
      mixBlendMode: 'normal',
      border: '1px solid #E7E7E7',
      boxSizing: 'border-box',
      borderRadius: '10px',
      width: 'auto',
      height: 'auto',
    },
  },
  faqTitle: {
    fontSize: 16,
    fontFamily: 'Mulish',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    color: '#3F4041',
    flexGrow: 1,
    wordBreak: 'break-word',
    [theme.breakpoints.down('xs')]: {
      fontSize: 22,
      fontWeight: 700,
      fontFamily: '"Sen", sans-serif',
      wordBreak: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 8,
      '-webkit-box-orient': 'vertical',
    },
  },
  topicList: {
    borderLeft: '1px solid #E7E7E7',
    marginLeft: 35,
    paddingLeft: 20,
    '&:not(:empty)': {
      margin: '10px 0 16px 35px',
    },
  },
  topic: {
    fontSize: 16,
    lineHeight: '36px',
    fontFamily: 'Mulish',
    fontWeight: 600,
    color: '#3F4041',
    '&:hover': {
      color: '#806bff !important',
      cursor: 'pointer',
    },
  },
  editIcon: {
    marginRight: 20,
    width: 20,
    height: 20,
    '&:hover': {
      color: '#806bff !important',
      cursor: 'pointer',
    },
  },
  form: {
    marginBottom: 15,
  },
  create: {
    minWidth: '140px !important',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
    paddingRight: 10,
    '& > *:not(:last-child)': {
      marginRight: '1rem',
    },
  },
  group: {
    fontSize: 26,
    fontWeight: 400,
    fontFamily: '"Sen", sans-serif',
    textTransform: 'capitalize',
    marginBottom: '1.5rem',
  },
}));
