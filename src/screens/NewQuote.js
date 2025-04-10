import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import SearchBar from "../components/SearchBar";
import TrashIcon from "../components/TrashIcon";
import Modal from "../components/Modal";
import { Button } from '../components/ui/button';
import { Card, CardContent } from "../components/ui/card";

const NewQuote = () => {
  const [items, setItems] = useState([]);
  const [quoteItems, setQuoteItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [event, setEvent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    contactFirstName: "",
    contactLastName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [customerCollapsed, setCustomerCollapsed] = useState(false);
  const [customerMatches, setCustomerMatches] = useState([]);

  useEffect(() => {
    const loaded = localStorage.getItem("activeQuote");
    if (loaded) {
      const quote = JSON.parse(loaded);
      setCustomer(quote.customer);
      setQuoteItems(quote.items);
      setEvent(quote.event || "");
      setDate(quote.date ? quote.date.split("T")[0] : date);
      localStorage.removeItem("activeQuote");
    }
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    const storedCustomers = localStorage.getItem("customers");
    const storedEvents = localStorage.getItem("uploadedEvents");

    if (storedItems) setItems(JSON.parse(storedItems));
    if (storedCustomers) setCustomerList(JSON.parse(storedCustomers));
    if (storedEvents) setEventList(JSON.parse(storedEvents));
  }, []);

  const addItemToQuote = (item) => {
    const existingIndex = quoteItems.findIndex((i) => i.SKU === item.SKU);
    if (existingIndex !== -1) {
      const updated = [...quoteItems];
      updated[existingIndex].quantity += 1;
      setQuoteItems(updated);
    } else {
      setQuoteItems([
        ...quoteItems,
        { ...item, quantity: 1, price: parseFloat(item.Price || 0) },
      ]);
    }
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...quoteItems];
    updated[index].quantity = parseInt(value);
    setQuoteItems(updated);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...quoteItems];
    updated[index].price = parseFloat(value);
    setQuoteItems(updated);
  };

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));

    if (field === "name") {
      if (value.length >= 4) {
        const matches = customerList.filter((cust) =>
          cust.name?.toLowerCase().startsWith(value.toLowerCase())
        );
        setCustomerMatches(matches);
      } else {
        setCustomerMatches([]);
      }
    }
  };

  const handleCustomerSelect = (selectedName) => {
    const matched = customerList.find((cust) =>
      cust.name?.toLowerCase() === selectedName.toLowerCase()
    );
    if (matched) {
      setCustomer({
        ...matched,
        contactFirstName: matched.contactFirstName || "",
        contactLastName: matched.contactLastName || "",
      });
      setCustomerMatches([]);
    }
  };

  const clearQuote = () => {
    setShowModal(false);
    setQuoteItems([]);
    setCustomer({
      name: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      contactFirstName: "",
      contactLastName: "",
    });
    setEvent("");
  };

  const total = quoteItems.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );

  const filteredItems = searchTerm.length === 0 ? items : items.filter((item) =>
    item.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.SKU?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <Modal
        isOpen={showModal}
        onConfirm={clearQuote}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to clear the quote? All unsaved data will be lost."
      />

      <Card className="p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Customer Info</h2>
          <Button onClick={() => setCustomerCollapsed(!customerCollapsed)}>
            {customerCollapsed ? "Expand" : "Collapse"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 relative">
          <div>
            <input
              type="text"
              className="p-4 rounded border w-full"
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) => handleCustomerChange("name", e.target.value)}
            />
            {customerMatches.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded shadow w-full mt-1">
                {customerMatches.map((match, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCustomerSelect(match.name)}
                  >
                    {match.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            className="p-4 rounded border w-full"
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) => handleCustomerChange("phone", e.target.value)}
          />
        </div>
        {!customerCollapsed && (
          <div className="grid grid-cols-3 gap-4">
            <input type="text" className="p-4 rounded border w-full" placeholder="Address 1" value={customer.address1} onChange={(e) => handleCustomerChange("address1", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="Address 2" value={customer.address2} onChange={(e) => handleCustomerChange("address2", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="City" value={customer.city} onChange={(e) => handleCustomerChange("city", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="State" value={customer.state} onChange={(e) => handleCustomerChange("state", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="Zip" value={customer.zip} onChange={(e) => handleCustomerChange("zip", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="Email" value={customer.email} onChange={(e) => handleCustomerChange("email", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="Contact First Name" value={customer.contactFirstName} onChange={(e) => handleCustomerChange("contactFirstName", e.target.value)} />
            <input type="text" className="p-4 rounded border w-full" placeholder="Contact Last Name" value={customer.contactLastName} onChange={(e) => handleCustomerChange("contactLastName", e.target.value)} />
          </div>
        )}
      </Card>

      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input type="date" className="p-2 rounded border w-full" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Event</label>
            <select className="p-2 rounded border w-full" value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="">Select Event</option>
              {eventList.map((ev, i) => (
                <option key={i} value={ev.name}>{ev.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 h-[600px]">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSelect={addItemToQuote}
              />
            </div>
            <div className="flex justify-between font-semibold px-2 bg-gray-100 py-1 rounded">
              <span>Item</span>
              <span className="pr-4">Price</span>
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between px-2 py-1 border-b cursor-pointer hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  onClick={() => addItemToQuote(item)}
                >
                  <div>
                    <div className="font-bold">{item.SKU}</div>
                    <div className="text-sm text-gray-600">{item.Description}</div>
                  </div>
                  <div className="text-right pr-4">${parseFloat(item.Price).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 h-[600px] flex flex-col justify-between">
          <div className="overflow-y-auto max-h-[500px]">
            <table className="w-full mb-4">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Item</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {quoteItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50 align-top" : "align-top"}>
                    <td className="p-2">
                      <div>{item.Description}</div>
                      <div className="text-xs text-gray-500">{item.SKU}</div>
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        className="w-16 border rounded px-2 py-1 text-center"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        className="w-24 border rounded px-2 py-1 text-center"
                        value={item.price}
                        onChange={(e) => handlePriceChange(index, e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <button onClick={() => setQuoteItems(quoteItems.filter((_, i) => i !== index))}>
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 pt-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  const existing = JSON.parse(localStorage.getItem("quotes") || "[]");
                  const nextId = existing.length > 0 ? Math.max(...existing.map(q => q.id)) + 1 : 1001;
                  const newQuote = {
                    id: nextId,
                    customer,
                    items: quoteItems,
                    total,
                    date,
                    event,
                    salesRep: "Placeholder Rep",
                  };
                  localStorage.setItem("quotes", JSON.stringify([...existing, newQuote]));
                  alert(`Quote #${nextId} Saved!`);
                }}
              >Save</Button>
              <Button onClick={() => alert("Quote Emailed")}>Email</Button>
              <Button onClick={() => alert("Quote Printed")}>Print</Button>
              <Button onClick={() => setShowModal(true)}>Clear Quote</Button>
            </div>
            <div className="font-bold text-center pt-2">Total: ${total.toFixed(2)}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewQuote;
