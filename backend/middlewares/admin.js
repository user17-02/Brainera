const auth = require('./auth');

module.exports = function (req, res, next) {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
  });
};
