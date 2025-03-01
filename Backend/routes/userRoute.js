const express = require ("express")
const router = express.Router();
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const {body} = require("express-validator");
router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Enter name wih length more than 2'),
    body('password').isLength({min:4}).withMessage('Password length must be grater than 3'),
],userController.registerUser)
router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:4}).withMessage('Password length must be grater than 3'),
],userController.loginUser)
router.get("/profile",authMiddleware.authUser,userController.getUserProfile)
router.get("/logout",authMiddleware.authUser,userController.logOutUser)
module.exports=router;