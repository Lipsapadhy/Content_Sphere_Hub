import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const { userAuth } = useSelector((s) => s.users);
    const token = userAuth?.userInfo?.token;
    const role  = userAuth?.userInfo?.role;

    if (!token)          return <Navigate to="/login" />;
    if (role !== "admin") return <Navigate to="/" />;
    return <Outlet />;
}
