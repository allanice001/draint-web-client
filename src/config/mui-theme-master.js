import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '16px',
        textTransform: 'unset',
      },
      label: {
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'unset',
      },
    },
    MuiIconButton: {
      label: {
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'unset',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '24px',
        height: '24px',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '16px',
        textTransform: 'unset',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '16px',
      },
    },
    MuiSelect: {
      root: {
        fontSize: '16px',
        lineHeight: '20px',
      },
      select: {
        minWidth: '120px',
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'unset',
      },
    },
    MuiInput: {
      input: {
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    MuiOutlinedInput: {
      input: {
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
    MuiCardActions: {
      root: {
        padding: '16px',
      },
    },
    MuiDataGrid: {
      root: {
        fontSize: '16px',
      },
    },
    MuiTablePagination: {
      caption: {
        fontSize: '16px',
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '16px',
      },
    },
  },
  common: {
    breakpoints: {
      values: {
        md: 960,
        sm: 768,
      },
    },
  },
});
