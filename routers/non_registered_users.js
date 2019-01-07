const express = require('express');
const router = express.Router();

// getting the controllers for the controller for non registered customers
const nonRegisteredController = require('../controllers/non_registered_users_c');

router.get('/', nonRegisteredController.getIndexPage);
router.get('/become-certified-host',nonRegisteredController.getbecomeHost);

module.exports = router;