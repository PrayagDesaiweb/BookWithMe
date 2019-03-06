const express = require('express');
const router = express.Router();

const RegisteredUsersController = require('../controllers/registered-users');

router.post('/search-properties',RegisteredUsersController.postSearchProperties);
router.get('/manage-credentials',RegisteredUsersController.getManageCredentials);
router.post('/credentials-update-successfull',RegisteredUsersController.postUpdateCredentials);
router.post('/explore-properties-by-city',RegisteredUsersController.postExplorePropertiesByCity);
router.post('/book-property',RegisteredUsersController.postBookProperty);
router.post('/book',RegisteredUsersController.postBookProperty2);
router.get('/view/bookings',RegisteredUsersController.getViewBookingsPage);
router.post('/property-details',RegisteredUsersController.postPropertyDetails);
router.post('/rate-property',RegisteredUsersController.postRatings);
router.post('/rental-reviews-compeleted',RegisteredUsersController.postStoreRatings);

module.exports = router;
