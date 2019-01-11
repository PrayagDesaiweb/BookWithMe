const express = require('express');
const registeredHostsController = require('../controllers/registered-hosts');
const router = express.Router();

router.post('/create-first-rental',registeredHostsController.postCreateOneRental);

module.exports = router;