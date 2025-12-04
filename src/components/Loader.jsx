import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400" />
      <span>{message}</span>
    </div>
  );
}
