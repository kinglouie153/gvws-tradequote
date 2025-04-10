import React from "react";

const SearchBar = ({ items = [], value, onChange, onSelect }) => {
  const filteredItems = items.filter(
    (item) =>
      item.Description?.toLowerCase().includes(value.toLowerCase()) ||
      item.SKU?.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filteredItems.length > 0 && (
        <ul className="mt-2 max-h-48 overflow-y-auto border rounded bg-white shadow">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(item)}
            >
              <strong>{item.Description}</strong> ({item.SKU})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
