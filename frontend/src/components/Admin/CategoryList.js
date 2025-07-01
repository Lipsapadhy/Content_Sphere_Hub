import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCategoriesAction,
    deleteCategoryAction,
} from "../../redux/slices/categories/categoriesSlice";
import { Link } from "react-router-dom";

export default function CategoryList() {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((s) => s.categories);
    const token = useSelector((s) => s.users.userAuth.userInfo.token);

    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (!window.confirm("Delete this category?")) return;
        dispatch(deleteCategoryAction({ id, token }));
    };

    if (loading) return <p>Loading…</p>;
    if (error)   return <p className="text-red-600">{error.message || error}</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Categories</h1>
                <Link to="new" className="px-4 py-2 bg-green-600 text-white rounded">
                    + New Category
                </Link>
            </div>

            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Author</th>
                    <th className="p-2 text-left">Shares</th>
                    <th className="p-2 text-left"># Posts</th>
                    <th className="p-2 text-left">Created</th>
                    <th className="p-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((c) => (
                    <tr key={c._id} className="border-t">
                        <td className="p-2">{c.name}</td>
                        <td className="p-2">{c.author}</td>
                        <td className="p-2">{c.shares}</td>
                        <td className="p-2">
                            {Array.isArray(c.posts)
                                ? c.posts.length
                                : c.posts
                                    ? 1
                                    : 0}
                        </td>
                        <td className="p-2">
                            {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2">
                            <Link to={`${c._id}/edit`} className="mr-2 text-blue-600">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(c._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
