import React, { useState, useEffect, useCallback } from 'react';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import SortedExpenseList from './ViewlList';
import Piechart from './PieChart';

const Dashboard = ({ token, username, onLogout }) => { // Ensure username is passed as a prop
  const [expenses, setExpenses] = useState([]);
  const [view, setView] = useState('list');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenseRoutes/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [token, fetchExpenses]);

  const handleAddClick = () => {
    setView('add');
    setIsDropdownOpen(false);
  };

  const handleViewClick = () => {
    setView('list');
    setIsDropdownOpen(false);
  };

  const handleSortedViewClick = () => {
    setView('sorted');
    setIsDropdownOpen(false);
  };

  const handlePiechart = () => {
    setView('pie');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function from props
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Expense Tracker</h2>
        {username && <p className="username">Welcome, {username}</p>} {/* Display username here */}
        <div className="dropdown">
          <button onClick={toggleDropdown} className="btn-dropdown">Actions</button>
          <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
            <button onClick={handleAddClick}>Add Expense</button>
            <button onClick={handleViewClick}>View/Edit Expenses</button>
            <button onClick={handleSortedViewClick}>Expense List</button>
            <button onClick={handlePiechart}>PieChart</button>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <main className="main-content">
        <div className="content-card">
          <h1 className="card-title">
            {view === 'list' && 'Expenses Overview'}
            {view === 'add' && '-'}
            {view === 'sorted' && 'Expense List'}
            {view === 'pie' && 'Expense Breakdown'}
          </h1>

          {view === 'list' && <ExpenseList expenses={expenses} />}
          {view === 'add' && (
            <AddExpense
              onBack={handleViewClick}
              onAdd={(newExpense) => {
                setExpenses((prev) => [...prev, newExpense]);
                setView('list');
              }}
            />
          )}
          {view === 'sorted' && <SortedExpenseList token={token} />}
          {view === 'pie' && <Piechart token={token} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
