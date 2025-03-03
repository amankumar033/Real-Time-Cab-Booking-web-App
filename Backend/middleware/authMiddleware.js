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
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);
    const blacklistToken = await blackListTokenModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: "You are blacklisted" });
    }
if (!token) {
  return res.status(401).json({ message: "You are not authorized" });}
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  }
    catch(err){
        return res.status(401).json({ message: "You are not authorized ! ERROR" });
    }
}