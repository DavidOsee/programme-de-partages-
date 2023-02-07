const express = require('express')
const router = express.Router()

const {Home, Ajouter, Editer} = require('../controllers/mainControllers')

//GET 
router.get('/', Home)

//POST 
router.post('/add', Ajouter)
router.patch('/edit', Editer)

//EXPORTS TO SERVER 
module.exports = router 

