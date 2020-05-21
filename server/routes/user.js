const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const isAuth = require('../middleware/is-auth');

router.get('/my-resource', isAuth, userController.getMyResource);

module.exports = router