const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

router.get('/:follower', requireAuth, asyncHandler(async ({ params: { follower } }, res, next) => {
  try {
    const followers = await db.Follow.findAll({
      where: {
        follower
      }
    });
    return res.json({ followers });
  } catch (sqlerr) {
    // TODO: Create err db table & log verbosely
    const err = new Error('Something went wrong, please refresh the page and try again.');
    err.status = 500;
    next(err);
  }
}));

module.exports = router;
