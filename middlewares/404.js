
const notFound  = (req, res, next)=>{

    //Return to /404
    // res.status(404).redirect('/') 
    if(res.statuscode == 404)
        res.redirect('/')
}


//EXPORT TO SERVER 
module.exports = notFound