import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as AppRoutes from './router';
import Home from '../Pages/Home';

const ROUTES = [
  {
    path: AppRoutes.LOGIN,
    exact: true,
    component: <Home />,
    title: 'login',
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
