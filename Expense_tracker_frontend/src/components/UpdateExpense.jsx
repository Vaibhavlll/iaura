import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const UpdateExpense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingExpense = location.state?.editingExpense;

  // Ensure hooks are called first, before any conditional returns
  const [description, setDescription] = useState(editingExpense?.description || '');
  const [amount, setAmount] = useState(editingExpense?.amount || '');
  const [date, setDate] = useState(editingExpense?.date?.slice(0, 10) || '');
  const [category, setCategory] = useState(editingExpense?.category || '');

  // Early return if the expense is not found
  if (!editingExpense || !editingExpense._id) {
    console.error('Invalid expense ID.');
    return <p>Error: No valid expense to edit.</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const endpoint = `http://localhost:5000/api/expenseRoutes/expense/${editingExpense._id}`;
    const updatedExpense = { description, amount, date, category };

    try {
      const response = await axios.put(endpoint, updatedExpense, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Expense updated successfully:', response.data);
      alert('Expense updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating expense:', error.response?.data || error.message);
      alert('Failed to update expense.');
    }
  };

  return (
    <div>
      <h2>Update Expense</h2>
      <form onSubmit={handleUpdate}>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateExpense;
