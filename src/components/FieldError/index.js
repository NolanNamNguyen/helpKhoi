import React from 'react';

const FieldError = ({ message, cssClass }) => {
  return message ? <span className={`${cssClass} error-message`}>{message}</span> : null;
};

export default FieldError;
