import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../lib/Auth';

function AdminRoute(props) {

  const { exact, path, component} = props;
  const Component = component;
  let admin;
  if (props.user !== null){
     admin = props.user.role
  };
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (admin !== undefined) return <Component {...props} />
        else return <Redirect to="/private" />
      }} />
  )
}

export default withAuth(AdminRoute);