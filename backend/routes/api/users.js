const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.post('/', require('../../utils/validation').validateSignup, asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const testUser = await db.User.findOne({
      where: { username }
    });
    if (testUser) {
      const error = new Error('Sorry, that username is already taken.');
      error.status = 400;
      return next(error);
    }
    const user = await db.User.signup({ email, username, password });
    await user.addFollower(user.id);
    await user.addFollower(1);
    await user.addFollowing(1);

    setTokenCookie(res, user);

    return res.json({ user });
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      try {
        await db.ErrorLog.create({
          location: 'backend/routes/api/users',
          during: 'POST/',
          body: err.toString(),
          stack: err.stack,
          sql: err.sql && err.sql.toString(),
          sqlOriginal: err.original && err.original.toString()
        });
        const didMatch = err.toString().match(/SequelizeValidationError: Validation error:/);
        const errToThrow = didMatch
          ? err
          : new Error('Sorry, something went wrong when trying to create your account. Please refresh the page and try again.');
        errToThrow.status = didMatch ? 400 : 500;
        next(errToThrow);
      } catch (fatalWriteErr) {
        console.error('Fatal error when attempting to write error to Sequelize database.');
        console.error('App terminating to prevent potential catastrophic UX failure.');
        console.error(fatalWriteErr);
        process.exit();
      }
    } else {
      console.error('--------------------------------------------------------');
      console.error('----------Error occurred during POST/api/users----------');
      console.error(err);
      console.error('Short:', err.toString());
      return next(err);
    }
  }
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

module.exports = router;
