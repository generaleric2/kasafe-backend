const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModels');
const User = require('../models/userModels');
const Group = require('../models/groupModel');

module.exports={
loginAdmin : async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
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

createGroup : async (req, res) => {
    try {
      const { name, adminId } = req.body;
  
      // Check if the admin exists
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Check if the group name is unique
      const existingGroup = await Group.findOne({ name });
      if (existingGroup) {
        return res.status(400).json({ message: 'Group name already exists' });
      }
  
      const newGroup = new Group({
        name,
        adminId,
      });
  
      await newGroup.save();
  
      res.status(201).json({ message: 'Savings Group created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

 approveRequest : async (req, res) => {
    try {
      const { userId, groupId } = req.body;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Check if the user is already in the group
      if (group.users.includes(userId)) {
        return res.status(400).json({ message: 'User is already in the group' });
      }
  
      group.users.push(userId);
      await group.save();
  
      res.status(200).json({ message: 'User request approved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  suspendUser : async (req, res) => {
    try {
      const { userId, groupId, reason } = req.body;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      // Check if the user is in the group
      if (!group.users.includes(userId)) {
        return res.status(400).json({ message: 'User is not in the group' });
      }
  
      // Remove the user from the group
      group.users = group.users.filter((id) => id.toString() !== userId);
      await group.save();
  
      res.status(200).json({ message: 'User suspended from the group successfully', reason });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }};

