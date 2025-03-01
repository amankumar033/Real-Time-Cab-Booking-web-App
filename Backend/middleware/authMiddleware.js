const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../models/blackListTokenModel");

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