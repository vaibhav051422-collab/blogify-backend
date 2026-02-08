const { validateToken } = require("../services/authentication");

function checkAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const user = validateToken(token);
    req.user = user || null;
  } catch {
    req.user = null;
  }

  next();
}

module.exports = checkAuth;
