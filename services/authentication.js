const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET 

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  return JWT.sign(payload, secret, { expiresIn: "1d" });
}

function validateToken(token) {
  try {
    return JWT.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
