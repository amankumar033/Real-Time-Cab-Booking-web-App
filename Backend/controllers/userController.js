const { validationResult } = require("express-validator");
const userModel=require("../models/userModel");
const userService = require("../services/userServices")
const blackListTokenModel = require("../models/blackListTokenModel");
module.exports.registerUser = async (req,res,next)=>{
       const error=validationResult(req);
       if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
       }

       const {fullname,email,password}=req.body;
       const hashPassword=await userModel.hashPassword(password);
       const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    })

    const token=await user.generateAuthToken();
    res.status(201).json({user,token});
}
module.exports.loginUser = async (req,res,next)=>{
    const error=validationResult(req);
    
    if(!error.isEmpty()){
     return res.status(400).json({error:error.array()});
    }
    const {email,password}=req.body;
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Password"});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token)

    if(user && isMatch){
        res.json({token,user})
    }
}
module.exports.getUserProfile = async (req,res,next)=>{
    res.json(req.user);
}
module.exports.logOutUser = async (req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    const blacklistToken = blackListTokenModel.create({token})
    res.json({message:"Logged out successfully"});
}
 