const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateLogin } = require('../../utils/validation');

router.get('/', restoreUser, ({ user }, res) => {
  if (user) return res.json({ user: user.toSafeObject() });
  else return res.json({});
});

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const { identification, password } = req.body;
  console.log('POST received at /api/session');

  const user = await User.login({ identification, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['Invalid login.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({ user });
})
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);

module.exports = router;
