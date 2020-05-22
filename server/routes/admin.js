const express = require('express');
const adminController = require('../controller/admin')
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/', isAuth, adminController.postAddResource);
router.get('/data/resources', adminController.getResources);
router.post('/edit-resource', isAuth, adminController.postEditResource);
router.post('/delete-resource', isAuth, adminController.postDeleteResource);

module.exports = router