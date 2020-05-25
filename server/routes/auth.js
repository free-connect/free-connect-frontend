const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')
//work on setting up validation
const expValidator = require('express-validator')

router.post('/register', AuthController.postRegister);
router.post('/login', AuthController.postLogin);


module.exports = router