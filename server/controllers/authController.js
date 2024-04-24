const User = require('../models/user')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req, res) => {
    res.json('test is working') // testing to make sure endpoints are working, send back json
}

const registerUser = async (req, res) => { // async as its asynchronous function since req data from db
    try {
        // we wanna take in request body, but add middleware since we needa parse data so we can accept requested info
        const {name, email, password} = req.body
        // check if everything entered
        if (!name) {
            return res.json({
                error: 'Must enter name'
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password must be at least 6 characters'
            })
        }
        // check if email exists in db
        const exist = await User.findOne({email}) // await as its asynchronus function to request data from database
        if (exist) {
            return res.json({
                error: 'Email is already in use'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({ // create is mongodb function to create User in db
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.json({
                error: 'Please enter an email and a password'
            })
        }
        // check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return res.json({
                error: 'No user found with this email'
            })
        }
        // check if password exists
        const passwordMatches = await comparePassword(password, user.password)
        if (passwordMatches) {
            /* create JSON token (cookie) to user to track them throughout app
            wt.sign signs token (so only we know whats going on, therefore we make secret for this sign) */
            // jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            //     if (err) throw err
            //     res.cookie('token', token).json(user) // sets a cookie in the client's browser named token and assigning it value of variable token
            // })
            jwt.sign({ email: user.email, _id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    // httpOnly: true, // Protects against XSS
                    // secure: true, // Ensure cookie is sent over HTTPS
                    // sameSite: 'Lax', // CSRF protection
                    // maxAge: 3600000 // Sets the expiration time of the cookie in milliseconds
                }).json(user) // sets a cookie in the client's browser named token and assigning it the value of the variable token
            });
        } else {
            res.json({
                error: 'Incorrect password'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}


