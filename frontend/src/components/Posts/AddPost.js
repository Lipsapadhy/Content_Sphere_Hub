import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { addPostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const AddPost = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { categories } = useSelector((state) => state.categories);
  const { post, error, loading, success } = useSelector((state) => state.posts);

  const options = categories?.map((c) => ({ value: c._id, label: c.name }));

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  const validateForm = (data) => {
    const errs = {};
    if (!data.title) errs.title = "Title is required";
    if (!data.image) errs.image = "Image is required";
    if (!data.category) errs.category = "Category is required";
    if (!data.content) errs.content = "Content is required";
    return errs;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelectChange = (opt) =>
      setFormData({ ...formData, category: opt.value });

  const handleFileChange = (e) =>
      setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      dispatch(addPostAction(formData));
      setFormData({ title: "", image: null, category: null, content: "" });
    }
  };

  return (
      <div className="min-h-screen w-full bg-gray-50 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-6">
          <div className="p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-coolGray-900 mb-4 text-center">
              Add New Post
            </h2>

            {error && <ErrorMsg message={error.message} />}
            {success && <SuccesMsg message="Post created successfully" />}

            {/* Title */}
            <label className="block mb-4">
            <span className="block text-coolGray-800 font-medium mb-1">
              Title
            </span>
              <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the post title"
                  className="w-full py-3 px-4 border border-coolGray-200 rounded-lg shadow-sm text-coolGray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              />
              {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </label>

            {/* Image */}
            <label className="block mb-4">
            <span className="block text-coolGray-800 font-medium mb-1">
              Image
            </span>
              <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  className="w-full py-2 px-3 border border-coolGray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              />
              {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </label>

            {/* Category */}
            <label className="block mb-4">
            <span className="block text-coolGray-800 font-medium mb-1">
              Category
            </span>
              <Select
                  options={options}
                  name="category"
                  onChange={handleSelectChange}
                  onBlur={handleBlur}
                  className="react-select-container"
                  classNamePrefix="react-select"
              />
              {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </label>

            {/* Content */}
            <label className="block mb-6">
            <span className="block text-coolGray-800 font-medium mb-1">
              Content (HTML)
            </span>
              <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Write your post content — you can include <strong>HTML</strong> tags"
                  className="w-full py-3 px-4 border border-coolGray-200 rounded-lg shadow-sm text-coolGray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 h-40 resize-vertical"
              />
              {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              {/* (optional) live preview */}
              <div className="mt-4 p-4 bg-gray-100 border border-coolGray-200 rounded-lg">
                <strong>Preview:</strong>
                <div
                    className="mt-2 prose"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </label>

            {/* Submit */}
            {loading ? (
                <LoadingComponent />
            ) : (
                <button
                    type="submit"
                    className="w-full py-3 text-white font-medium bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Post
                </button>
            )}
          </div>
        </form>
      </div>
  );
};

export default AddPost;
