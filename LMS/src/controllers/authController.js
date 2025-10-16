const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(user) {
  const payload = {
    sub: user._id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'development_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function formatUser(user) {
  const { _id, name, email, role, createdAt, updatedAt } = user;
  return { id: _id, name, email, role, createdAt, updatedAt };
}

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);
    return res.status(201).json({ user: formatUser(user), token });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({ user: formatUser(user), token });
  } catch (error) {
    return next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: formatUser(user) });
  } catch (error) {
    return next(error);
  }
};
