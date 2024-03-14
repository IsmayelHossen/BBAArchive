import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const PrivateRoute = () => {
    const auth=useAuth();
    return auth?<Outlet/>:<Navigate to="/"/>
}
export default PrivateRoute;
