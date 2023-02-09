const mongoose = require('mongoose')

//Scheema 
const orateurSchema = mongoose.Schema({
    pos_id : {
        type : Number, 
        require : true
    },
    name : {
        type : String,
        require : true
    },
    theme : {
        type : String,
        require : false,
    },
    date : {
        type : String,
        require : true
    }
    
}, { timestamps : true })



//EXPORT TO CONTROLLERS 
module.exports = mongoose.model('Orateur', orateurSchema) 