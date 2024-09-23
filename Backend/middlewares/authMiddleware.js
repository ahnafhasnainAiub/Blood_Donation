const jwt = require('jsonwebtoken');
const Donor = require('./../models/Donor');

const authMiddleware = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const decoded = jwt.verify(token, secret);


    if (!decoded) {
      return res.status(404).json({ msg: 'Invalid Token' });
    }

    req.user = decoded;
    next();
    
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { authMiddleware };




// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const secret = process.env.JWT_SECRET || 'your_secret_key';
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = { authMiddleware };
