const { validationResult } = require("express-validator");
const captainModel = require("../models/captainModel");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  console.log("Validation Errors:", errors.array()); // Debugging step

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, vehicle, status, location} = req.body;
    const isCaptainExist = await captainModel.findOne({ email });
    if(isCaptainExist){
      return res.status(400).json({errors:[{msg:"Captain already exists"}]});
    }
    const captain = await captainModel.create({
      fullname:{

        firstname:fullname.firstname,
        lastname:fullname.lastname,
      },
      email,
      password,
      vehicle,
      location,
      vehicleType:vehicle.vehicleType,
      status,
      capacity:vehicle.capacity, 
      color:vehicle.color, 
      plate:vehicle.plate
    });

    res.status(201).json({ captain });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ errors: err });
  }
};
