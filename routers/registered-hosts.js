const express = require('express');
const registeredHostsController = require('../controllers/registered-hosts');
const router = express.Router();

router.post('/create-first-rental',registeredHostsController.postCreateOneRental);
router.post('/path-to-manage-rentals',registeredHostsController.postFetchfromCreatefirstRentals);
router.get('/create-rentals',registeredHostsController.getCreateRental);
router.post('/create-rental',registeredHostsController.postCreateRental);
router.get('/update-credentials',registeredHostsController.getUpdateCredentials); // error here
router.post('/updated-credentials',registeredHostsController.updateCredentials);
router.post('/edit-rental',registeredHostsController.postEditRental);
router.post('/delete-rental',registeredHostsController.postDeleteRental);
router.post('/rental-details',registeredHostsController.postRentalDetails);
router.post('/update-rental',registeredHostsController.postUpdatePropertyInformation);
router.get('/host-dashboard',registeredHostsController.displayHostDashboard);
module.exports = router;
