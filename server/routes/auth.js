const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth')
const { body } = require('express-validator')

router.post(
    '/register', 
    body('email')
        .isEmail()
        .withMessage('please enter valid email'), 
    body(
        'password', 
        'Use a passphrase! Passphrases must be at lease 12 characters long.')
        .isLength({min: 12}),
    body(
        'confirmPassword'
        )
        .custom((val, { req }) => {
            if (val !== req.body.password) {
                throw new Error('passwords do not match')
            } else {
                return true
            }
        }),    
    AuthController.postRegister
);
router.post('/login', AuthController.postLogin);


module.exports = router