const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// A simple "Route" to test if the server works
app.get('/', (req, res) => {
  res.send('Your Second Brain Server is Running! 🧠');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});