const express = require('express');
const registeredHostsController = require('../controllers/registered-hosts');
const router = express.Router();

router.post('/create-first-rental',registeredHostsController.postCreateOneRental);
router.post('/path-to-manage-rentals',registeredHostsController.postFetchfromCreatefirstRentals);
router.get('/create-rentals',registeredHostsController.getCreateRentals)
module.exports = router;
