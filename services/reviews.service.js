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

      return { status: 200, message: '등록이 완료되었습니다.' };
    } catch (error) {
      console.log(error);
      return { status: 400, message: '리뷰 등록에 실패했습니다.' };
    }
  };

  //리뷰 삭제
  deleteReviews = async (userId, reviewId) => {
    try {
      const compareReviewsData = await this.reviewRepository.compareReviews(
        reviewId
      );
      if (compareReviewsData.userId !== userId) {
        return { status: 400, message: '삭제 권한이 없습니다.' };
      }
      await this.reviewRepository.deleteReviews(userId, reviewId);

      return { status: 200, message: '삭제가 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: '리뷰 삭제에 실패했습니다..' };
    }
  };

  //리뷰 수정
  updateReviews = async (userId, reviewId, content, rating) => {
    try {
      const compareReviewsData = await this.reviewRepository.compareReviews(
        reviewId
      );
      if (compareReviewsData.userId !== userId) {
        return { status: 400, message: '수정 권한이 없습니다.' };
      }
      await this.reviewRepository.updateReviews(
        userId,
        reviewId,
        content,
        rating
      );
      return { status: 200, message: '수정이 완료되었습니다.' };
    } catch (error) {
      return { status: 400, message: '리뷰 수정에 실패했습니다..' };
    }
  };

  //리뷰 리스트
  getReviews = async (userId, storeId) => {
    try {
      const getReviewsData = await this.reviewRepository.getReviews(storeId);

      return { status: 200, getReviewsData };
    } catch (error) {
      return { status: 400, message: '리뷰 리스트 불러오기에 실패했습니다.' };
    }
  };
}

module.exports = ReviewService;
