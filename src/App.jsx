import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PostsListPage from "./pages/PostsList";
import PostDetailPage from "./pages/PostDetail";
import CreatePostPage from "./pages/CreatePost";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route
          path="*"
          element={
            <div className="text-sm text-slate-500 dark:text-slate-300">
              Page not found.
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

