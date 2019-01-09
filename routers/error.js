const express = require('express');

const router = express.Router();

const errorController = require('../controllers/error_c');

router.get('/',errorController.getErrorPage);

module.exports = router;