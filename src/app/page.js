"use client";

import { useState } from "react";
import Navbar from "../components/nav";
import Profile from "../components/profile";
import Leaderboard from "../components/leaderboard";
import Tournament from "../components/tournament";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Fetching data for username:', username);

    setUserData(null);

    fetchUserData(username);
  };

  const fetchUserData = async (username) => {
    const encodedUsername = encodeURIComponent(username);
    const API_URL = `https://lichess.org/api/user/${encodedUsername}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Navbar setActiveTab={setActiveTab} />

      <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            Submit
          </button>
        </form>
      </div>

      {activeTab === "profile" && (
        <div style={{ textAlign: "center" }}>
          <Profile username={username} />
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div style={{ textAlign: "center" }}>
          <Leaderboard />
        </div>
      )}

      {activeTab === "tournament" && (
        <div style={{ textAlign: "center" }}>
          <Tournament />
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default HomePage;