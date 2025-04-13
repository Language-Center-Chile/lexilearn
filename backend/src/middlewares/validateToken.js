const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    console.log('🔎 Headers recibidos:', req.headers); // 👈 log importante

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = validateToken;
