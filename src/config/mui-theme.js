import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    fontFamily: "'Muli', sans-serif'",
    fontSize: 20,
    color: '#3F4041',
    lineHeight: 1.2,
  },

  palette: {
    primary: { main: '#806BFF' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      maxTab: 1367,
      xl: 1920,
    },
  },
});
