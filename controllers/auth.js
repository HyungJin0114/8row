const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  const { nickname, password, confirmPassword } = req.body;
};

exports.signin = async (req, res, next) => {
  const { nickname, password } = req.body;
};

exports.signout = async (req, res, next) => {
  res.clearCookie('Authorization');
  res.status(200).json({ message: '로그아웃이 정상적으로 되었습니다.' });
};
