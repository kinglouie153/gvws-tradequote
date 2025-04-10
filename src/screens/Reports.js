import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Reports({ user }) {
  const [quotes, setQuotes] = useState([]);
  const [totalsByRep, setTotalsByRep] = useState({});

  useEffect(() => {
    // Sample quote data
    const sampleQuotes = [
      { id: 1001, total: 420, rep: "admin@gvws.com", event: "Champs Vegas", date: "2025-04-08" },
      { id: 1002, total: 260, rep: "rep1@gvws.com", event: "Champs Chicago", date: "2025-04-07" },
      { id: 1003, total: 300, rep: "admin@gvws.com", event: "Champs Vegas", date: "2025-04-06" },
    ];

    // Filtered visibility for Sales Rep (if needed)
    const visibleQuotes =
      user.role === "admin"
        ? sampleQuotes
        : sampleQuotes.filter((q) => q.rep === user.email);

    setQuotes(visibleQuotes);

    // Group totals by rep
    const repTotals = {};
    visibleQuotes.forEach((q) => {
      repTotals[q.rep] = (repTotals[q.rep] || 0) + q.total;
    });
    setTotalsByRep(repTotals);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Reports" user={user} />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <input type="date" className="border p-2 rounded" />
              <select className="border p-2 rounded">
                <option>All Sales Reps</option>
                <option>admin@gvws.com</option>
                <option>rep1@gvws.com</option>
              </select>
              <select className="border p-2 rounded">
                <option>All Events</option>
              </select>
            </div>
            <Button className="bg-blue-500 text-white">Apply Filters</Button>
          </CardContent>
        </Card>

        {/* Totals by Rep */}
        {Object.entries(totalsByRep).map(([rep, total]) => (
          <Card key={rep}>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="font-medium">{rep}</div>
              <div className="text-lg font-bold">${total.toFixed(2)}</div>
            </CardContent>
          </Card>
        ))}

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Email Report</Button>
          <Button className="bg-blue-500 text-white">Print Report</Button>
        </div>
      </div>
    </div>
  );
}
