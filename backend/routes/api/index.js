const router = require('express').Router();

router.use('/session', require('./session'));

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

module.exports = router;
