import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const CUSTOM_POSTS_KEY = "mini-blog-custom-posts";

export default function PostDetailPage() {
  const { id } = useParams();
   console.log("DETAIL ID = ", id);

  // Try to load from API first
  const {
    data: apiPost,
    loading: loadingPost,
    error: errorPost
  } = useFetch(id ? `${POST_URL}/${id}` : null, { skip: !id });

  // Also look for a custom post in localStorage (for newly created posts)
  let localPost = null;
  if (typeof window !== "undefined" && id) {
    try {
      const raw = localStorage.getItem(CUSTOM_POSTS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          localPost = arr.find((p) => String(p.id) === String(id)) || null;
        }
      }
    } catch (err) {
      console.error("Failed to read custom posts for detail view", err);
    }
  }

  const post = apiPost || localPost;

  // Load author from API only if userId is within JSONPlaceholder range
  const {
    data: apiAuthor,
    loading: loadingAuthor,
    error: errorAuthor
  } = useFetch(
    post && post.userId ? `${USERS_URL}/${post.userId}` : null,
    { skip: !post || !post.userId }
  );

  const author = apiAuthor || null;

  const isLoading = loadingPost || loadingAuthor;
  const error = errorPost || errorAuthor;

  return (
    <section className="space-y-4">
      <Link to="/" className="btn-outline text-xs">
        ← Back to list
      </Link>

      {isLoading && <Loader message="Loading post details..." />}

      {error && !post && <ErrorMessage message={error} />}

      {!isLoading && post && (
        <article className="card p-5 space-y-4">
          <header className="space-y-2">
            <h1 className="text-lg font-semibold capitalize">{post.title}</h1>
            {author && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                <span className="badge">{author.name}</span>
                <span>·</span>
                <a
                  href={author.email ? `mailto:${author.email}` : "#"}
                  className="underline underline-offset-2"
                >
                  {author.email || "No email"}
                </a>
              </div>
            )}
          </header>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line">
            {post.body}
          </p>

          {author && (
            <section className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
              <h2 className="text-xs font-semibold mb-2">Author details</h2>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <span className="font-semibold">Name:</span> {author.name}
                </p>
                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {author.username || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {author.company?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Website:</span>{" "}
                  {author.website ? (
                    <a
                      href={`http://${author.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      {author.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </section>
          )}
        </article>
      )}

      {!isLoading && !post && !error && (
        <ErrorMessage message="Post not found." />
      )}
    </section>
  );
}
