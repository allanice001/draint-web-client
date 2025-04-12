import CancelControl from './cancel';
import EditControl from './edit';
import EditOptionalControl from './editOptional';
import React from 'react';
import SaveControl from './save';

export default class EditControlFactory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  build(data) {
    switch (data.source) {
      case 'editOptional':
        return (
          <EditOptionalControl
            condition={data.condition}
            callback={data.callback}
          />
        );
      case 'edit':
        return (
          <EditControl
            condition={data.condition}
            callback={data.callback}
            callbackData={data.callbackData}
          />
        );
      case 'cancel':
        return (
          <CancelControl
            callback={data.callback}
            callbackData={data.callbackData}
          />
        );
      case 'save':
        return (
          <SaveControl
            errorEmpty={this.props.errorEmpty}
            errorNumber={this.props.errorNumber}
            errorDecimal={this.props.errorDecimal}
            errorLength={this.props.errorLength}
            errorDate={this.props.errorDate}
            callback={data.callback}
            callbackData={data.callbackData}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return this.build(this.props.data);
  }
}
