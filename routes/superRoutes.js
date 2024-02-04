const express = require('express');
const { createSuperAdmin, loginSuperAdmin, createAdmin, monitorAdmins} = require('../controllers/superadmincontrollers');

const router = express.Router();

// Routes
router.post('/createsuper', createSuperAdmin);
router.post('/superlogin', loginSuperAdmin);
router.post('/admin/create', createAdmin);
router.get('/admin/monitor', monitorAdmins);

module.exports = router;
