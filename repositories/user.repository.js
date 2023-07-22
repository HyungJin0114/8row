const { Menu, OrderMenu, Order, User } = require('../models');

class UserRepository {
  // 내 주문 내역
  getUserOrdered = async userId => {
    const orders = await Order.findAll({
      attributes: ['id', 'userId', 'storeId', 'delivered'],
      include: [
        {
          model: OrderMenu,
          attributes: ['menuId', 'count'],
          include: [
            {
              model: Menu,
              attributes: ['menuName', 'price'],
            },
          ],
        },
      ],
      where: { userId },
    });

    return orders;
  };

  updateUserInfo = async (
    userId,
    name,
    email,
    phoneNumber,
    nickname,
    location
  ) => {
    const updateUserInfoData = await User.update(
      { name, email, phoneNumber, nickname, location },
      { where: { id: userId } }
    );
    return updateUserInfoData;
  };
}

module.exports = UserRepository;
