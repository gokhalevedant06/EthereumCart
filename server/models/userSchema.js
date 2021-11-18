const mongoose = require("mongoose");

// defining a model (document)
// data will be stored in this format
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('USER',userSchema);

module.exports = User;
