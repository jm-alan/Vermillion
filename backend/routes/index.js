const apiRouter = require('./api');

const router = require('express').Router();

router.use('/api', apiRouter);

module.exports = router;
