const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    name: {
      type: String
    },

    surname: {
      type: String
    },

    email: {
      type: String
    },

    adress: {
      type: String,
    },

    phone: {
      type: String
    }
})
  
module.exports = mongoose.model("Users", userSchema);