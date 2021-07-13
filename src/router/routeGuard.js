import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGIN } from './router';
import { getUserByEmail } from '../redux/actions/appAction';

const RouteGuard = ({ component: GuardedComponent }) => {
  const currentUserDetail = useSelector(
    (state) => state.appReducers.currentUserDetail,
  );
  const getMeFailed = useSelector((state) => state.appReducers.getMeFailed);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    !sessionStorage.getItem('email') ||
      (!sessionStorage.getItem('mytoken') && history.push(LOGIN));
    !currentUserDetail &&
      dispatch(getUserByEmail({ email: sessionStorage.getItem('email') }));
  }, []);

  useEffect(() => {
    getMeFailed && history.push(LOGIN);
  }, [getMeFailed]);

  return currentUserDetail ? <GuardedComponent /> : null;
};

export default RouteGuard;
