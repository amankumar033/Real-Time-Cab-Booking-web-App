const mongoose=require("mongoose");

function connectToDb(){
mongoose.connect(`${process.env.MONGODB_URL}/uber`)
.then(function(){
    console.log("DB connected")
})