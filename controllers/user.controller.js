const AuthService = require('../services/auth.service');
const User = require('../models/user');
const { where } = require('sequelize');
const StoreRepository = require('../repositories/store.repository');

class UserController {
  authService = new AuthService();
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

  updateUserInfo = (req, res, next) => {};

  getUserOrdered = (req, res, next) => {};
}

module.exports = UserController;
