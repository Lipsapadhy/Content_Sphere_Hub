import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen">
            <nav className="w-64 bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li className="mb-2">
                        <Link to="categories" className="text-blue-600 hover:underline">
                            Manage Categories
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="flex-grow p-6">
                <Outlet />
            </main>
        </div>
    );
}
