const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
    }, 
    fare: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
    }, 
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentID:{
        type: String,
    },
    orderID:{
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        select:false
    },
});

module.exports = mongoose.model('Ride', rideSchema);