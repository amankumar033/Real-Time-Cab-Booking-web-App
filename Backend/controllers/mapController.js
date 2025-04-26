const mapService = require('../services/mapService');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        //   console.log(distanceTime);
        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.getdirection = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract query parameters
        const { origin, destination } = req.query;
        
        // Validate if from and to are present
        if (!origin || !destination) {
            return res.status(400).json({ message: 'Missing origin or destination' });
        }

        // Log the inputs to see what is being passed
        // console.log('From:', origin, 'To:', destination);

        // Call the getroutes method with proper lat and lng
        const direction = await mapService.getdirection(origin, destination);
        // console.log('direction Data:', direction);

        res.status(200).json(direction);

    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {
console.log("reached till here consoling")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(address);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
