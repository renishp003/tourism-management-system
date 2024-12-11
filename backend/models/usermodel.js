const mongoose = require('mongoose');
const UserRoles = require('../enums/enums')


let userSchema =new mongoose.Schema(
    {
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        match:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    firstname:{
        type:String,
        trim:true,
        require:true,
    },
    lastname:{
        type:String,
        trim:true,
        require:true,
    },
    mobile:{
        type:String,
        trim:true,
        require:true,
        
    },
    role:{
        type:String,
        enum:Object.values(UserRoles),
        default:UserRoles.USER
    }
   }, 
   {
    timestamps:true
   }
)
const User = mongoose.model('users',userSchema);
module.exports = User;