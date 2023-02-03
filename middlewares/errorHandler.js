const errorHandler = (err, req, res, next)=>{
    //Get resStatus 
    const statusCode = (res.statusCode)? res.statusCode : 500

    //Return status code 
    res.status(statusCode)
    
    //Return error 
    res.json({
        message : err.message, 
        stack: (process.env.NODE_ENV == 'development')? err.stack : null 
    })
}


//EXPORT TO SERVER 
module.exports = errorHandler 