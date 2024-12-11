const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
require('dotenv').config();
console.log(uri)
mongoose.set('strictQuery',false)

exports.connect=()=>{
   mongoose.connect(uri).then(()=>{
      console.log("SuccessFully connected to Database")
   }).catch((error)=>{
     console.log("Database connection failed.")
     console.log(error)
     process.exit(1)
   })
}