const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const db = require('../../db/models');

router.post('/', require('../../utils/validation').validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await db.User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

router.get('/:username(\\D+\\w+)/posts', asyncHandler(async (req, res) => {
  const { username } = req.params;
  const posts = (await db.User.findOne({
    where: { username },
    include: db.Post
  })).Posts;
  res.json({ posts });
}));

router.get('/:userId/hearts/:postId', asyncHandler(async (req, res) => {
  const { userId, postId } = req.params;
  const hasHearted = await db.Heart.findOne({
    where: {
      userId,
      postId
    }
  });
  if (hasHearted) return res.json({ hearted: true });
  return res.json({ hearted: false });
}));

module.exports = router;
