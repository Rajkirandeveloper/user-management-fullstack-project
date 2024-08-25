const pool = require('../config/db');

exports.getProfile = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT id, username, email,city,phone FROM users WHERE id = ?', [req.user.id]);
    const user = rows[0];

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } finally {
    connection.release();
  }
};

exports.updateProfile = async (req, res) => {
    const { username, email, city, phone } = req.body;
    const userId = req.user.id;
  
    if (!username && !email && !city && !phone) {
      return res.status(400).json({ message: 'No fields to update' });
    }
  
    const connection = await pool.getConnection();
    try {

      let query = 'UPDATE users SET ';
      const values = [];
      
      if (username) {
        query += 'username = ?, ';
        values.push(username);
      }
      if (email) {
        query += 'email = ?, ';
        values.push(email);
      }
      if (city) {
        query += 'city = ?, ';
        values.push(city);
      }
      if (phone) {
        query += 'phone = ?, ';
        values.push(phone);
      }
  
      // Remove trailing comma and space
      query = query.slice(0, -2);
      query += ' WHERE id = ?';
      values.push(userId);
  
      await connection.query(query, values);
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error updating profile' });
    } finally {
      connection.release();
    }
  };
  

