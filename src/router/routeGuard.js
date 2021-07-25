import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_DENIED } from './router';
import { LOCAL_STORAGE } from '../constants/common';

const RouteGuard = ({ component: GuardedComponent }) => {
  const currentSessionId = localStorage.getItem(LOCAL_STORAGE.session_id);
  const history = useHistory();

  useEffect(() => {
    if (!currentSessionId || currentSessionId === 'undefined') {
      history.push(ACCESS_DENIED);
    }
  }, []);

  return currentSessionId ? <GuardedComponent /> : null;
};

export default RouteGuard;
