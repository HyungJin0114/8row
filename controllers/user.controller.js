const AuthService = require('../services/auth.service');
const UserService = require('../services/user.service');
const User = require('../models/user');
const { where } = require('sequelize');
const StoreRepository = require('../repositories/store.repository');

class UserController {
  authService = new AuthService();
  userService = new UserService();
  storerepository = new StoreRepository();

  getUserInfo = async (req, res, next) => {
    const id = res.locals.user;
    try {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(401).json({ message: '회원 정보가 없습니다.' });
      }
      if (user.isAdmin) {
        const store = await this.storerepository.getStoreByUserId(user.id);
        return res.status(202).json({ store, user });
      }

      return res.status(200).json({ message: 'user', user });
    } catch (error) {
      return res.status(500).json({ message: '서버오류' });
    }
  };

  //내 프로필 수정
  updateUserInfo = async (req, res, next) => {
    const userId = res.locals.user;
    const { name, email, phoneNumber, nickname, location } = req.body;

    const updateUserInfoData = await this.userService.updateUserInfo(
      userId,
      name,
      email,
      phoneNumber,
      nickname,
      location
    );
    return res
      .status(updateUserInfoData.status)
      .json({ result: updateUserInfoData.message });
  };

  // 내 주문 내역
  getUserOrdered = async (req, res, next) => {
    const userId = res.locals.user;

    const getUserOrderedData = await this.userService.getUserOrdered(userId);

    if (getUserOrderedData.status == 200) {
      return res
        .status(getUserOrderedData.status)
        .json({ result: getUserOrderedData.getUserOrderedData });
    }
    return res
      .status(getUserOrderedData.status)
      .json({ result: getUserOrderedData.message });
  };
}

module.exports = UserController;
