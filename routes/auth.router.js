const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { signin, signup, signout } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', isSignedIn, signout);

module.exports = router;
