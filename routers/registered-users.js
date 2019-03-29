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
router.get('/user-dashboard',RegisteredUsersController.getUserDashBoard);
router.get('/book-properties-nav',RegisteredUsersController.getExploreAndBookProperties);
router.get('/manage-booking',RegisteredUsersController.getCancelProperty);
router.post('/bookings-details',RegisteredUsersController.postBookingDetails);
router.post('/delete_property',RegisteredUsersController.postDeleteBookings);
router.post('/free-cancellation',RegisteredUsersController.postFreeCancellation);
router.post('/paid-cancellation',RegisteredUsersController.postPaidCancellation);
router.get('/previous-bookings',RegisteredUsersController.getPreviousBookings);
router.post('/book1',RegisteredUsersController.postBookProperty3);
router.post('/sort-properties-by-rate',RegisteredUsersController.postSortPropertyByRate);
router.post('/boutique-rooms',RegisteredUsersController.BoutiqueRooms);
router.post('/bookwithme-plus',RegisteredUsersController.Bwmplus);
router.post('/entire-home',RegisteredUsersController.EntireRooms);
router.post('/unique-properties',RegisteredUsersController.UniqueProperties);

module.exports = router;
