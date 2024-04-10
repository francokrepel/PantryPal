const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new mongoose.Schema({
   name:String,
   email: {
      type: String,
      unique: true
   },
   password:String
})

const UserModel = mongoose.model("users", userSchema) // defined where we wanna use our model in our database

module.exports = UserModel