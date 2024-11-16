"use client";

import { useEffect, useState } from "react";

const Tournament = () => {
  const [tournaments, setTournaments] = useState({
    created: [],
    started: [],
    finished: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch("https://lichess.org/api/tournament");
        if (!res.ok) {
          throw new Error("Failed to fetch tournaments");
        }
        const data = await res.json();
        setTournaments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const getStatus = (status) => {
    switch (status) {
      case 10:
        return "Started";
      case 0:
        return "Upcoming";
      case 1:
        return "Finished";
      default:
        return "Unknown";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Ongoing Tournaments</h2>

      {loading && <p>Loading tournaments...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <TournamentTable tournaments={tournaments.started} status="Ongoing" />
      </div>
    </div>
  );
};

const TournamentTable = ({ tournaments, status }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Tournament Name</th>
          <th style={styles.th}>Variant</th>
          <th style={styles.th}>Start Time</th>
          <th style={styles.th}>End Time</th>
          <th style={styles.th}>Players</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.length === 0 ? (
          <tr>
            <td colSpan="6">No {status} tournaments</td>
          </tr>
        ) : (
          tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.fullName}</td>
              <td>{tournament.variant.name}</td>
              <td>{tournament.startsAt}</td>
              <td>{tournament.finishesAt}</td>
              <td>{tournament.nbPlayers}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

// Simple styling for the table
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "white",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
};

export default Tournament;
