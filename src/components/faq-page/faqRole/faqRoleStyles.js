import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => {
  return {
    container: {
      height: 413,
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
      },
    },
    content: {
      margin: '0 auto',
      paddingTop: 20,
      paddingBottom: '72px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        marginTop: 65,
      },
    },
    titleBlock: {
      marginBottom: 55,
      background:
        '-webkit-linear-gradient(259.59deg, #4437F7 16.09%, #C51699 94.78%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      fontFamily: 'Sen',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 40,
      lineHeight: '36px',
      textAlign: 'center',
      letterSpacing: '-0.03em',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
        fontSize: '28px',
        lineHeight: '46px',
      },
    },
    roleList: {
      display: 'block',
      justifyContent: 'space-around',
      marginTop: '2rem',
      [theme.breakpoints.up('sm')]: {
        margin: '0 -13px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        [`& > *`]: {
          padding: '0 13px',
          width: `calc(100% / 2)`,
        },
      },
      [theme.breakpoints.up('md')]: {
        margin: '0 -25px',
        flexWrap: 'nowrap',
        [`& > *`]: {
          padding: '0 25px',
          width: `calc(100% / 4)`,
        },
      },
    },
    roleItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
      cursor: 'pointer',
      color: '#3F4041',
      height: 208,

      [theme.breakpoints.down('xs')]: {
        marginBottom: 20,
        padding: '13px 36px 15px 19px',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',
        alignItems: 'unset',
        background: '#FFFFFF',
        maxWidth: 'unset',
        mixBlendMode: 'normal',
        border: '1px solid #E7E7E7',
        boxSizing: 'border-box',
        borderRadius: '10px',
        width: 'auto',
        height: 'auto',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '30px 40px 14px 40px',
      },
      [theme.breakpoints.up('md')]: {
        padding: '30px 12px 14px 12px',
      },
    },
    activeRoleItem: {
      background: '#FFFFFF',
      mixBlendMode: 'multiply',
      boxShadow: '0px 4px 45px rgba(0, 0, 0, 0.07)',
      borderRadius: 10,
    },
    roleTitle: {
      fontFamily: 'Sen',
      fontStyle: 'normal',
      fontWeight: 'bold',
      wordBreak: 'break-word',
      fontSize: 24,
      lineHeight: '29px',
      margin: '16px 0 25px 0',
      textTransform: 'capitalize',
    },
    roleDescription: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 15,
      lineHeight: '26px',
      paddingTop: 10,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
      wordBreak: 'break-word',
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
    },
    icons: {
      width: 34,
      height: 34,
      marginBottom: 15,
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
      },
    },
    editIcon: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    masterCategory: {
      position: 'relative',
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
  };
});
