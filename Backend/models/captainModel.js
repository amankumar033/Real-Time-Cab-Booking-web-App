const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const capatinSchema =new  mongoose.Schema({
  fullname:{
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }
  },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum :['active','inactive'],
        default:'inactive'
    },
    vehicle:{
         color:{
                type:String,
                required:true,
                minlength:[3,"Color must be 3 characters long"]
         },
         plate:{
            type:String,
            required:true,
            minlength:[3,"Plate must be 3 characters long"]
         },
         capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be greater than 1"]
         },
         vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
         }
    },
    location:{
        lan:{
            type:Number,
        },
        lat:{
            type:Number,
        }

    }

})
capatinSchema.method.generateAuthToken= function(){
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
cpatainSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}  
capatinSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel = mongoose.create('captain',capatinSchema);
module.exports = captainModel;