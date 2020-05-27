const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const isAuth = require('../middleware/is-auth');

router.get('/my-resource', isAuth, userController.getMyResource);
router.post('/add-user-resource', isAuth, userController.postUserResource);
router.post('/review', isAuth, userController.postReview)
router.get('/review-list', userController.getReviews)

module.exports = router