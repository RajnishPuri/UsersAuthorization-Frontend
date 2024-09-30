import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = Cookies.get('Token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            Cookies.remove('Token');
            return <Navigate to="/login" replace />;
        }

        const userRole = decodedToken.role;

        if (allowedRoles.includes(userRole)) {
            return <Outlet />;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Token decoding failed:", error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
