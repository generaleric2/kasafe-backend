const express = require('express');
const { createUser, loginUser, deposit, withdraw, viewHistory } = require('../controllers/usercontrollers');

const router = express.Router();

// Routes
router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/history', viewHistory);

module.exports = router;
