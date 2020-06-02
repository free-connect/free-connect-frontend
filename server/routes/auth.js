const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')
const { check } = require('express-validator')

router.post(
    '/register', 
    check('email')
        .isEmail()
        .withMessage('please enter valid email'), 
    AuthController.postRegister
);
router.post('/login', AuthController.postLogin);


module.exports = router