import React, { useState } from "react";
import Papa from "papaparse";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Settings = () => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const handleUpload = (e, setter, storageKey) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setter(results.data);
        localStorage.setItem(storageKey, JSON.stringify(results.data));
        alert(`${storageKey} uploaded successfully.`);
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Upload Items CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleUpload(e, setItems, "items")}
          className="block p-2 border rounded w-full"
        />
      </Card>

      <Card className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Upload Customers CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleUpload(e, setCustomers, "customers")}
          className="block p-2 border rounded w-full"
        />
      </Card>

      <Card className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Upload Users CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleUpload(e, setUsers, "users")}
          className="block p-2 border rounded w-full"
        />
      </Card>

      <Card className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Upload Events CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleUpload(e, setEvents, "uploadedEvents")}
          className="block p-2 border rounded w-full"
        />
      </Card>
    </div>
  );
};

export default Settings;
