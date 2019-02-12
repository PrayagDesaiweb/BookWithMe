const express = require('express');
const router = express.Router();

const RegisteredUsersController = require('../controllers/registered-users');

router.post('/search-properties',RegisteredUsersController.postSearchProperties);
router.get('/manage-credentials',RegisteredUsersController.getManageCredentials);
router.post('/credentials-update-successfull',RegisteredUsersController.postUpdateCredentials);
router.post('/explore-properties-by-city',RegisteredUsersController.postExplorePropertiesByCity);
router.post('/book-property',RegisteredUsersController.postBookProperty)
module.exports = router;