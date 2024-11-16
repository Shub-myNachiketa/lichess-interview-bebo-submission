import { useState } from "react";

const Navbar = ({ setActiveTab }) => {
  return (
    <div style={styles.headerContainer}>
      <h1 style={styles.header}>Lichess (Neeti Submission)</h1>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <button onClick={() => setActiveTab("profile")} style={styles.navButton}>
              Profile
            </button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveTab("leaderboard")} style={styles.navButton}>
              Leaderboard
            </button>
          </li>
          <li style={styles.navItem}>
            <button onClick={() => setActiveTab("tournament")} style={styles.navButton}>
              Tournaments
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  header: {
    color: "white",
    fontSize: "36px",
    margin: 0,
  },
  navbar: {
    backgroundColor: "#007bff",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px", // Space between the nav items
  },
  navButton: {
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;
