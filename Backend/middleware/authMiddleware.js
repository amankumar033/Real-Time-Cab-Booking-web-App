const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../models/blackListTokenModel");
const captainModel = require("../models/captainModel");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const blacklistToken = await blackListTokenModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: "You are not authorized" });
    }
if (!token) {
  return res.status(401).json({ message: "You are not authorized" });}
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id
    );
    req.user = user;
    return next();
  }
    catch(err){
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
    console.log("Received Token:", token); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
        return res.status(401).json({ message: "Captain not found" });
    }

    req.captain = captain;
    return next();
} catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ message: 'Unauthorized Error In Message' });
}

}