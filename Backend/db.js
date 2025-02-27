const mongoose=require("mongoose");

mongoose.connect(`${process.env.MONGODB_URL}/uber`)
.then(function(){
    console.log("DB connected")
})
.catch(function(err){
    console.log(err)
})
module.exports=mongoose.connection;