const Expense = require('../models/expenseModel'); // Adjust path as needed
const User = require('../models/userModel'); // Ensure User model is correctly imported

// Get all expenses for a user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }); // Filter by userId from the token
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: 'No expenses found for this user.' });
    }
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
};

// Get a single user (Authenticated)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user); // `req.user` should be set by `authMiddleware`
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Respond with user data
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;

    // Validate required fields
    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: 'All fields (description, amount, date, category) are required' });
    }

    // Check if user is attached by the middleware
    if (!req.user) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    // Parse date into a valid Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Create new expense
    const newExpense = new Expense({
      description,
      amount,
      date: parsedDate,
      category,
      userId: req.user._id, // Attach userId from the decoded token
    });

    // Save expense to the database
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error creating expense:', err); // Log full error
    res.status(500).json({ message: 'Failed to create expense', error: err.message });
  }
};


// Update an expense by ID
const updateExpense =async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, category } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { description, amount, date, category },
      { new: true } // Return the updated document
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense.' });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    if (!expenseId) {
      return res.status(400).json({ message: 'Invalid request. Expense ID is required.' });
    }
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error(`Error deleting expense: ${err.message}`);
    res.status(500).json({ message: 'Failed to delete expense', error: err.message });
  }
};


// Aggregate expenses by category for Pie chart (Authenticated)
const getPieChartData = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: '$category',  // Group by category
          totalAmount: { $sum: '$amount' },  // Sum the amounts for each category
        },
      },
      {
        $project: {
          category: '$_id',  // Rename _id to category
          value: '$totalAmount',  // Rename totalAmount to value
          _id: 0,  // Exclude _id from the result
        },
      },
    ]);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err });
  }
};

const editExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expense data.' });
  }
};
// const getPieChartData = async (req, res) => {
//   try {
//     const userId = req.user; // Extract the logged-in user's ID from the middleware

//     // Check if userId is available
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is missing from request' });
//     }

//     // Log the userId to verify it's correct
//     console.log('Fetching pie chart data for user:', userId);

//     // Aggregate expenses by category for the logged-in user
//     const expenses = await Expense.aggregate([
//       { $match: { userId: userId } }, // Filter expenses by userId
//       { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } }, // Group by category and sum amounts
//       { $project: { category: '$_id', value: '$totalAmount', _id: 0 } } // Rename and exclude _id
//     ]);

//     // Check if expenses are returned
//     if (!expenses || expenses.length === 0) {
//       return res.status(200).json({ message: 'No expense data available for pie chart' });
//     }

//     // Log the fetched expenses to ensure they are correctly aggregated
//     console.log('Fetched expenses data:', expenses);

//     res.status(200).json(expenses);
//   } catch (err) {
//     console.error('Error fetching pie chart data:', err); // Log the error for debugging
//     res.status(500).json({ message: 'Failed to fetch pie chart data', error: err.message });
//   }
// };

module.exports = {
  getExpenses,
  getUser,
  createExpense,
  updateExpense,
  deleteExpense,
  getPieChartData,
  editExpense
};
