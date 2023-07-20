const ReviewService = require('../services/reviews.service');

class ReviewsController {
  reviewService = new ReviewService();

  //리뷰 등록
  postReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { content, rating, orderId } = req.body;
    const { storeId } = req.params;

    const postReviewsData = await this.reviewService.postReviews(
      userId,
      content,
      rating,
      storeId,
      orderId
    );

    return res
      .status(postReviewsData.status)
      .json({ result: postReviewsData.message });
  };

  //리뷰 삭제
  deleteReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { reviewId } = req.params;

    const deleteReviewsData = await this.reviewService.deleteReviews(
      userId,
      reviewId
    );

    return res
      .status(deleteReviewsData.status)
      .json({ result: deleteReviewsData.message });
  };

  //리뷰 수정
  updateReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { reviewId } = req.params;
    const { content, rating } = req.body;

    const updateReviewsData = await this.reviewService.updateReviews(
      userId,
      reviewId,
      content,
      rating
    );

    return res
      .status(updateReviewsData.status)
      .json({ result: updateReviewsData.message });
  };

  //리뷰 리스트(업장)
  getReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { storeId } = req.params;

    const getReviewsData = await this.reviewService.getReviews(userId, storeId);

    if (getReviewsData.status == 200) {
      return res
        .status(getReviewsData.status)
        .json({ result: getReviewsData.getReviewsData });
    }
    return res
      .status(getReviewsData.status)
      .json({ result: getReviewsData.message });
  };
}

module.exports = ReviewsController;
