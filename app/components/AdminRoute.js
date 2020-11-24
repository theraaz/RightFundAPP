import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual,
  );
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        token && user.role === 5 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default AdminRoute;
