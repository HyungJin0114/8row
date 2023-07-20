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

    let response = postReviewsData.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };

  //리뷰 삭제
  deleteReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { reviewId } = req.params;

    const deleteReviews = await this.reviewService.deleteReviews(
      userId,
      reviewId
    );

    let response = deleteReviews.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };

  //리뷰 수정
  updateReviews = async (req, res, next) => {
    const userId = res.locals.user;
    const { reviewId } = req.params;

    const updateReviewsData = await this.reviewService.updateReviews(
      userId,
      reviewId
    );

    let response = updateReviewsData.split('@');
    return res.status(response[0]).json({ result: response[1] });
  };

  //리뷰 리스트
  getReviews = async (req, res, next) => {
    const { storeId } = req.params;

    const getReviewsData = await this.reviewService.getReviews(storeId);

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
