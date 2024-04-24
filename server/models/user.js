const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
   name: String,
   email: {
      type: String,
      unique: true,
      required: true 
   },
   password: {
      type: String,
      required: true  
   },
   savedRecipes: [String]  
});

const UserModel = mongoose.model("users", userSchema); 

module.exports = UserModel;
