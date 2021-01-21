const jwt = require('jsonwebtoken');
const { jwtConfig: { secret, expiresIn } } = require('../config');
const { User } = require('../db/models');

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  console.log('Restore user line 26');

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return ((req.user = null) || true) && next();

    try {
      console.log('Resore user inside TRY block line 33');
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      console.log('Restore user TRY FAIL catch:', e);
      res.clearCookie('token');
      return next();
    }

    (!req.user && res.clearCookie('token'));

    return next();
  });
};

const requireAuth = [
  restoreUser,
  (req, res, next) => {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
