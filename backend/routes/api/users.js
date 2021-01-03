const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('/', require('../../utils/validation').validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

router.get('/:userId(^\\D+\\w+)/posts', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk();
}));

module.exports = router;
