const socketIo = require('socket.io');
const userModel = require('./models/userModel');
const captainModel = require('./models/captainModel');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log("User Socket ID Updated")
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log("Captain Socket ID Updated")
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
        
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
        
            try {
                // console.log("Received location update from captain:", data);
        
                // Update captain's location with the correct format
              const cpataininradius= await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',  // GeoJSON type
                        coordinates: [location.lng, location.lat]  // Correct order [longitude, latitude]
                    }
                });
                // console.log("the captain only which is in radius is ",cpataininradius)
                const captainsall=await captainModel.find()
                // console.log("bhag bsda bhag bsda bhag bsda bhag bsda",captainsall,location)
        
                // console.log(`Location updated for captain ${userId}`);
        
                // Emit to all clients (you can adjust this to a specific user based on ride info, etc.)
                io.emit('captain-location-update', {
                    userId,
                    location,
                });
        
            } catch (error) {
                console.error("Failed to update location:", error);
            }
        });
        
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {



    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}
const cancelride=()=>{
    io.emit('ride-cancel');

}
const cancelrideuser=()=>{

    io.emit('ended-ride')
}

module.exports = { initializeSocket, sendMessageToSocketId, cancelride ,cancelrideuser};