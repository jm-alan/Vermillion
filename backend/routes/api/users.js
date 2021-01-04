const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.post('/', require('../../utils/validation').validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await db.User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
}));

router.get('/hearts', requireAuth, asyncHandler(async (req, res) => {
  const { user: { id: userId } } = req;
  const hearts = await db.Heart.findAll({ where: { userId }, attributes: ['postId'] });
  res.json({ hearts });
}));

router.get('/:username(\\D+\\w+)/posts', asyncHandler(async (req, res) => {
  const { username } = req.params;
  const posts = (await db.User.findOne({
    where: { username },
    include: {
      model: db.Post,
      include: db.User
    }
  })).Posts;
  res.json({ posts });
}));

// router.get('/hearts/:postId', requireAuth, asyncHandler(async (req, res) => {
//   const { postId } = req.params;
//   const { user: { id: userId } } = req;
//   const hasHearted = await db.Heart.findOne({
//     where: { userId, postId }
//   });
//   if (hasHearted) return res.json({ hearted: true });
//   return res.json({ hearted: false });
// }));

module.exports = router;
