const AuthService = require('../services/auth.service');
const User = require('../models/user');
const { where } = require('sequelize');

class UserController {
  authService = new AuthService();

  getUserInfo = async (req, res, next) => {
    const id = res.locals.user;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(401).json({ message: '회원 정보가 없습니다.' });
    }

    res.status(200).json({ message: user, result: user });
  };

  updateUserInfo = (req, res, next) => {};

  getUserOrdered = (req, res, next) => {};
}

module.exports = UserController;
