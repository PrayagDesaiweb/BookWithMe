const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_c');

router.post('/registerhost',adminController.postbecomeHost);
router.post('/user-registration-successfull',adminController.postbecomeUser);

module.exports = router;



