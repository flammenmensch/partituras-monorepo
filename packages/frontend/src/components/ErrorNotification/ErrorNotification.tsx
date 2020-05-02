import React from 'react';

interface Props {
  error: Error;
}

const ErrorNotification: React.FC<Props> = (props) => (
  <div className="notification is-danger">
    {props.error.message}
  </div>
);

export default ErrorNotification;
