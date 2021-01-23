const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sanitize = require('sanitize-html');

const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const sanitizeOptions = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};

router.put('/:postId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const {
    user: { id: userId },
    body: { type },
    params: { postId }
  } = req;
  try {
    const post = await db.Post.findByPk(postId);
    if (!post) return res.json({ result: null });
    const user = await db.User.findByPk(userId);
    switch (type) {
      case 'like':
        if (!await user.hasHeartedPost(post)) return res.json(await user.heartPost(post));
        else return res.json(await user.unheartPost(post));
    }
  } catch {}
}));

router.patch('/:postId(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const {
    user: { id: userId },
    params: { postId },
    body: { component, payload }
  } = req;
  try {
    if (!postId || !userId) return res.json({ success: false });
    const post = await db.Post.findByPk(postId, { where: { userId } });
    if (!post || !component || !payload) return res.json({ success: false });
    await post.update({
      [component.toString()]: sanitize(payload.toString())
    });
    return res.json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      try {
        await db.ErrorLog.create({
          location: 'backend/routes/api/posts.js',
          during: `PATCH/posts/${postId} of ${component.toString()} with ${payload.toString()}`,
          body: err.toString(),
          stack: err.stack,
          sql: err.sql && err.sql.toString(),
          sqlOriginal: err.original && err.original.toString()
        });
      } catch (fatalWriteErr) {
        console.error('Fatal database error occurred when attempting to write to error log.');
        console.error('---------------------------Original error:---------------------------');
        console.error(err);
        console.error('------------------------ErrorLog write error:------------------------');
        console.error(fatalWriteErr);
        console.error('Original short:', err.toString());
        console.error('Fatal short:', fatalWriteErr.toString());
      }
      const errOut = new Error('Sorry, we\'re experiencing some problems right now. Please come back later.');
      errOut.status = 500;
      return next(errOut);
    } else {
      console.error(err);
      console.error('Short:', err.toString());
      return next(err);
    }
  }
}));

router.post('/', requireAuth, asyncHandler(async (req, res, next) => {
  const {
    user: { id: userId },
    body: { content }
  } = req;

  const user = await db.User.findByPk(userId);
  if (!user || !content) {
    const err = new Error('Bad post POST');
    err.status = 401;
    err.title = 'Invalid request body or post content.';
    err.errors = ['Bad post POST'];
    return next(err);
  } else {
    try {
      let { title, postBody } = content;
      if (!(title)) {
        const err = new Error('Title cannot be empty.');
        err.internalValidate = true;
        throw err;
      }
      if (!(postBody)) {
        const err = new Error('Body cannot be empty.');
        err.internalValidate = true;
        throw err;
      }
      title = sanitize(title);
      const body = sanitize(postBody, sanitizeOptions);
      const newPost = await user.createPost({
        title,
        body,
        hearts: 0,
        reblogs: 0,
        isReply: false,
        isReblog: false
      });
      return res.json(newPost);
    } catch (err) {
      if (err.internalValidate || err.toString().match(/SequelizeValidationError: Validation error:/)) return next(err);
      if (process.env.NODE_ENV === 'production') {
        try {
          db.ErrorLog.create({
            location: 'backend/routes/api/posts.js',
            during: 'POST/posts',
            body: err.toString(),
            stack: err.stack,
            sql: err.sql && err.sql.toString(),
            sqlOriginal: err.original && err.original.toString()
          });
        } catch (fatalWriteErr) {
          console.error(fatalWriteErr);
          console.error('Short:', fatalWriteErr.toString());
        }
        const errOut = new Error('Sorry, we\'re experiencing some problems right now. Please come back later.');
        errOut.status = 500;
        return next(errOut);
      } else {
        console.error(err);
        console.error('-------------------------Error occurred during POST/posts-------------------------');
        console.error('Short:', err.toString());
        return next(err);
      }
    }
  }
}));

router.get('/me/following', requireAuth, asyncHandler(async (req, res, next) => {
  const { user: { id: userId } } = req;
  try {
    let posts = [];
    const user = await db.User.findByPk(userId, {
      include: { model: db.User, as: 'Following' }
    });
    await user.Following.asyncForEach(async follower => {
      const followerPosts = await follower.getPosts({
        include: db.User,
        order: [['createdAt', 'ASC']]
      });
      followerPosts.forEach(post => posts.push(post));
    });
    await posts.asyncForEach(async post => {
      post.isHearted = await user.hasHeartedPost(post);
    });
    // This map is necessary to normalize data on each "post" object, to retain access to the "isHearted" value.
    posts = posts.map(post => ({ ...post.dataValues, isHearted: post.isHearted }));
    res.json({ posts });
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      try {
        db.ErrorLog.create({
          location: 'backend/routes/api/posts.js',
          during: 'POST /posts',
          body: err.toString(),
          stack: err.stack,
          sql: err.sql && err.sql.toString(),
          sqlOriginal: err.original && err.original.toString()
        });
      } catch (fatalWriteErr) {
        console.error(fatalWriteErr);
        console.error('Short:', fatalWriteErr.toString());
        const errOut = new Error('We\'re experiencing some problems right now. Please check back later.');
        return next(errOut);
      }
    } else {
      console.error(err);
      console.error('----------------------Error occurred during GET/posts/following----------------------');
      console.error('Short:', err.toString());
    }
  }
}));

module.exports = router;
