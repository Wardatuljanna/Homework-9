const pool = require('../config/db');
const { tokenSign } = require('../helpers/jwt');

const registerUser = async (req, res) => {
  try {
      const { email, password, gender, role, id } = req.body;
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR id = $2', [email, id]);
      if (existingUser.rows.length > 0) {
          return res.status(400).json({ message: 'Email atau ID sudah terdaftar!' });
      }
      const result = await pool.query(
          'INSERT INTO users (id, email, password, gender, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, gender, role',
          [req.body.id, req.body.email, req.body.password, req.body.gender, req.body.role]
      );
      if (result.rows.length > 0) {
          const newUser = result.rows[0];
          res.status(201).json({ user: newUser, message: 'Registrasi user berhasil!' });
      } else {
          res.status(500).json({ message: 'Tidak dapat membuat user baru' });
      }
  } catch (error) {
      console.error('Kesalahan registrasi user:', error);
      res.status(500).json({ message: 'Kesalahan saat registrasi user' });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
      const user = result.rows[0];
  
      console.log('User:', user);
  
      if (user) {
        const token = tokenSign(user);
        res.status(200).json({ user, access_token: token });
      } else {
        res.status(401).json({ message: 'email atau password salah!' });
      }
    } catch (error) {
      console.error('Kesalahan saat login:', error);
      res.status(500).json({ message: 'Kesalahan saat login', error: error.message });
    }
  };
  
const getUsers = (req, res) => {
    pool.query(
      `SELECT * FROM users ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error!' });
          return;
        }
        res.json(results.rows);
      }
    );
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
};