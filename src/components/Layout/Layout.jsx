import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-20">
        <div className="container max-w-5xl flex items-center justify-between py-3 gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">
              MB
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Mini Blog Dashboard</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Posts · Search · Create
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  isActive
                    ? "font-semibold bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-300"
                }`
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  isActive
                    ? "font-semibold bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-300"
                }`
              }
            >
              Create
            </NavLink>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* ⭐ THE IMPORTANT PART ⭐ */}
      <main className="container max-w-5xl py-6">
        <Outlet /> {/* This replaces {children}, required for routing */}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 mt-8">
        <div className="container max-w-5xl py-4 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
          <span>JSONPlaceholder · Demo data only</span>
          <span>Built with React, Vite & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}