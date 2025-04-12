import { makeStyles } from '@material-ui/core/styles';

export const collapsedHeight = 48;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 40,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 30,
      paddingTop: 0,
      background:
        'linear-gradient(180deg, rgba(250, 250, 250, 0) 1.36%, #FAFAFA 36.13%);',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 50,
      paddingTop: 36,
    },
  },
  paper: {
    boxShadow: 'unset',
    paddingRight: 50,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 14,
    },
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  topicTitle: {
    fontFamily: 'Sen',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 28,
    lineHeight: '40px',
    padding: '15px 0',
    marginBottom: '1rem',
    wordBreak: 'break-word',
  },
  expandText: {
    width: 'auto',
    transition: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  row: {
    padding: '15px 0 15px 15px',
    background: '#FFF',
    borderRadius: 15,
    marginBottom: 30,
    color: '#3F4041',
    boxShadow: '0 0 0 1px #E7E7E7',
    cursor: 'pointer',
    position: 'relative',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  activeRow: {
    boxSizing: 'border-box',
    boxShadow: '0 0 0 2px #806BFF',
  },
  flexContainer: {
    display: 'flex',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  questionTitle: {
    fontFamily: 'Sen',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: '1rem',
  },
  questionTitleActive: {
    color: '#806BFF',
  },
  questionContent: {
    width: 'auto',
    height: 70,
    font: 'Mulish',
    fontSize: 16,
    lineHeight: '26px',
    fontStyle: 'normal',
    color: '#3F4041',
  },
  cutContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  iconContainer: {
    cursor: 'pointer',
  },
  iconContainerActive: {
    fill: '#806BFF',
  },
  editIcon: {
    width: 20,
    height: 20,
    transition: 'width 75ms, height 75ms',
    '&:hover': {
      color: '#806bff !important',
      cursor: 'pointer',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  form: {
    display: 'block',
  },
  formInput: {
    marginBottom: 10,
  },
  create: {
    maxWidth: 180,
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
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
