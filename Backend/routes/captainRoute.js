const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captainController");

router.get("/register",[ 
     body("fullname.firstname").isString().isLength({min:3}).withMessage("First name must be 3 characters long"),
     body("email").isEmail().withMessage("Email is not valid"),
     body("password").isLength({min:[3,"Password must be 5 characters long"]}),
     body("vehicle.color").isString().isLength({min:3}).withMessage("Color must be 3 characters long"),
     body("vehicle.plate").isString().isLength({min:3}).withMessage("Plate must be 3 characters long"),
     body("vehicle.capacity").isNumeric().isLength({min:1}).withMessage("Capacity must be greater than 1"),
     body("vehicle.vehicleType").isString().isIn(['car','bike','auto']).withMessage("Vehicle type must be car, bike or auto"),
     body("location.lan").isNumeric().withMessage("Lan must be a number"),
     body("location.lat").isNumeric().withMessage("Lat must be a number")
    ],captainController.registerCaptain);

module.exports = router;