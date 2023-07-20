const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
  reviewRepository = new ReviewRepository();

  //리뷰 등록
  postReviews = async (userId, content, rating, storeId, orderId) => {
    try {
      await this.reviewRepository.postReviews(
        userId,
        content,
        rating,
        storeId,
        orderId
      );

      return `200@"massage": "등록이 완료되었습니다."`;
    } catch (error) {
      console.log(error);
      return `400@"massage": "리뷰 등록에 실패했습니다."`;
    }
  };

  //리뷰 삭제
  deleteReviews = async (userId, reviewId) => {
    try {
      await this.reviewRepository.deleteReviews(userId, reviewId);

      return `200@"massage": "삭제가 완료되었습니다."`;
    } catch (error) {
      return `400@"massage": "리뷰 삭제에 실패했습니다."`;
    }
  };

  //리뷰 수정
  updateReviews = async (userId, reviewId) => {
    try {
      await this.reviewRepository.updateReviews(userId, reviewId);

      return `200@"massage": "수정이 완료되었습니다."`;
    } catch (error) {
      return `400@"massage": "리뷰 수정에 실패했습니다."`;
    }
  };

  //리뷰 리스트
  getReviews = async storeId => {
    try {
      const getReviewsData = await this.reviewRepository.getReviews(storeId);

      return `200@${getReviewsData}`;
    } catch (error) {
      return `400@"massage": "리뷰 리스트 불러오기에 실패했습니다."`;
    }
  };
}

module.exports = ReviewService;
