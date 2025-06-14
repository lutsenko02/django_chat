import React from 'react';
import { Navigate, useLocation  } from 'react-router-dom'

function PrivateRoute({ children, authed }) {
    const location = useLocation();

    return authed
        ? children
        : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute
