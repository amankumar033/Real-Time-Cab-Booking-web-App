const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainSchema =new  mongoose.Schema({
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
        required:false
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
captainSchema.method.generateAuthToken= function(){
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}  
captainSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel = mongoose.model('captain',captainSchema);
module.exports = captainModel;