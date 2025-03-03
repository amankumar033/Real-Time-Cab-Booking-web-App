const { validationResult } = require("express-validator");
const captainModel = require("../models/captainModel");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  console.log("Validation Errors:", errors.array()); // Debugging step

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, vehicle, location } = req.body;
    const captain = await captainModel.create({
      fullname,
      email,
      password,
      vehicle,
      location,
    });

    res.status(201).json({ captain });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ errors: err });
  }
};
