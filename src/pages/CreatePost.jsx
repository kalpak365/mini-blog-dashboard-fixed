import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const CUSTOM_POSTS_KEY = "mini-blog-custom-posts";

const initialForm = {
  title: "",
  body: "",
  userId: ""
};

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { data: users, loading, error } = useFetch(USERS_URL);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Clear success message when form changes
    setSuccessMessage("");
  }, [form.title, form.body, form.userId]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.body.trim()) newErrors.body = "Body is required.";
    if (!form.userId) newErrors.userId = "Author is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSuccessMessage("");
    try {
      const res = await fetch(POSTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json = await res.json();

      // Add to localStorage so it appears in Posts list
      const newPost = {
        ...json,
        id: Date.now(),
        userId: Number(form.userId),
        title: form.title,
        body: form.body
      };

      try {
        const existingRaw = localStorage.getItem(CUSTOM_POSTS_KEY);
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newPost, ...(Array.isArray(existing) ? existing : [])];
        window.dispatchEvent(new Event("custom-post-created"));


        window.dispatchEvent(new Event("custom-post-created"));
        
      } catch (err) {
        console.error("Failed to store custom post", err);
      }

      setSuccessMessage("Post created successfully (simulated). It will appear in the list.");
      setForm(initialForm);
    } catch (err) {
      setErrors({ api: err.message || "Failed to create post." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-5 max-w-xl">
      <header>
        <h1 className="text-xl font-semibold mb-1">Create new post</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This will send a POST request to JSONPlaceholder and add the post locally.
        </p>
      </header>

      {loading && <Loader message="Loading authors..." />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        {errors.api && <ErrorMessage message={errors.api} />}

        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="input-base"
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Enter a descriptive title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            className="input-base min-h-[120px] resize-y"
            value={form.body}
            onChange={handleChange("body")}
            placeholder="Write your post content here..."
          />
          {errors.body && (
            <p className="mt-1 text-xs text-red-500">{errors.body}</p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="userId">
            Author
          </label>
          <select
            id="userId"
            className="input-base"
            value={form.userId}
            onChange={handleChange("userId")}
            disabled={loading || !users}
          >
            <option value="">Select an author</option>
            {users?.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} (User {u.id})
              </option>
            ))}
          </select>
          {errors.userId && (
            <p className="mt-1 text-xs text-red-500">{errors.userId}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-outline text-xs"
          >
            Cancel
          </button>
        </div>

        {successMessage && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}
