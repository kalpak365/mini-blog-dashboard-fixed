import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-white dark:bg-yellow-400 dark:text-slate-900"
        aria-hidden
      >
        {theme === "light" ? "☀" : "☾"}
      </span>
      <span>{theme === "light" ? "Light" : "Dark"} mode</span>
    </button>
  );
}
