const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { signin, signup, signout } = require('../controllers/auth');

router.post('/signin', isSignedIn, signin);
router.post('/signup', isSignedIn, signup);
router.post('/signout', isSignedIn, signout);

module.exports = router;
