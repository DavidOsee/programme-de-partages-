const express = require('express')
const router = express.Router()

const {Home, Ajouter, Editer, DownloadFile} = require('../controllers/mainControllers')

//GET 
router.get('/', Home)
router.get('/download', DownloadFile)

//POST 
router.post('/add', Ajouter)
router.patch('/edit', Editer)

//EXPORTS TO SERVER 
module.exports = router 

