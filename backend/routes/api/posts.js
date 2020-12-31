const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const clean = require('sanitize-html');
const { requireAuth } = require('../../utils/auth');

const { Post } = require('../../db/models');

router.post('/', requireAuth, asyncHandler(async ({ user, body }, res, next) => {
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
      if (title ?? true)
        throw new Error('Title cannot be blank');
      if (postBody ?? true)
        throw new Error('Body cannot be blank');
      await Post.create({
        ...body.content,
        userId: user.id ?? 0,
        hearts: 0,
        reblogs: 0,
        isReply: false,
        isReblog: false
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production')
        {
          console.warn('Sequelize error');
          console.warn(err);
        }
      next(err);
    }
    console.log(body.content);
    console.log(clean(body.content.postBody));
    res.json({});
  }
}));

module.exports = router;
