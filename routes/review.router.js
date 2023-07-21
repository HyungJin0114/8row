const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');

const ReviewsController = require('../controllers/reviews.controller');
const reviewsController = new ReviewsController();

router.post('/:storeId/reviews', isSignedIn, reviewsController.postReviews);
router.delete(
  '/:storeId/reviews/:reviewId',
  isSignedIn,
  reviewsController.deleteReviews
);
router.patch(
  '/:storeId/reviews/:reviewId',
  isSignedIn,
  reviewsController.updateReviews
);
router.get('/:storeId/reviews', isSignedIn, reviewsController.getReviews);

module.exports = router;
