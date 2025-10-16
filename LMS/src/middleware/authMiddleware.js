const jwt = require('jsonwebtoken');

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development_secret');
      req.userId = decoded.sub;
      req.userRole = decoded.role;

      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = auth;
