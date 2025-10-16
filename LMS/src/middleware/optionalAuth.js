const jwt = require('jsonwebtoken');

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development_secret');
    req.userId = decoded.sub;
    req.userRole = decoded.role;
  } catch (error) {
    // ignore invalid tokens but remove user context
    req.userId = undefined;
    req.userRole = undefined;
  }

  return next();
}

module.exports = optionalAuth;
