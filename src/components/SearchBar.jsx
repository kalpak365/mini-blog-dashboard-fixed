import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full sm:w-64">
      <label className="label" htmlFor="search">
        Search by title
      </label>
      <input
        id="search"
        type="text"
        className="input-base"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
