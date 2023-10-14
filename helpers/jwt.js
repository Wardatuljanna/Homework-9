const jwt = require('jsonwebtoken');

const tokenSign = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY || 'inirahasia', { expiresIn: '1h' });
  return token;
};

const tokenVerifier = (token) => {
  const data = jwt.verify(token, process.env.JWT_KEY || 'inirahasia');
  return data;
};

module.exports = { tokenSign, tokenVerifier };