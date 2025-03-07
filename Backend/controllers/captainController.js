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
module.exports.loginCaptain = async (req, res) => {
   const errors = validationResult(req);
   console.log("Validation Errors login:", errors.array()); // Debugging step 
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    try {
      const { email, password } = req.body;
      const captain = await captainModel.findOne({ email }).select("+password");
      if (!captain) {
        return res.status(400).json({ errors: [{ msg: "Captain not found" }] });
      }
      const tokenblack = req.cookies.token || req.headers.authorization?.split(" ")[1];

      
      const isTokenBlackListed = await blackListTokenModel.findOne({ tokenblack});
  
      if (isTokenBlackListed) {
        console.log("the token is blacklisted",isTokenBlackListed);
        return res.status(401).json({ errors: [{ msg: "You are blacklisted" }] });
      }
      if (!captain) {
        return res.status(400).json({ errors: [{ msg: "Captain not found" }] });
      }
      const isMatch = await captain.comparePassword(password);
      console.log(password)
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      } 
      
      if (captain && isMatch) {
      
      const token = captain.generateAuthToken();
      res.cookie("token", token);
      res.json({ token, captain });
      console.log("the token generated this time is",token,"for capatain",captain);
      console.log("Login successful");
      }
    }
    catch (err) {
      console.error("Error:", err);
      res.status(500).json({ errors: err });
    }
};
module.exports.getCaptainProfile = async (req, res) => {
  res.status(201).json({captain:req.captain});
  console.log("Captain Profile");
}
module.exports.logOutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }

  const savedToken = await blackListTokenModel.create({ token });

  console.log("Saved Token Document:", savedToken); // Log the saved document
  console.log("Saved Token Value:", savedToken.token); 
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
  console.log("Captain logged out");
}


