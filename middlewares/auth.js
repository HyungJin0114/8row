const jwt = require('jsonwebtoken');

exports.isSignedIn = async (req, res, next) => {
  res.locals.user = null;
  if (!req.cookies) {
    return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
  }

  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.KEY);
    // const user = await User.findByPk(userId, {
    //   attributes: ['id', 'nickname', 'isAdmin'],
    //   raw: true,
    //   nest: true,
    // });

    if (!user) {
      // 401 respone
      return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
    }

    res.locals.user = userId;
    next();
  } catch (err) {
    console.error(err);
    return;
  }
};

// const { isAuthenticated } = require('../utils/auth');

// exports.isLoggedIn = async (req, res, next) => {
//   try {
//     if (await isAuthenticated(req, res, next)) {
//       // console.log(`isLoggedIn : ${res.locals.user.nickname}`);
//       next();
//     } else {
//       // console.log(`isNotLoggedIn : ${res.locals.user.nickname}`);
//       return res.status(403).json({ message: '로그인이 필요합니다.' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.isNotLoggedIn = async (req, res, next) => {
//   if (!(await isAuthenticated(req, res, next))) {
//     // console.log(`isNotLoggedIn : ${res.locals.user.nickname}`);
//     next();
//   } else {
//     // console.log(`isLoggedIn : ${res.locals.user.nickname}`);
//     return res.status(403).json({ message: '이미 로그인한 상태입니다.' });
//   }
// };

// exports.isAuthorized = async (req, res, next) => {
//   try {
//     if (await isAuthenticated(req, res, next) => {

//     })
//   } catch (err) {
//     console.error
//   }
// }
