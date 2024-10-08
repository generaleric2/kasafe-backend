const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const createUser = async (req, res) => {
  try {
    const { name, email, phonenumber, password, group_id } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phonenumber,
      password: hashedPassword,
      group_id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const verifyUser = async (req, res) =>{
  const { phonenumber } = req.body;

  try {
    // 1. Verify the phone number is in the database
    const user = await User.findOne({ phonenumber });
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // If not found, return an error
    }

    // 2. Generate OTP and set expiration time
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60000); // OTP expires in 5 minutes

    // 3. Store OTP in the database
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // 4. Send OTP to the provided phone number using Twilio
    await sendOTP(phonenumber, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Logic to deposit money into the user's account
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.balance += amount;
    user.transactionHistory.push(`Deposited ${amount} into the account`);
    await user.save();

    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const withdraw = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Logic to withdraw money from the user's account
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (amount > user.balance) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    user.balance -= amount;
    user.transactionHistory.push(`Withdrawn ${amount} from the account`);
    await user.save();

    res.status(200).json({ message: 'Withdrawal successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const viewHistory = async (req, res) => {
  try {
    const { userId } = req.body;

    // Logic to fetch and display user's transaction history
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ transactionHistory: user.transactionHistory });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createUser, loginUser, deposit, withdraw, viewHistory };
