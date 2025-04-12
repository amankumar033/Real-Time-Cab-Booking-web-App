const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const db = require("./db");
const userRoute = require("./routes/userRoute");
const captainRoute = require("./routes/captainRoute");
const mapsRoute = require("./routes/mapsRoute");
const rideRoutes = require("./routes/rideRoute");

db();

// const mongoose = require("mongoose");
// async function clearDatabase() {
//     await mongoose.connection.dropDatabase();
//     console.log("Database dropped.");
// }
// clearDatabase();


// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/captain", captainRoute);
app.use("/maps", mapsRoute);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = app; 
