const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');  // To enable cross-origin requests (useful for frontend)

dotenv.config();

// Initialize express app
const app = express();

// Connect to the database using the environment variable for DB URI
connectDB();

// Middleware for CORS and parsing JSON requests
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow frontend URL or all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // If you are using cookies in the frontend
}));

app.use(express.json());  // Parse incoming JSON requests

// Auth Routes
app.use('/api/auth', authRoutes);

// Expense Routes
app.use('/api/expenseRoutes', expenseRoutes);

// Global error handler (catch-all for unhandled routes)
app.use((err, req, res, next) => {
  console.error(err);  // Log the error for debugging purposes
  res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
