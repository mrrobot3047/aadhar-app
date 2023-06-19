import React from 'react';
import { Route, redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAdmin, handleLogout, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component isAdmin={isAdmin} {...props} handleLogout={handleLogout} />
        ) : (
          <redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
