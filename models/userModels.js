const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactionHistory: [
    {
      type: String, // Placeholder for transactions, you may need to define a proper schema
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
