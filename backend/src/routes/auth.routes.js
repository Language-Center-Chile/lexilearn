const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const validateToken = require('../middlewares/validateToken'); // ✅ esto está bien


router.post('/register', register);
router.post('/login', login);

// ⚠️ esta línea genera el error si validateToken está mal importado
router.get('/profile', validateToken, (req, res) => {
  res.json({ message: 'Token válido ✅', user: req.user });
});

module.exports = router;
