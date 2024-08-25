const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { username, email, password,city,phone } = req.body;


  if (!username || !email || !password || !city || !phone) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }

  const connection = await pool.getConnection();
  try {
    // Checking  if the email already exists
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hashing the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const [rows] = await connection.query('INSERT INTO users (username, email, password,city,phone) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword,city,phone]);
    const userId = rows.insertId;

    res.status(201).json({ id: userId, username, email,city,phone, token: generateToken(userId) });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  } finally {
    connection.release();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const connection = await pool.getConnection();
  try {
    // Find the user by email
    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ id: user.id, username: user.username, email: user.email, token: generateToken(user.id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login' });
  } finally {
    connection.release();
  }
};
