require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/user")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("MongoDB connection error:", err));


app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})