import React from 'react';
import SignIn from '../../components/materialForm/auth/signIn';
import SignUp from '../../components/signup/signup-page';

export class ActionAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };
  }

  swapForms = () => {
    const { signup } = this.state;
    this.setState({ signup: !signup });
  };

  render() {
    const { callback } = this.props;
    const { signup } = this.state;
    return (
      <div className="action-signup-frame">
        {signup && (
          <SignUp
            noRedirect
            callback={callback}
            swapCallback={this.swapForms}
          />
        )}
        {!signup && (
          <SignIn
            noRedirect
            callback={callback}
            swapCallback={this.swapForms}
          />
        )}
      </div>
    );
  }
}
