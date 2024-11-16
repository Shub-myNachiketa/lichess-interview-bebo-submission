"use client";

import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [perfType, setPerfType] = useState("bullet"); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const perfTypes = [
    "ultraBullet",
    "bullet",
    "blitz",
    "rapid",
    "classical",
    "chess960",
    "crazyhouse",
    "antichess",
    "atomic",
    "horde",
    "kingOfTheHill",
    "racingKings",
    "threeCheck",
  ];

  const fetchLeaderboard = async (perfType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://lichess.org/api/player/top/100/${perfType}`
      );

      if (!response.ok) throw new Error("Failed to fetch leaderboard");

      const data = await response.json();
      setUsers(data.users); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(perfType);
  }, [perfType]);

  return (
    <div className="container">
      <h2 className="center">Leaderboard</h2>

      <div className="center" style={{ marginBottom: "20px" }}>
        <label htmlFor="perfType" style={{ fontSize: "16px", marginRight: "10px" }}>
          Select Performance Type:
        </label>
        <select
          id="perfType"
          value={perfType}
          onChange={(e) => setPerfType(e.target.value)}
          className="perf-select"
        >
          {perfTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && users.length > 0 && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Title</th>
                <th>Rating</th>
                <th>Progress</th>
                <th>Online</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.title || "N/A"}</td>
                  <td>{user.perfs[perfType]?.rating || "N/A"}</td>
                  <td>{user.perfs[perfType]?.progress || "N/A"}</td>
                  <td>{user.online ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="center" style={{ marginTop: "20px" }}>No users found.</div>
      )}
    </div>
  );
};

export default Leaderboard;
