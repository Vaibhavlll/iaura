import React from 'react';
import axios from 'axios';

const DeleteExpense = ({ expenseId, onDeleteConfirm, onCancel }) => {
  const handleDelete = async () => {
    try {
      console.log(`Attempting to delete expense with ID: ${expenseId}`);
      const response = await axios.delete(`http://localhost:5000/api/expenseRoutes/delete/${expenseId}`);
      console.log('Delete response:', response.data);
      alert('Expense deleted successfully.');
      onDeleteConfirm(expenseId); // Notify parent component
    } catch (error) {
      console.error('Error deleting expense:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to delete expense. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="delete-modal">
      <p>Are you sure you want to delete this expense?</p>
      <div className="modal-buttons">
        <button onClick={handleDelete} className="btn-confirm">
          Yes, Delete
        </button>
        <button onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteExpense;