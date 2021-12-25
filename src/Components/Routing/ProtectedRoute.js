import React from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("AuthToken") !== null;
    let location = useLocation()
    console.log("this", isAuthenticated);

    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />

    return <Outlet />

}

export default ProtectedRoute;
