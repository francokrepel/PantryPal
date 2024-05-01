const express = require('express')
require('dotenv').config();
const cors = require('cors') // CORS definesway for client web apps loaded in one domain to interact with resources in a different domain.
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

// connecting to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("MongoDB connection error:", err))
  
/* Middleware functions: in Express are functions that have access to the request object (req), the response object (res),
 and the next middleware function in the application’s request-response cycle. They can execute any code, make changes to 
 the request and response objects, end the request-response cycle, or call the next middleware function. */
app.use(express.json()) // parses json data
app.use(cookieParser())
app.use(express.urlencoded({extended: false})) // configures middleware to parse application/x-www-form-urlencoded request bodies
app.set("trust proxy", 1);
app.use('/', require('./routes/authRoutes')) // we want all routes to go through forward slash, in authRoutes we will define what actual route we want
/*
 your main server file (index.js), including recipeRoutes allows you to define a base path for all routes defined in the recipeRoutes router. 
 In this case, /api. This means that any route defined in recipeRoutes.js will be prefixed with /api, so /recipes becomes /api/recipes.
*/
app.use('/api', require('./routes/recipeRoutes')) // Adding this line to include recipe routes
app.use('/user', require('./routes/userRoutes'))

const port = process.env.PORT || 8000;  // Use the PORT environment variable, or 8000 if it's not set
app.listen(port, () => console.log(`server is running on port ${port}`))