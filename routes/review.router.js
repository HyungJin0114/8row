const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');

const ReviewsController = require('../controllers/orders.controller');
const reviewsController = new ReviewsController();

router.post('/:storeId/reviews', isSignedIn, reviewsController.postReviews);
router.delete(
  '/:storeId/reviews/:reviewsId',
  isSignedIn,
  reviewsController.deleteReviews
);
router.patch(
  '/:storeId/reviews/:reviewsId',
  isSignedIn,
  reviewsController.updateReviews
);
router.get('/:storeId/reviews', getReviews);

module.exports = router;
