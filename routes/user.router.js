const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const UserController = require('../controllers/user.controller');

const userController = new UserController();

router.get('/me', isSignedIn, userController.getUserInfo);
router.put('/me', isSignedIn, userController.updateUserInfo);
router.get('/orders', isSignedIn, userController.getUserOrdered);

module.exports = router;
