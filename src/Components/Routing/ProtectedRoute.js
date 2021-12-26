import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("AuthToken") !== null;
    let location = useLocation()

    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />

    return <Outlet />

}

export default ProtectedRoute;
