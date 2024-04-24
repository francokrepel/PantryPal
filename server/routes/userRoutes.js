const express = require('express')
const router = express.Router()
const { handleFavorite, getFavorites} = require('../controllers/userController')

router.post('/handleFavorite', handleFavorite);
router.get('/getFavorites', getFavorites);
module.exports = router