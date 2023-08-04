const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
});

module.exports = mongoose.model('User', UserSchema);
