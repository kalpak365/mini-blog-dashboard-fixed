import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, authorName }) {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="card flex flex-col p-4 hover:-translate-y-0.5 transition-transform"
    >
      <h2 className="text-sm font-semibold line-clamp-2 mb-2">
        {post.title}
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-3">
        {post.body}
      </p>
      <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="badge">
          {authorName ? authorName : `User ${post.userId}`}
        </span>
        <span>View details →</span>
      </div>
    </Link>
  );
}
