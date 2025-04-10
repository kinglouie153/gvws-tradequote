import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Header from "../components/Header";

export default function Landing({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Welcome to TradeQuote" user={user} />

      <div className="flex justify-center items-center mt-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center space-y-6">
          {/* GVWS Logo */}
          <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md text-lg font-semibold">
            GVWS Logo
          </div>

          {/* TradeQuote Logo */}
          <div className="w-full h-20 bg-gray-100 flex items-center justify-center rounded-md text-base font-medium">
            TradeQuote Logo
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate("/new-quote")}
            >
              New Quote
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate("/saved-quotes")}
            >
              Saved Quotes
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate("/reports")}
            >
              Reports
            </Button>
            {user?.role === "admin" && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigate("/settings")}
              >
                Settings
              </Button>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:underline mt-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
