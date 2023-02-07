const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.DB_URI)

        console.log(`MongoDB connected : ${connect.connection.host}`)
    }
    catch (err){
        console.log(err)
        process.exit(1)
    }
}

//EXPORT TO SERVER
module.exports = connectDB