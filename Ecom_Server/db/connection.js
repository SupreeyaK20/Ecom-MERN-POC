const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
mongoose.set('strictQuery', true);

const uri = process.env.MongoURI
const connectDB = async () => {
  await mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error("Couldn't connect MongoDB....", err));
};

module.exports = connectDB;

// const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
// mongoose.set('strictQuery', true);

// const uri = 'mongodb://localhost:27017/Ecom';
// const connectDB = async () => {
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log('Connected to MongoDB...');
// };

// module.exports = connectDB;


