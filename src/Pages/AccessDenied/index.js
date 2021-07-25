import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../router/router';

const AccessDenied = () => {
  const history = useHistory();
  const toLogin = () => {
    history.push(LOGIN);
  };

  return (
    <div className="d-flex justify-content-center width-100-per height-100-per">
      <div className="d-flex width-100-per flex-column align-items-center justify-content-center">
        <h2>Access Denied</h2>
        <Button onClick={toLogin} outline color="primary">
          To Login Page
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;
