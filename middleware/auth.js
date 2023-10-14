const { tokenVerifier } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid!' });
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = tokenVerifier(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token salah!' });
  }
};

module.exports = {
  authentication,
};