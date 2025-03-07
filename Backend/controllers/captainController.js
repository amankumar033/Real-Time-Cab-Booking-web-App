const { validationResult } = require("express-validator");
const captainModel = require("../models/captainModel");
const blackListTokenModel = require("../models/blackListTokenModel");
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
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainModel.create({
      fullname:{

        firstname:fullname.firstname,
        lastname:fullname.lastname,
      },
      email,
      password:hashPassword,
      vehicle,
      location,
      vehicleType:vehicle.vehicleType,
      status,
      capacity:vehicle.capacity, 
      color:vehicle.color, 
      plate:vehicle.plate
    });
    console.log("Created Captain debugging:", captain);

    res.status(201).json({ captain });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ errors: err });
  }
};
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select('+password');

  if (!captain) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = captain.generateAuthToken();

  res.cookie('token', token);

  res.status(200).json({ token, captain });
}
module.exports.getCaptainProfile = async (req, res) => {
  res.status(201).json({captain:req.captain});
  console.log("Captain Profile");
}
module.exports.logOutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

  await blackListTokenModel.create({ token });

  res.clearCookie('token');

  res.status(200).json({ message: 'Logout successfully' });
}
