const userModel= require("../models/userModel")

module.exports.createUser = async({firstname,lastname,email,password})=>{
   
    if(!firstname || !email || !password){
        throw new Error("Enter  Details")
    }
    else{
        
        const user = userModel.create({
            fullname:{
                firstname,lastname
            },
            email,
            password
        })
        return user;
    }
}