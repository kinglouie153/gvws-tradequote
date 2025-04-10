import React from "react";

const CSVUpload = ({ label, onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      onUpload(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default CSVUpload;
