import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategoryAction,
    updateCategoryAction,
    fetchCategoriesAction,
} from "../../redux/slices/categories/categoriesSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryForm() {
    const [name, setName] = useState("");
    const { id } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { categories, loading, error, success } =
        useSelector((s) => s.categories);
    const token = useSelector((s) => s.users.userAuth.userInfo.token);

    useEffect(() => {
        if (id && categories.length === 0) {
            dispatch(fetchCategoriesAction());
        }
        if (id) {
            const cat = categories.find((c) => c._id === id);
            if (cat) setName(cat.name);
        }
    }, [id, categories, dispatch]);

    useEffect(() => {
        if (success) {
            nav("/admin/categories");
        }
    }, [success, nav]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateCategoryAction({ id, name, token }));
        } else {
            dispatch(createCategoryAction({ name, token }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl mb-4">{id ? "Edit" : "New"} Category</h2>
            {error && <p className="text-red-600 mb-2">{error.message || error}</p>}
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {id ? "Update" : "Create"}
            </button>
        </form>
    );
}
