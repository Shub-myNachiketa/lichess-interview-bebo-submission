"use client";

import { useState, useEffect } from "react";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const encodedUsername = encodeURIComponent(username); // Encode the username to prevent special char issues
    const API_URL = `https://lichess.org/api/user/${encodedUsername}`; // Use dynamic username in the URL

    setLoading(true);
    setError(null);

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

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data available.</div>;

  const { username: userName, profile, perfs, count } = userData;
  const bio = profile?.bio || 'No bio available';
  const bulletRating = perfs?.bullet?.rating || 'N/A';
  const blitzRating = perfs?.blitz?.rating || 'N/A';
  const rapidRating = perfs?.rapid?.rating || 'N/A';
  const classicalRating = perfs?.classical?.rating || 'N/A';
  const totalGames = count?.all || 0;

  const profileImageUrl = `https://www.gravatar.com/avatar/${userData.id}?d=identicon&s=200`;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Profile Information</h2>
      <div>
        <img
          src={profileImageUrl}
          alt="Profile Image"
          width="150"
          height="150"
          style={{ borderRadius: '50%' }}
        />
      </div>

      <p><strong>Username:</strong> {userName}</p>
      <p><strong>Bio:</strong> {bio}</p>
      <p><strong>Total Games Played:</strong> {totalGames}</p>

      <h3>Ratings:</h3>
      <ul>
        <li><strong>Bullet:</strong> {bulletRating}</li>
        <li><strong>Blitz:</strong> {blitzRating}</li>
        <li><strong>Rapid:</strong> {rapidRating}</li>
        <li><strong>Classical:</strong> {classicalRating}</li>
      </ul>

      <h3>Game Stats:</h3>
      <ul>
        <li><strong>Wins:</strong> {count?.win}</li>
        <li><strong>Losses:</strong> {count?.loss}</li>
        <li><strong>Draws:</strong> {count?.draw}</li>
      </ul>

      <p><a href={userData.url} target="_blank" rel="noopener noreferrer">Visit Profile</a></p>
    </div>
  );
};

export default Profile;