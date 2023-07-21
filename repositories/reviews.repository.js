const { User, Review, Store } = require('../models');

class ReviewRepository {
  //리뷰 등록
  postReviews = async (userId, content, rating, storeId, orderId) => {
    const postReviewsData = await Review.create({
      userId,
      content,
      rating,
      storeId,
      orderId
    });

    return postReviewsData;
  };

  //리뷰 권한 확인
  compareReviews = async reviewId => {
    const compareReviewsData = await Review.findOne({
      attributes: ['userId'],
      where: { id: reviewId },
    });
    return compareReviewsData;
  };

  //리뷰 삭제
  deleteReviews = async reviewId => {
    const deleteReviewsData = await Review.destroy({
      where: { id: reviewId },
    });

    return deleteReviewsData;
  };

  //리뷰 수정
  updateReviews = async (reviewId, content, rating) => {
    const updateReviewsData = await Review.update(
      { content, rating },
      { where: { id: reviewId } }
    );

    return updateReviewsData;
  };

  //리뷰 리스트(업장) 권한 확인
  compareReviewsList = async storeId => {
    const compareReviewsListData = await Store.findOne({
      attributes: ['ownerId'],
      where: { id: storeId },
    });

    return compareReviewsListData;
  };

  //리뷰 리스트(업장)
  getReviews = async storeId => {
    const getReviewsData = await Review.findAll({
      attributes: ['id', 'content', 'rating'],
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
