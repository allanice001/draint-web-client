import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import React from 'react';

const useStyles = makeStyles({
  root: {
    fontSize: '2rem',
  },
});

export default function DotsMobileStepper({ totalPages, Page, handler }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(Page);

  const handleNext = () => {
    setActiveStep(prevActiveStep => {
      handler(prevActiveStep + 1);
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => {
      handler(prevActiveStep - 1);
      return prevActiveStep - 1;
    });
  };

  return (
    <MobileStepper
      variant="dots"
      steps={totalPages}
      position="static"
      activeStep={activeStep - 1}
      className={classes.root}
      nextButton={
        <Button
          size="large"
          onClick={handleNext}
          disabled={activeStep === totalPages}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="large" onClick={handleBack} disabled={activeStep === 1}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
