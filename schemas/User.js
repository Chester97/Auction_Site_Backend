const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  }
}, { _id: false })

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userDetails: {
    type: userDetailsSchema,
    required: false,
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;