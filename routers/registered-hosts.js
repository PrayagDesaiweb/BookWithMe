const express = require('express');
const registeredHostsController = require('../controllers/registered-hosts');
const router = express.Router();

router.get('/create-rentals',registeredHostsController.getCreateReantals);

module.exports = router;