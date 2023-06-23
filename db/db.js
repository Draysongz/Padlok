const mongoose =require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const MONGO_URI = process.env.MONGO_URI




const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI,
            { useNewUrlParser: true,
            useUnifiedTopology: true,
    })
        console.log(`DB connected ${conn.connection.id}`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB