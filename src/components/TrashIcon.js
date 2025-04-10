import React from "react";
import { Trash2 } from "lucide-react";

const TrashIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-red-500 hover:text-red-700 transition-colors"
    aria-label="Delete"
  >
    <Trash2 size={20} />
  </button>
);

export default TrashIcon;
