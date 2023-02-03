const express = require('express')
const router = express.Router()

const {Home} = require('../controllers/mainControllers')

//GET 
router.get('/', Home)

//POST 

//EXPORTS TO SERVER 
module.exports = router 

