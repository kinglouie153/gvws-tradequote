import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./screens/Landing";
import NewQuote from "./screens/NewQuote";
import SavedQuotes from "./screens/SavedQuotes";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import Login from "./screens/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/landing" /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/landing" /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/landing"
          element={
            user ? <Landing user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/new-quote"
          element={
            user ? <NewQuote user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/saved-quotes"
          element={
            user ? <SavedQuotes user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/reports"
          element={
            user ? <Reports user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/settings"
          element={
            user && user.role === "admin" ? <Settings /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
