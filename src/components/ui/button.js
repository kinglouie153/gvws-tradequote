import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
