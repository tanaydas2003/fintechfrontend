// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PrivateRoute({ children }) {
  const [cookies] = useCookies(['token']);

  return cookies.token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
