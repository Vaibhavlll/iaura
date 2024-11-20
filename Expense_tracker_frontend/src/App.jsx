import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import HomePage from './components/Home';
import Dashboard from './components/Dashboard';
import DeleteExpense from './components/DeleteExpense';
import SortedExpenseList from './components/ViewlList';
import PieChart from './components/PieChart';
import UpdateExpense from './components/UpdateExpense';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUsername('');
  };

  // Fetch expenses if the user is authenticated
  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchUsername();
    }
  }, [token]);

  // Function to fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenseRoutes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Function to fetch username
  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const { token, user } = response.data;
      setToken(token);
      setUsername(user.username); // Store username after login
      localStorage.setItem('token', token); // Store token in localStorage
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setToken={setToken} onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Add route for the dashboard */}
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard token={token} username={username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Other routes */}
          <Route
            path="/add"
            element={
              <ProtectedRoute token={token}>
                <AddExpense token={token} fetchExpenses={fetchExpenses} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expenses"
            element={
              <ProtectedRoute token={token}>
                <ExpenseList token={token} /> {/* Pass the token here */}
              </ProtectedRoute>
            }
          />

          <Route
            path="/view"
            element={
              <ProtectedRoute token={token}>
                <SortedExpenseList expenses={expenses} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute token={token}>
                <DeleteExpense fetchExpenses={fetchExpenses} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pie"
            element={
              <ProtectedRoute token={token}>
                <PieChart token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute token={token}>
                <UpdateExpense />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
