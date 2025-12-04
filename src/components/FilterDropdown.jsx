import React from "react";

export default function FilterDropdown({ users, value, onChange }) {
  return (
    <div className="w-full sm:w-52">
      <label className="label" htmlFor="userFilter">
        Filter by author
      </label>
      <select
        id="userFilter"
        className="input-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All authors</option>
        {users?.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name ?? `User ${u.id}`}
          </option>
        ))}
      </select>
    </div>
  );
}
