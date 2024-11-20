import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = ({ onAdd, onBack }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    if (!description || !amount || !date || !category) {
      setError('Please fill in all fields');
      return;
    }

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }

    const expenseData = { description, amount, date, category };

    try {
      const response = await axios.post('http://localhost:5000/api/expenseRoutes/add', expenseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Expense added successfully');
      onAdd(response.data); // Pass the newly added expense to parent
      onBack(); // Navigate back to the expense list view
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
      setError('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="add-expense-container dark-theme">
      <h2 className="form-heading">Add New Expense</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label className="label">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical/Healthcare">Medical/Healthcare</option>
            <option value="Insurance">Insurance</option>
            <option value="Household Items/Supplies">Household Items/Supplies</option>
            <option value="Personal">Personal</option>
            <option value="Retirement">Retirement</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Expense</button>
      </form>
      <button onClick={onBack} className="back-button">Back to List</button>
    </div>
  );
};

export default AddExpense;
