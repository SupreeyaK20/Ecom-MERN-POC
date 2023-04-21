const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MongoURI)
        console.log("Database Connected:", connect.connection.name)
    } catch (error) {
        console.log(error);
        process.exit(1)   
    }
}

module.exports = connectDb