const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_c');

router.post('/registerhost',adminController.postbecomeHost);

module.exports = router;



