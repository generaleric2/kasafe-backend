const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModels');
const SuperAdmin = require('../models/superModels');

module.exports = {
createSuperAdmin : async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingAdmin = await SuperAdmin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newSuperAdmin = new SuperAdmin({
        name,
        email,
        password: hashedPassword,
      });
  
      await newSuperAdmin.save();
  
      res.status(201).json({ message: 'Super Admin created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

loginSuperAdmin : async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const existingAdmin = await SuperAdmin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: 'Super Admin not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ result: existingAdmin, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

createAdmin : async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered as an admin' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
},

monitorAdmins : async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}};

