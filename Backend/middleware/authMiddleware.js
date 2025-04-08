const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../models/blackListTokenModel");
const captainModel = require("../models/captainModel");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const blacklistToken = await blackListTokenModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: "You are Blacklisted " });
    }
if (!token) {
  return res.status(401).json({ message: "No User Found" });}
  try {
    console.log("Token to verify:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
  
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
  
    req.user = user;
    return next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return res.status(401).json({ message: "You are not authorized" });
  }
  
  
}
module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


  if (!token) {
      return res.status(401).json({ message: 'Unauthorized Token Not Found' });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });



  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findById(decoded._id)
      req.captain = captain;

      return next()
  } catch (err) {
      console.log(err);

      res.status(401).json({ message: 'Unauthorized Error' });
  }
}