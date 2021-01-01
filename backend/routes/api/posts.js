const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const clean = require('sanitize-html');
const { requireAuth } = require('../../utils/auth');

const db = require('../../db/models');

router.post('/',
  requireAuth,
  asyncHandler(async ({ user, body }, res, next) => {
    if (!body || !body.content) {
      const err = new Error('Bad post POST');
      err.status = 401;
      err.title = 'Invalid request body or post content.';
      err.errors = ['Bad post POST'];
      return next(err);
    } else {
      try {
        let { title, postBody } = body.content;
        title = title || null;
        postBody = postBody || null;
        if (!(title ?? false)) {
          const err = new Error('Title cannot be blank');
          err.internalValidate = true;
          throw err;
        }
        if (!(postBody ?? false)) {
          const err = new Error('Body cannot be blank');
          err.internalValidate = true;
          throw err;
        }
        const newPost = await db.Post.create({
          title,
          body: clean(postBody),
          userId: user.id ?? 0,
          hearts: 0,
          reblogs: 0,
          isReply: false,
          isReblog: false
        });
        res.json({ newPost });
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Sequelize error');
          console.warn(err);
        }
        if (err.internalValidate) return next(err);
        return next(Error('Something went wrong. Please refresh the page and try again.'));
      }
    }
  }));

router.get('/following', requireAuth, asyncHandler(async ({ user: { id: follower } }, res) => {
  const followIds = await db.Follow.findAll({ where: { follower }, attributes: ['following'] });
  const postIds = [];
  followIds.forEach(async userId => postIds.push(await db.Post.findAll({ where: { userId } })));
  res.send();
}));

module.exports = router;
