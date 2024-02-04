const express = require('express');
const { loginAdmin, createGroup, approveRequest, suspendUser} = require('../controllers/admincontrollers');

const router = express.Router();

// Routes;
router.post('/login', loginAdmin);
router.post('/group/create', createGroup);
router.post('/request/approve', approveRequest);
router.post('/user/suspend', suspendUser);

module.exports = router;
