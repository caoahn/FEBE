const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )
}

module.exports = { generateAccessToken, generateRefreshToken };
