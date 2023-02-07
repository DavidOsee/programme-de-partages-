//DOTENV
require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./config/db')

//PARSERS 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Script and Css files for the static view 
app.use(express.static('public'))

//VIEW SETTINGS 
const {engine} = require('express-handlebars')
app.engine('.hbs', engine({extname : '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


//Middleware imports 
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/404')


//Middleware init 
//app.use(notFound) //# 404 redirect
app.use(errorHandler)


//ROUTES 
const mainRoutes = require('./routes/mainRoutes')
app.use('/', mainRoutes)


//CONNECT DB 
connectDB()


//EXPORT TO INDEX 
module.exports = app