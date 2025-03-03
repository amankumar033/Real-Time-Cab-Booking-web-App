const captainModel = require("../models/captainModel");

module.exports.createCaptain = async({firstname,lastname, email, password, status, vehicle})=>{
    if(!firstname || !email || !password || !status || !vehicle){
        res.json("Incomplete Details")
    }
     const captain = captainModel.create({
      fullname:{
            firstname,lastname
    },
    email,
    password,
    status,
    vehicle     
     })
     return captain;
}