import './checkout.scss';

import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';

import React from 'react';

const EMPTY_FIELD = 'This field cannot be empty';

export default class ContactInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      customer,
      handleContactChange,
      handleEmptyFields,
      emptyFields,
    } = this.props;
    return (
      <div id="checkout-material-wrapper">
        <Card>
          <CardContent>
            <div className="form-wrapper">
              <FormControl variant="outlined" error={emptyFields.first_name}>
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <OutlinedInput
                  id="first_name"
                  aria-describedby="first_name_helper"
                  type="text"
                  labelWidth={57}
                  onChange={handleContactChange}
                  onBlur={handleEmptyFields}
                  value={customer.first_name}
                />
                <FormHelperText id="first_name_helper">
                  {emptyFields.first_name && EMPTY_FIELD}
                </FormHelperText>
              </FormControl>

              <FormControl variant="outlined" error={emptyFields.last_name}>
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <OutlinedInput
                  id="last_name"
                  aria-describedby="last_name_helper"
                  type="text"
                  labelWidth={54}
                  onChange={handleContactChange}
                  onBlur={handleEmptyFields}
                  value={customer.last_name}
                />
                <FormHelperText id="last_name_helper">
                  {emptyFields.last_name && EMPTY_FIELD}
                </FormHelperText>
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
