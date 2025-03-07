const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captainController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register",[ 
     body("fullname.firstname").isString().isLength({min:3}).withMessage("First name must be 3 characters long"),
     body("email").isEmail().withMessage("Email is not valid"),
     body("password").isLength({min:3}).withMessage("Password must be 3 characters long"),
     body("vehicle.color").isString().isLength({min:3}).withMessage("Color must be 3 characters long"),
     body("vehicle.plate").isString().isLength({min:3}).withMessage("Plate must be 3 characters long"),
     body("vehicle.capacity").isNumeric().withMessage("Capacity must be a number").custom(value => value > 1) .withMessage("Capacity must be greater than 1"),
     body("vehicle.vehicleType").isString().isIn(['car','bike','auto']).withMessage("Vehicle type must be car, bike or auto"),
     body("location.lan").isNumeric().withMessage("Lan must be a number"),
     body("location.lat").isNumeric().withMessage("Lat must be a number")
    ],captainController.registerCaptain);
router.post("/login",[
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({min:3}).withMessage("Password must be 3 characters long")
],captainController.loginCaptain);
router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);
module.exports = router;
router.get("/logout",authMiddleware.authCaptain,captainController.logOutCaptain);