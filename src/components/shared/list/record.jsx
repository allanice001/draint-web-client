import React from 'react';

function Record(props) {
  const { children, ...rest } = props;

  return <li {...rest}>{children}</li>;
}

export default Record;
