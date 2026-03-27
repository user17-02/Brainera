const auth = require('./auth');

module.exports = function (req, res, next) {
  auth(req, res, () => {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Instructors or admins only.' });
    }
    next();
  });
};
