import React, { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import PostList from "../components/PostList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const CUSTOM_POSTS_KEY = "mini-blog-custom-posts";

export default function PostsListPage() {
  const {
    data: posts,
    loading: loadingPosts,
    error: errorPosts,
    setData: setPosts,
  } = useFetch(POSTS_URL);

  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch(USERS_URL);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");

  // Merge custom posts from localStorage
  useEffect(() => {
    const mergeCustomPosts = () => {
      if (!posts) return;

      try {
        const raw = localStorage.getItem(CUSTOM_POSTS_KEY);
        if (!raw) return;

        const customPosts = JSON.parse(raw);
        if (!Array.isArray(customPosts)) return;

        const existingIds = new Set(posts.map((p) => p.id));

        const newPosts = customPosts
          .map((cp) => ({
            id: cp.id,
            title: cp.title,
            body: cp.body,
            userId: Number(cp.userId),
          }))
          .filter((cp) => !existingIds.has(cp.id));

        if (newPosts.length > 0) {
          setPosts((prev) => [...newPosts, ...prev]);
        }
      } catch (err) {
        console.error("Failed merging custom posts", err);
      }
    };

    // Merge once on mount
    mergeCustomPosts();

    // Merge when a new post is created
    window.addEventListener("custom-post-created", mergeCustomPosts);

    return () => {
      window.removeEventListener("custom-post-created", mergeCustomPosts);
    };
  }, [posts, setPosts]);

  // Filter logic
  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesUser =
        selectedUser === "all" ||
        String(post.userId) === String(selectedUser);

      return matchesSearch && matchesUser;
    });
  }, [posts, search, selectedUser]);

  const anyLoading = loadingPosts || loadingUsers;
  const anyError = errorPosts || errorUsers;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-1">Posts</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse posts from JSONPlaceholder. Use search and filters to narrow
            down.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <SearchBar value={search} onChange={setSearch} />
          <FilterDropdown
            users={users}
            value={selectedUser}
            onChange={setSelectedUser}
          />
        </div>
      </header>

      {anyLoading && <Loader message="Fetching posts..." />}
      {anyError && (
        <ErrorMessage message={anyError || "Failed to load data."} />
      )}

      {!anyLoading && !anyError && (
        <PostList posts={filteredPosts} users={users} />
      )}
    </section>
  );
}
