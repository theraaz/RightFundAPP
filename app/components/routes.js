import React from 'react';
import { Redirect, Route } from 'react-router-dom';
const LoginRoute = ({ path, component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        !token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default LoginRoute;
