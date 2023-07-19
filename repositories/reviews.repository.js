const { User, Review } = require('../models');

class ReviewRepository {
  //리뷰 등록
  postReviews = async (userId, content, rating, storeId, orderId) => {
    const postReviewsData = await Review.create({
      userId,
      content,
      rating,
      storeId,
      orderId,
    });

    return postReviewsData;
  };

  //리뷰 삭제
  deleteReviews = async (userId, reviewId) => {
    const deleteReviewsData = await Review.destroy({
      where: { userId, reviewId },
    });

    return deleteReviewsData;
  };

  //리뷰 수정
  updateReviews = async (userId, reviewId) => {
    const updateReviewsData = await Review.update(
      { content, rating },
      { where: { userId, reviewId } }
    );

    return updateReviewsData;
  };

  //리뷰 리스트
  getReviews = async storeId => {
    const getReviewsData = await Review.findAll({
      attributes: ['content', 'rating'],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      where: { storeId },
    });

    return getReviewsData;
  };
}

module.exports = ReviewRepository;
