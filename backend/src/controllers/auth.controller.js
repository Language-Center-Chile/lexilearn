const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashedPassword);

    const token = generateToken(userId);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error on register', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error on login', error });
  }
};

module.exports = { register, login };
