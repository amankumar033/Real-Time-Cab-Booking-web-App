const captainModel = require("../models/captainModel");

module.exports.createCaptain = async({firstname,lastname, email, password, status, vehicleType, capacity, color, plate})=>{
    if(!firstname || !email || !password || !status || !vehicleType || !color || !plate || !capacity){
        throw new Error('All fileds are required')
    }
     const captain = await captainModel.create({
      fullname:{
            firstname,lastname
    },
    email,
    password,
    status,
    vehicleType,
    capacity,
    plate,
    color
     }) 
     return captain;
}