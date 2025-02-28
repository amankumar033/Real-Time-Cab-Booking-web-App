const express = require ("express")
const router = express.Router();
const userController = require("../controllers/userController")
const {body} = require("express-validator");
router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Enter name wih length more than 2'),
    body('password').isLength({min:4}).withMessage('Password length must be grater than 3'),
],userController.registerUser)
module.exports=router;