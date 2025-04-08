const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const rideController = require('../controllers/rideController')
const {body} = require('express-validator');
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

module.exports = router;