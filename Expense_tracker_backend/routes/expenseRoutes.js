const express = require('express');
const router = express.Router();
const { getExpenses, getUser, createExpense, updateExpense, deleteExpense, getPieChartData, editExpense } = require('../controller/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all expenses for a user
router.get('/expenses', authMiddleware, getExpenses);

// Get a single user (Authenticated)
router.get('/expenses/:id', authMiddleware, getUser);

// Create a new expense
router.post('/add', authMiddleware, createExpense);

// Update an expense by ID
router.put('/expense/:id', updateExpense);

// Delete an expense by ID
router.delete('/delete/:id', deleteExpense);

// Get pie chart data (aggregate expenses by category)
router.get('/pie', authMiddleware, getPieChartData);

router.get('/exp/:id', editExpense);

module.exports = router;