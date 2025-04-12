// import Plans from 'components/pricing/plans';
import React from 'react';
import SignUpForm from 'components/signup/signup-form';

function SignUpActiveStep({
  activeStep,
  background,
  validationChecks,
  firstStepSubmit,
  isArtist,
  email,
  // signUpFinishCallback,
}) {
  switch (activeStep) {
    case 0:
      return (
        <SignUpForm
          background={background}
          isArtist={isArtist}
          onSubmit={firstStepSubmit}
          isDisabledEmail={!!email}
          setStepValidation={validationChecks.profileCheck}
          initialValues={{
            email: email,
          }}
        />
      );
    // case 1:
    //   return <Plans signUpFinishCallback={signUpFinishCallback} />;
    default:
      return 'Registration Completed';
  }
}

export default SignUpActiveStep;
