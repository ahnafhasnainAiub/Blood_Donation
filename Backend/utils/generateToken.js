const jwt = require('jsonwebtoken');

const generateToken = (userId, email, userType) => {
  const payload = { userId, email, userType };
  const secret = process.env.JWT_SECRET || 'your_secret_key'; // Ensure you have a secure secret

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

module.exports = generateToken;
