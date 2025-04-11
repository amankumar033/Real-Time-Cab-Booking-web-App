const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
         type:String,
         require:true,
        },
        lastname:{
        type:String,
        require:true,
    }},
    password:{
        type:String,
        require:true,
        minlength:[4,"Password must be at least 3 digit long"],
        select:false
    },
    email:{
        type:String,
        require:true,
    
    },
    socketid:{
        type:String,
        require:true,
    },
}) 
userSchema.methods.generateAuthToken = function(){
    const token =jwt.sign({_id:this.id},process.env.JWT_SECRET, {expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('User',userSchema);
module.exports=userModel;