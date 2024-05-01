const express = require('express')
const router = express.Router() // function w express frawmework that allows to use router within routes folder
const cors = require('cors') // allows us to ocnnext to different hosts
const { test, registerUser, loginUser, getProfile} = require('../controllers/authController') // import test into router

// middleware
router.use(
    cors({
        credentials: true,
        origin: '*'
    })
)

router.get('/', test) 
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router //export it to our entr-level file