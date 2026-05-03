// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token (Assuming token comes in as "Bearer <token>")
    const tokenString = token.split(' ')[1]; 
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    
    // Add user info to the request
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};