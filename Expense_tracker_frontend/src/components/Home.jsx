import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to Expense Tracker</h2>
      <div className="form-container">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
