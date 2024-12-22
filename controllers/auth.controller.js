const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET, JWT_EXPIRY, JWT_REFRESH_EXPIRY } = require('../config/auth');


const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!email) return res.status(404).json({ message: 'Email is required' });
  if (!username) return res.status(404).json({ message: 'Username is required' });
  if (!password) return res.status(404).json({ message: 'Password is required' });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });
    
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });
  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const newAccessToken = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.status(200).json({ accessToken: newAccessToken });
  });
};

module.exports = { register, login, refreshToken };
