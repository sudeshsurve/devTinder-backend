
const mongoose = require('mongoose');


const connectDb =  async () => {
    try {
        await  mongoose.connect(
            process.env.MONGODB_URL
        ) 
    } catch (error) {
          logger.error(error)
    }
}

module.exports = connectDb
