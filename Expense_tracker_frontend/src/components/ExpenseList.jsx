import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteExpense from './DeleteExpense'; // Import DeleteExpense component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ExpenseList = ({ token }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // To manage the ID of the expense to delete
  const [editingExpense, setEditingExpense] = useState(null); // To manage the expense being edited

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch expenses on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token provided.');
      setLoading(false);
      return;
    } 
    
    axios
      .get('http://localhost:5000/api/expenseRoutes/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Fetched Expenses:', response.data);
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch expenses.');
        setLoading(false);
        console.error('Error fetching expenses:', error);
      });
  }, []);

  const handleDeleteConfirm = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== id)
    );
    setDeleteId(null); // Close the delete modal
  };

  const handleCancelDelete = () => {
    setDeleteId(null); // Close the delete modal
  };

  const handleEdit = (expense) => {
    navigate(`/expense`, { state: { editingExpense: expense } }); // Pass the expense as state
  };
  
  
  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;
  if (expenses.length === 0) return <p>No expenses found. Add some expenses!</p>;

  return (
    <div>
      <h2></h2>

      <table className="expense-table" style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date (mm/dd/yyyy)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category || 'N/A'}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(expense)} // Edit button triggers the form
                >
                  <i className="fas fa-edit"></i> {/* Edit icon */}
                </button>

                <button
                  className="btn-delete"
                  onClick={() => setDeleteId(expense._id)} // Trigger delete modal
                >
                  <i className="fas fa-trash"></i> {/* Delete icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <DeleteExpense
          expenseId={deleteId}
          token={token} // Pass token to DeleteExpense
          onDeleteConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ExpenseList;
