import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Button } from "../components/ui/button";

const supabase = createClient(
  "https://xgnyftlfodavbyhwmmml.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnbnlmdGxmb2RhdmJ5aHdtbW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNDMwMzcsImV4cCI6MjA1OTgxOTAzN30.O_MkuOyNSNqw1Epi_JA6w7rQK0HLHBt_tXvKwkBSp1s"
);

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const { data, error: loginError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (loginError || !data) {
      setError("Invalid login credentials");
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setUser(data); // <--- this is what was missing
      navigate("/landing");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-24 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleLogin} className="w-full">Login</Button>
    </div>
  );
};

export default Login;
