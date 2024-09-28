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
<<<<<<< HEAD
      type: String,
=======
      type: String, // Placeholder for transactions, you may need to define a proper schema
>>>>>>> c1c7ef32b8a9c7d253610543a14cdbfbd3e3455e
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
