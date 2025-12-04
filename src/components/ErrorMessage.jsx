import React from "react";

export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-900 dark:text-red-200 flex items-center justify-between gap-4">
      <span>{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-xs font-semibold underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
