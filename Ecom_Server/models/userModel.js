// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add username"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please insert email"],
    unique: [true, "Email already exist!"],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
    minlength: 8
  },
  countrycode:{
    type: Number,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'user']
  },
  isActive:{
    type: Boolean,
    default: true,
    required: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
},{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
