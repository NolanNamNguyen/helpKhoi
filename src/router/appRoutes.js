import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as AppRoutes from './router';
import RouteGuard from './routeGuard';
import Home from '../Pages/Home';
import AccessDenied from '../Pages/AccessDenied';
import Login from '../Pages/Login';

const ROUTES = [
  {
    path: AppRoutes.LOGIN,
    exact: true,
    component: <Login />,
    title: 'Login',
  },
  {
    path: AppRoutes.HOME,
    exact: true,
    component: <RouteGuard component={Home} />,
    title: 'Home',
  },
  // {
  //   path: AppRoutes.HOME,
  //   exact: true,
  //   component: <Home />,
  //   title: 'Home',
  // },
  {
    path: AppRoutes.ACCESS_DENIED,
    exact: true,
    component: <AccessDenied />,
    title: 'Access Denied',
  },
];

const StudentRoutes = () => {
  return (
    <Switch>
      {ROUTES.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact}>
          <Helmet>
            <title>{route.title}</title>
          </Helmet>
          {route.component}
        </Route>
      ))}
    </Switch>
  );
};

export default StudentRoutes;
