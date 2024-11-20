Full-Stack Project


This is a full-stack project that consists of a frontend built with React and a backend built with Node.js and Express.

Table of Contents
Project Setup,
Frontend Setup,
Backend Setup,
Running the Project,
Environment Variables,
Before setting up both the frontend and backend, make sure you have the following installed:

Node.js (LTS version recommended) - Install Node.js
npm (Node Package Manager) - Comes bundled with Node.js
Git - Install Git

Frontend Setup
1. Navigate to the frontend directory:
cd expense_tracker_frontend

2. Install dependencies:
npm install

3. Running the frontend:
npm start
This will launch the React app on http://localhost:3000 by default.

Backend Setup
cd expense_tracker_backend

2. Install dependencies:
npm install

3. Running the backend:
npm start
This will start the backend server, which by default runs on http://localhost:5000.


Environment Variables
Create a .env file in the backend folder with the following contents:
PORT=5000
DATABASE_URL=mongodb://your-database-url
SECRET_KEY=your-secret-key

Make sure to replace your-database-url and your-secret-key with the actual values for project.
