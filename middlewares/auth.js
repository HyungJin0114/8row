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
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!userId) {
      return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
    }

    res.locals.user = userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
