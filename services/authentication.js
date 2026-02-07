const JWT = require("jsonwebtoken");

const secret = "12373@aagw";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,   
    email: user.email,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, {
    expiresIn: "1d", 
  });
  return token;
}

function validateToken(token) {
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return null; 
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};         
