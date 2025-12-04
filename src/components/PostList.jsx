import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts, users }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No posts match your filters.
      </p>
    );
  }

  const getAuthorName = (userId) =>
    users?.find((u) => u.id === userId)?.name ?? null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          authorName={getAuthorName(post.userId)}
        />
      ))}
    </div>
  );
}
