const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    fullName: String, 
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: true,
        validate: (value) =>{
            return validator.isEmail(value)
        }
    },
    phoneNumber: {
        type: Number, 
    },
    birthdate: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
      }

})

const User = mongoose.model("User", userSchema);

module.exports = User;