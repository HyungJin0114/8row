const User = require('../models/user');
const jwt = require('jsonwebtoken');

// exports.isAuthenticated = async (req, res, next) => {
//   res.locals.user = null;
//   if (!req.cookies) {
//     return false;
//   }

//   const { Authorization } = req.cookies;
//   const [authType, authToken] = (Authorization ?? '').split(' ');
//   // console.log(`authType: ${authType}`);
//   // console.log(`authToken: ${authToken}`);

//   if (!authToken || authType !== 'Bearer') {
//     return false;
//   }

//   try {
//     const { userId } = jwt.verify(authToken, process.env.KEY);
//     const user = await User.findByPk(userId, {
//       attributes: ['id', 'nickname', 'isAdmin'],
//       raw: true,
//       nest: true,
//     });

//     if (!user) {
//       return false;
//     }
//     // console.log(user);
//     // console.log("Authenticated!!");
//     res.locals.user = user;
//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };
