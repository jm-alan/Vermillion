const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sanitize = require('sanitize-html');

const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

Array.prototype.asyncForEach = async function (cb) {
  try {
    for (let i = 0; i < this.length; i++) {
      await cb(this[i], i, this)
    }
  } catch (err) {
    throw new Error(err);
  }
};

const sanitizeOptions = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};

router.put('/:postId(\\d+)', requireAuth, asyncHandler(async ({ user: { id: userId }, body: { type }, params: { postId } }, res, next) => {
  try {
    const post = await db.Post.findByPk(postId, { where: { userId } });
    if (!post) return res.json({ result: null });
    const heart = await db.Heart.findOne({ where: { postId, userId } });
    switch (type) {
      case 'like':
        if (!heart) {
          await db.Heart.create({ userId, postId });
          post.increment('hearts');
          return res.json({ result: 'like' });
        } else {
          await heart.destroy();
          post.decrement('hearts');
          return res.json({ result: 'unlike' });
        }
    }
  } catch {}
}));

router.patch('/:postId(\\d+)', requireAuth, asyncHandler(async ({ user: { id: userId }, params: { postId }, body: { component, payload } }, res, next) => {
  try {
    if (!postId || !userId) return res.json({ success: false });
    const post = await db.Post.findByPk(postId, { where: { userId } });
    if (!post || !component || !payload) return res.json({ success: false });
    await post.update({
      [component.toString()]: sanitize(payload.toString())
    });
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
        const errOut = new Error('Sorry, something went wrong. Please refresh the page and try again.');
        errOut.status = 400;
        return next(errOut);
      } catch (fatalWriteErr) {
        console.error('Fatal database error occurred when attempting to write to error log.');
        console.error('---------------------------Original error:---------------------------');
        console.error(err);
        console.error('------------------------ErrorLog write error:------------------------');
        console.error(fatalWriteErr);
        console.error('Original short:', err.toString());
        console.error('Fatal short:', fatalWriteErr.toString());
        const errOut = new Error('Sorry, we\'re experiencing some problems right now. Please come back later.');
        errOut.status = 500;
        return next(errOut);
      }
    } else {
      console.error(err);
      console.error('Short:', err.toString());
      return next(err);
    }
  }
}));

router.post('/', requireAuth, asyncHandler(async ({ user: { id: userId }, body: { content } }, res, next) => {
  if (!content) {
    const err = new Error('Bad post POST');
    err.status = 401;
    err.title = 'Invalid request body or post content.';
    err.errors = ['Bad post POST'];
    return next(err);
  } else {
    try {
      let { title, postBody } = content;
      title = title || null;
      postBody = postBody || null;
      userId = userId ?? 0;
      if (!(title ?? false)) {
        const err = new Error('Title cannot be empty.');
        err.internalValidate = true;
        throw err;
      }
      if (!(postBody ?? false)) {
        const err = new Error('Body cannot be empty.');
        err.internalValidate = true;
        throw err;
      }
      const newPost = await db.Post.create({
        title: sanitize(title),
        body: sanitize(postBody, sanitizeOptions),
        userId,
        hearts: 0,
        reblogs: 0,
        isReply: false,
        isReblog: false
      });
      res.json(newPost);
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
          const errOut = new Error('We\'re experiencing some problems right now. Please check back later.');
          return next(errOut);
        }
      } else {
        console.error(err);
        console.error('-------------------------Error occurred during POST/posts-------------------------');
        console.error('Short:', err.toString());
        return next(err);
      }
    }
  }
}));

router.get('/following', requireAuth, asyncHandler(async ({ user: { id } }, res, next) => {
  try {
    let posts = [];
    (await db.User.findByPk(id, {
      include: {
        model: db.User,
        as: 'Following',
        include: {
          model: db.Post,
          include: [db.User, db.Heart]
        }
      }
    })).Following.forEach(f => f.Posts.forEach(p => posts.push(p)));
    await posts.asyncForEach(async post => {
      console.log(post);
      post.isHearted = false;
      post.Hearts.forEach(heart => {
        if (heart.userId === id) {
          post.isHearted = true;
        }
      });
    });
    posts = posts.map(({ id, userId, User, createdAt, updatedAt, isHearted, title, body }) => ({ id, userId, User, createdAt, updatedAt, isHearted, title, body }));
    posts.sort(({ createdAt: a }, { createdAt: b }) => Date.parse(a) - Date.parse(b));
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
