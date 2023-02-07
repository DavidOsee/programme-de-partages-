const mongoose = require('mongoose')

//Scheema 
const orateurSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    theme : {
        type : String,
        require : false,
        default : "Mystere" 
    },
    date : {
        type : String,
        require : true
    }
    
}, { timestamps : true })



//EXPORT TO CONTROLLERS 
module.exports = mongoose.model('Orateur', orateurSchema) 