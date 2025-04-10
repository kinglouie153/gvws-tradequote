import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function SavedQuotes({ user }) {
  const [quotes, setQuotes] = useState([]);
  const [editingQuote, setEditingQuote] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("quotes");
    if (stored) {
      setQuotes(JSON.parse(stored));
    }
  }, []);

  const startEdit = (quote) => {
    setEditingQuote(JSON.parse(JSON.stringify(quote))); // deep clone
  };

  const cancelEdit = () => setEditingQuote(null);

  const saveEdit = () => {
    const updated = quotes.map((q) =>
      q.id === editingQuote.id ? editingQuote : q
    );
    setQuotes(updated);
    localStorage.setItem("quotes", JSON.stringify(updated));
    setEditingQuote(null);
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...editingQuote.items];
    updated[index].quantity = parseInt(value) || 0;
    setEditingQuote({ ...editingQuote, items: updated });
  };

  const handlePriceChange = (index, value) => {
    const updated = [...editingQuote.items];
    updated[index].price = parseFloat(value) || 0;
    setEditingQuote({ ...editingQuote, items: updated });
  };

  const canEditCustomer =
    user.role === "admin" || editingQuote?.salesRep === user.email;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Saved Quotes" user={user} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Filters placeholder */}
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

        {/* Quote edit form */}
        {editingQuote ? (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">
                  Editing Quote #{editingQuote.id}
                </div>
                <div className="space-x-2">
                  <Button onClick={saveEdit}>Save</Button>
                  <Button variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Customer Section */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="p-2 border rounded w-full"
                  value={editingQuote.customer.name}
                  onChange={(e) =>
                    setEditingQuote({
                      ...editingQuote,
                      customer: {
                        ...editingQuote.customer,
                        name: e.target.value,
                      },
                    })
                  }
                  disabled={!canEditCustomer}
                  placeholder="Customer Name"
                />
                <input
                  type="text"
                  className="p-2 border rounded w-full"
                  value={editingQuote.customer.phone}
                  onChange={(e) =>
                    setEditingQuote({
                      ...editingQuote,
                      customer: {
                        ...editingQuote.customer,
                        phone: e.target.value,
                      },
                    })
                  }
                  disabled={!canEditCustomer}
                  placeholder="Phone"
                />
              </div>

              {/* Event + Date */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="p-2 border rounded w-full"
                  value={editingQuote.date}
                  onChange={(e) =>
                    setEditingQuote({ ...editingQuote, date: e.target.value })
                  }
                  disabled={!canEditCustomer}
                />
                <input
                  type="text"
                  className="p-2 border rounded w-full"
                  value={editingQuote.event}
                  onChange={(e) =>
                    setEditingQuote({ ...editingQuote, event: e.target.value })
                  }
                  disabled={!canEditCustomer}
                  placeholder="Event"
                />
              </div>

              {/* Quote Items */}
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="p-2">Item</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-center">Price</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {editingQuote.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        <div>{item.Description}</div>
                        <div className="text-xs text-gray-500">{item.SKU}</div>
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          className="w-16 text-center border rounded"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          className="w-20 text-center border rounded"
                          value={item.price}
                          onChange={(e) =>
                            handlePriceChange(index, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2 text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4 font-bold text-right">
                Total: $
                {editingQuote.items
                  .reduce(
                    (sum, item) =>
                      sum + (item.quantity || 0) * (item.price || 0),
                    0
                  )
                  .toFixed(2)}
              </div>
            </CardContent>
          </Card>
        ) : (
          quotes.map((quote) => (
            <Card key={quote.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">Quote #{quote.id}</div>
                  <div className="text-sm text-gray-500">
                    {quote.customer.name} – {quote.date} – {quote.event}
                  </div>
                </div>
                <Button onClick={() => startEdit(quote)}>Edit</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
