const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const userSchema = mongoose.Schema({
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
        type:email,
        require:true,
    
    },
    socketid:{
        type:String,
        require:true,
    },
}) 
userSchema.methods.generateAuthToken = function(){
    const token =jwt.sign({_id:this.id},process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('user',userSchema);
module.exports=userModel;