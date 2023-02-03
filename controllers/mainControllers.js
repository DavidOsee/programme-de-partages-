const asyncHandler = require('express-async-handler')


//HOME VIEW 
const Home = asyncHandler(async(req, res)=>{
    res.render('home')
})

//FORM SUBMISSION 


//EXPORT TO MAIN-ROUTES
module.exports = {Home}