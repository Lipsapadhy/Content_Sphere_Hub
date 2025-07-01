// src/components/posts/UpdatePost.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { getPostAction, updatePostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const UpdatePost = () => {
  const dispatch = useDispatch();

  // normalize URL param (support either /:postId or /:id)
  const { postId: pid, id } = useParams();
  const postId = pid ?? id;

  // grab categories + post slice
  const { categories } = useSelector((state) => state.categories);
  const { post, loading, error, success } = useSelector((state) => state.posts);

  // local form state
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  // 1) fetch categories and the post once we know postId
  useEffect(() => {
    if (!postId) return;
    dispatch(fetchCategoriesAction());
    dispatch(getPostAction(postId));
  }, [dispatch, postId]);

  // 2) when post arrives, prefill our formData
  useEffect(() => {
    if (post && post._id === postId) {
      setFormData({
        title: post.title || "",
        image: null, // file inputs cannot be set programmatically
        category: post.category?._id || post.category,
        content: post.content || "",
      });
    }
  }, [post, postId]);

  // build react-select options
  const options = (categories || []).map((c) => ({
    value: c._id,
    label: c.name,
  }));

  // handlers
  const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelectChange = (opt) =>
      setFormData({ ...formData, category: opt.value });

  const handleFileChange = (e) =>
      setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePostAction({ ...formData, postId }));
  };

  return (
      <div className="min-h-screen w-full bg-gray-50 py-8">
        {loading && !post ? (
            <div className="flex items-center justify-center h-full">
              <LoadingComponent />
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-6">
              <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-4">Update Post</h2>
                {error && <ErrorMsg message={error.message} />}
                {success && <SuccesMsg message="Post updated successfully" />}

                {/* Title */}
                <label className="block mb-4">
                  <span className="block text-coolGray-800 font-medium mb-1">Title</span>
                  <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter post title"
                      className="w-full py-3 px-4 border border-coolGray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  />
                </label>

                {/* Current Image Preview */}
                {post?.imageUrl && (
                    <div className="mb-4">
                      <span className="block text-coolGray-800 font-medium mb-1">Current Image</span>
                      <img
                          src={post.imageUrl}
                          alt="current"
                          className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                )}

                {/* Replace Image */}
                <label className="block mb-4">
                  <span className="block text-coolGray-800 font-medium mb-1">Replace Image</span>
                  <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full py-2 px-3 border border-coolGray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  />
                </label>

                {/* Category */}
                <label className="block mb-4">
                  <span className="block text-coolGray-800 font-medium mb-1">Category</span>
                  <Select
                      options={options}
                      value={options.find((o) => o.value === formData.category) || null}
                      onChange={handleSelectChange}
                  />
                </label>

                {/* Content */}
                <label className="block mb-6">
                  <span className="block text-coolGray-800 font-medium mb-1">Content (HTML)</span>
                  <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your post content — include <strong>HTML</strong> if needed"
                      className="w-full h-40 resize-vertical py-3 px-4 border border-coolGray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  />
                  <div className="mt-4 p-4 bg-gray-100 border border-coolGray-200 rounded-lg">
                    <strong>Preview:</strong>
                    <div
                        className="mt-2 prose"
                        dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                  </div>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-white font-medium bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  {loading ? "Updating…" : "Update"}
                </button>
              </div>
            </form>
        )}
      </div>
  );
};

export default UpdatePost;
