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
        title,
        body: sanitize(postBody, sanitizeOptions),
        userId: user.id ?? 0,
        hearts: 0,
        reblogs: 0,
        isReply: false,
        isReblog: false
      });
      res.json(newPost);
    } catch (err) {
      if (err.internalValidate || err.toString.match(/SequelizeValidationError: Validation error:/)) return next(err);
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
        } catch (fatalerr) {
          console.error(fatalerr);
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
    const posts = [];
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
      } catch (fatalerr) {
        console.error(fatalerr);
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
