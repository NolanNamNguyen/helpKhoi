import React, { useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { resetShowAlert } from '../../redux/actions/appAction';

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.appReducers.alert);

  useEffect(() => {
    if (alert.state) {
      setTimeout(() => {
        dispatch(resetShowAlert());
      }, 5000);
    }
  }, [alert]);
  const onDismissAlert = () => {
    dispatch(resetShowAlert());
  };

  return (
    <div className={`width-100-per d-flex ${alert.cssClass}`}>
      <Alert
        color={alert.type || 'primary'}
        className="position-absolute text-break"
        isOpen={alert.state}
        toggle={onDismissAlert}
      >
        {alert.message}
      </Alert>
    </div>
  );
};

export default GlobalAlert;
